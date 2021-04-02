import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Image, Text, Keyboard} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import styles from './styles';
import {
  renderInputToolbar,
  renderActions,
  renderSend,
  renderComposer,
} from './InputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
  renderMessageVideo,
  renderMessageAudio,
  renderMessageLocation,
  renderDay,
} from './MessageContainer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {color, hp, isANDROID, normalize, wp} from '../../../Helper/themeHelper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppLoading, CustomInputText, DefaultProfileImage} from '../../Common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  joinGroupSocket,
  leaveGroupSocket,
  loadGroupDetailSocket,
  loadInitialChatSocket,
  loadMessagesSocket,
  readMessageSocket,
  sendMessageSocket,
} from '../../../Socket';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {FetchGroups} from '../../../Redux/Actions/GroupsAction';

const linkStyleRegx = /#(\w+)/g;
const URLRegx = /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi;

const GroupChat = ({navigation, route}) => {
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isSearch, toggleSearch] = useState(false);
  const [isKeyboardOpen, toggleKeyboard] = useState(false);
  const [isLoading, toggleLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [searchLength, setSearchLength] = useState(0);
  const [groupDetail, setGroupDetail] = useState(null);
  const insets = useSafeAreaInsets();
  const item = route?.params?.data;
  const fromRideOut = route?.params?.fromRideOut ?? false;
  const isToday = fromRideOut
    ? moment(item?.start_time, 'YYYY-MM-DD').isSame(moment(), 'D')
    : false;
  const searchRef = useRef(null);
  const authToken = useSelector((state) => state.user.authToken);
  const userDetail = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    toggleLoading(true);
    initialFetching().then(() => {
      toggleLoading(false);
    });
    // cleanup function
    return () => {
      leaveGroupSocket({
        auth_token: authToken,
      });
      dispatch(FetchGroups());

      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  useEffect(() => {
    if (groupDetail) {
      readMessageSocket({
        auth_token: authToken,
        group_id: groupDetail?.group?.group_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupDetail?.group?.group_id]);

  const _keyboardDidShow = () => {
    toggleKeyboard(true);
  };

  const _keyboardDidHide = () => {
    toggleKeyboard(false);
  };

  const initialFetching = async () => {
    await joinGroupSocket({auth_token: authToken, group_id: item.group_id});
    await loadInitialChatSocket((data) => {
      const newMessages = _.sortBy(
        [...data],
        (x) => new Date(x.createdAt),
      ).reverse();
      setMessages(GiftedChat.append([], newMessages));
    });

    await loadMessagesSocket((data) => {
      setMessages((prevMessages) =>
        _.uniqBy(GiftedChat.append(prevMessages, [data]), '_id'),
      );
    });

    await loadGroupDetailSocket((data) => {
      setGroupDetail(data);
    });
  };

  const onSend = (newMessages = []) => {
    const payload = {
      auth_token: authToken,
      group_id: item?.group_id,
      message: newMessages[0]?.text ?? '',
      is_contain_link: false,
      message_file: newMessages[0]?.message_file ?? null,
      message_file_type: newMessages[0]?.message_file_type ?? null,
      message_file_metadata: newMessages[0]?.message_file_metadata ?? null,
    };
    if (payload.message.match(URLRegx)?.length > 0) {
      payload.is_contain_link = true;
    }
    sendMessageSocket({...payload});
    // setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  const renderSearchResult = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          paddingVertical: hp(0),
          backgroundColor: color.black_33 + '10',
          flexDirection: 'row',
        }}>
        <Text style={styles.blackText}>
          {searchLength > 0
            ? `1 of ${searchLength} matches`
            : 'No matches found'}
        </Text>
      </View>
    );
  };

  const onSearchMessage = async (text) => {
    if (text === '') {
      await setMessages([]);
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
      setSearchLength(0);
    } else {
      let lowerText = text.toLowerCase();
      let searchData = [];
      messages.filter((n) => {
        let note = n.text.toLowerCase();
        if (note.search(lowerText) !== -1) {
          searchData.push(n.text);
        }
      });
      await setMessages([]);
      setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
      setSearchLength(searchData.length);
    }
  };

  const renderSearchHeader = () => {
    return (
      <View
        style={[
          styles.headerContainer,
          {
            paddingTop: insets.top > 0 ? insets.top : hp(1),
          },
        ]}>
        <View style={{flex: 1, marginRight: wp(2), marginVertical: hp(0.5)}}>
          <CustomInputText
            inputRef={searchRef}
            containerStyle={{
              backgroundColor: color.lightest_gray,
              borderRadius: wp(2),
              borderWidth: 0,
            }}
            placeholderColor={color.gray}
            placeholder={'Search for a group'}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              onSearchMessage(text);
            }}
            // onSubmitEditing={() => onSearchMessage(searchText)}
            leftComponent={
              <Ionicons name={'search'} color={color.gray} size={hp(2.5)} />
            }
            rightComponent={
              searchText === '' ? (
                <View />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setSearchText('');
                    onSearchMessage('');
                  }}>
                  <MaterialIcons
                    name={'cancel'}
                    color={color.gray}
                    size={hp(2.5)}
                  />
                </TouchableOpacity>
              )
            }
            autoFocus={true}
          />
        </View>
        <Text
          style={[styles.grayText, {color: color.sky}]}
          onPress={() => {
            toggleSearch(false);
            setSearchText('');
            onSearchMessage('');
          }}>
          {'Cancel'}
        </Text>
      </View>
    );
  };

  const renderHeader = (props) => {
    return (
      <View
        style={[
          styles.headerContainer,
          {
            paddingTop: insets.top > 0 ? insets.top : hp(1),
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name={'arrow-back-ios'}
            color={color.sky}
            size={hp(3)}
          />
        </TouchableOpacity>
        {groupDetail?.group?.group_image ? (
          <FastImage
            source={{
              uri: groupDetail?.group?.group_image,
              headers: {Authorization: authToken},
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.profileImgMain}
          />
        ) : (
          <DefaultProfileImage
            name={groupDetail?.group?.short_name}
            style={styles.profileImgMain}
          />
        )}
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            if (groupDetail) {
              navigation.navigate('GroupChatInfo', {
                setSearch: () => {
                  toggleSearch(true);
                  setTimeout(() => searchRef?.current?.focus(), 100);
                },
                clearMessages: () => setMessages(GiftedChat.append([], [])),
                data: groupDetail,
                profileUri: groupDetail?.group?.group_image ?? '',
              });
            }
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.blackText]}>
              {groupDetail?.group?.group_name}
            </Text>
            {fromRideOut && (
              <View
                style={[
                  styles.todayBtn,
                  isToday || {backgroundColor: color.white},
                ]}>
                <Text
                  style={[
                    styles.whiteText,
                    isToday || {color: color.darkPink},
                  ]}>
                  {isToday
                    ? 'Starts Today'
                    : moment(item.start_time, 'YYYY-MM-DD').fromNow(true) +
                      ' to start'}
                </Text>
              </View>
            )}
          </View>
          <Text style={[styles.grayText]}>
            {groupDetail?.users?.map((item, index) => (
              <Text key={index}>
                {item?.user?.user_name}
                {index < groupDetail?.users?.length - 1 && ', '}
              </Text>
            ))}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
      }}>
      <AppLoading isLoading={isLoading} />
      {isSearch ? renderSearchHeader() : renderHeader()}
      <GiftedChat
        navigation={navigation}
        messages={messages.length > 0 ? _.uniqBy(messages, '_id') : []}
        text={text}
        onInputTextChanged={setText}
        onSend={onSend}
        user={{
          _id: userDetail?.user_id,
          name: userDetail?.user_name,
          avatar: userDetail?.profile_image,
          short_name: userDetail?.short_name,
        }}
        updatePlayStateLocally={(id, isPlaying) => {
          messages.map((n, i) => {
            if (n?.audio || n?.video) {
              Object.assign(messages[i].message_file_metadata, {
                isPlaying: n._id === id ? isPlaying : false,
              });
            }
          });
          setMessages(GiftedChat.append([], messages));
        }}
        // user={userDetail}
        alignTop
        alwaysShowSend
        scrollToBottom
        // showUserAvatar
        renderAvatarOnTop
        renderUsernameOnMessage
        bottomOffset={26}
        minInputToolbarHeight={isSearch ? hp(3) : hp(5)}
        onPressAvatar={console.log}
        renderInputToolbar={isSearch ? renderSearchResult : renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        // dateFormat={'lll'}
        renderDay={renderDay}
        // renderTime={renderTime}
        renderAvatar={renderAvatar}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        renderMessageVideo={renderMessageVideo}
        renderMessageAudio={renderMessageAudio}
        renderMessageLocation={renderMessageLocation}
        // renderFooter={renderChatFooter}
        // renderMessageImage
        renderCustomView={renderCustomView}
        listViewProps={{
          bounces: false,
        }}
        // isCustomViewBottom
        style={{flex: 1}}
        messagesContainerStyle={{
          backgroundColor: color.light_background,
          paddingBottom: isANDROID ? (isKeyboardOpen ? hp(8) : hp(4)) : hp(1),
        }}
        parsePatterns={(linkStyle) =>
          isSearch && searchText !== ''
            ? [
                {
                  pattern: linkStyleRegx,
                  style: linkStyle,
                  onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
                },
                {
                  pattern: new RegExp(searchText, 'i'),
                  style: {color: color.red},
                  onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
                },
              ]
            : [
                {
                  pattern: linkStyleRegx,
                  style: linkStyle,
                  onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
                },
              ]
        }
      />
      {!isSearch && !isKeyboardOpen && (
        <View
          style={{
            paddingBottom: insets.bottom > 0 ? insets.bottom : hp(2),
            ...styles.connectBtnContainer,
          }}>
          <TouchableOpacity style={styles.connectBtnOuter} onPress={() => {}}>
            <Text style={styles.connectBtn}>Connect</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GroupChat;

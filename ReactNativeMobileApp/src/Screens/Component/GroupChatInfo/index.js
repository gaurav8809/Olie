import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {
  ActionSheet,
  AppInfoHeader,
  CheckBox,
  DefaultProfileImage,
} from '../../Common';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {color, hp, normalize, wp} from '../../../Helper/themeHelper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  updateParticipant,
  updateAddAdmin,
  updateGroup,
  ClearGroupChat,
  ExitGroup,
  MuteGroup,
} from '../../../Redux/Actions/GroupsAction';
import {
  download,
  photo_gallary,
  round_minus,
  round_plus,
  search_chat,
  volume_off,
} from '../../Assets';
import {
  deleteActionSheet,
  exitActionSheet,
  saveToCameraActionSheet,
  muteGroupActionSheet,
  clearChatAction,
} from './data';
import {useSelector, useDispatch} from 'react-redux';
import {AddParticipants} from '../GroupRide/CreateGroups/addParticipants';
import {fetchGroupUsersSocket, loadGroupDetailSocket} from '../../../Socket';
import {openImagePicker} from '../../../Helper/imageUpload';
import {SearchParticipants} from './searchParticipants';
import moment from 'moment';

const GroupChatInfo = ({navigation, route}) => {
  const userDetail = useSelector((state) => state?.user.userDetail);
  const authToken = useSelector((state) => state?.user.authToken);
  const dispatch = useDispatch();
  const groupNameRef = useRef(null);
  const descriptionRef = useRef(null);

  const [selectMode, toggleSelectMode] = useState(null);
  const [groupDetail, setGroupDetail] = useState(route?.params?.data ?? null);
  const [actionSheet, setActionSheet] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [AddParticipantVisible, setAddParticipantVisible] = useState(false);
  const [isMuteGroup, toggleMuteGroup] = useState(false);
  const [profileImage, setProfileImage] = useState(
    groupDetail?.group?.group_image ?? '',
  );
  let DEFAULT_GROUP_NAME = groupDetail?.group?.group_name ?? '';
  let DEFAULT_DESCRIPTION = groupDetail?.group?.description ?? '';

  const [newGroupName, setNewGroupName] = useState(DEFAULT_GROUP_NAME);
  const [newDesc, setNewDesc] = useState(DEFAULT_DESCRIPTION);

  const [isGroupNameEditable, setIsGroupNameEditable] = useState(false);
  const [isDescEditable, setIsDescEditable] = useState(false);
  const [isLoading, toggleLoading] = useState(false);
  const [searchParticipants, toggleSearchParticipants] = useState(false);

  useEffect(() => {
    fetchGroupUsersSocket({
      auth_token: authToken,
      group_id: groupDetail?.group?.group_id,
    });
    loadGroupDetailSocket((data) => {
      setGroupDetail({...data});
    });
  }, []);

  useEffect(() => {
    let myData = groupDetail?.users.find(
      (x) => x.user_id == userDetail?.user_id,
    );
    if (myData) {
      let isGroupMuted = moment().isSameOrBefore(moment(myData?.mute_until));
      toggleMuteGroup(isGroupMuted);
    }
  }, [groupDetail]);

  const clearChat = () => {
    toggleLoading(true);
    dispatch(ClearGroupChat({group_id: groupDetail?.group?.group_id}))
      .then((res) => {
        toggleLoading(false);
        if (res) {
          route?.params?.clearMessages();
        }
      })
      .catch(() => {
        toggleLoading(false);
      });
  };

  const exitGroup = () => {
    toggleLoading(true);
    dispatch(ExitGroup({group_id: groupDetail?.group?.group_id}))
      .then((res) => {
        toggleLoading(false);
        if (res) {
          navigation.navigate('Home');
        }
      })
      .catch(() => {
        toggleLoading(false);
      });
  };

  const muteGroup = () => {
    if (isMuteGroup) {
      toggleLoading(true);
      dispatch(
        MuteGroup({
          group_id: groupDetail?.group?.group_id,
          mute_until: new Date(moment()),
        }),
      )
        .then((res) => {
          if (res) {
            toggleMuteGroup((isMuteGroup) => !isMuteGroup);
            alert('Enabled Notifications for this group!');
          }
          toggleLoading(false);
        })
        .catch(() => toggleLoading(false));
    } else {
      setActionSheet(
        muteGroupActionSheet(closeActionSheet, (time) => {
          toggleLoading(true);
          dispatch(
            MuteGroup({
              group_id: groupDetail?.group?.group_id,
              mute_until: time,
            }),
          )
            .then((res) => {
              if (res) {
                toggleMuteGroup((isMuteGroup) => !isMuteGroup);
                alert('Group is muted till ' + moment(time).format('LLLL'));
              }
              toggleLoading(false);
            })
            .catch(() => toggleLoading(false));
        }),
      );
    }
  };

  const profileImagePicker = () => {
    openImagePicker().then((image) => {
      toggleLoading(true);
      dispatch(
        updateGroup(
          {
            group_name: groupDetail?.group?.group_name,
            description: groupDetail?.group?.description,
            group_image: image,
          },
          groupDetail.group.group_id,
        ),
      )
        .then((res) => {
          toggleLoading(false);
          if (res) {
            setProfileImage(image);
          }
        })
        .catch((e) => toggleLoading(false));
    });
  };

  const renderParticipants = ({item, index}) => {
    let username =
      userDetail.user_id === item.user.user_id ? 'You' : item?.user?.user_name;
    let userId = item?.user?.user_id;
    return (
      <TouchableOpacity
        style={[styles.titleContainer, {paddingVertical: hp(1)}]}
        disabled={
          username === 'You' || isSelectModeAdd() || isSelectModeDelete()
        }
        onPress={() =>
          navigation.navigate('ContactInfo', {
            data: {
              name: item?.user?.user_name,
              profileUri: item?.user?.profile_image ?? null,
              short_name: item?.user?.short_name ?? '',
              ...item?.user,
            },
          })
        }>
        {(item?.user?.profile_image && (
          <Image
            style={styles.avatarStyle}
            source={{
              uri: item?.user?.profile_image,
            }}
          />
        )) || (
          <DefaultProfileImage
            name={item?.user?.short_name}
            style={styles.avatarStyle}
          />
        )}
        <Text style={[styles.smallText, {flex: 1}]}>{username}</Text>
        {selectMode ? (
          <View>
            {(isSelectModeDelete() && username === 'You') ||
              (isSelectModeAdd() && item.is_admin) || (
                <CheckBox
                  isChecked={selectedUsers.includes(userId)}
                  onPress={() => {
                    if (selectedUsers.includes(userId)) {
                      selectedUsers.splice(selectedUsers.indexOf(userId), 1);
                      setSelectedUsers([...selectedUsers]);
                    } else {
                      selectedUsers.push(userId);
                      setSelectedUsers([...selectedUsers]);
                    }
                  }}
                  rounded={true}
                  checkboxStyle={[
                    selectedUsers.includes(userId) && {
                      borderWidth: 0,
                      backgroundColor: isSelectModeDelete()
                        ? color.red
                        : color.sky,
                    },
                  ]}
                />
              )}
          </View>
        ) : (
          item.is_admin && (
            <Text style={[styles.smallText, {color: color.gray}]}>
              {'Admin'}
            </Text>
          )
        )}
      </TouchableOpacity>
    );
  };

  const isSelectModeDelete = () => selectMode && selectMode === 'Delete';
  const isSelectModeAdd = () => selectMode && selectMode === 'Add';
  const closeActionSheet = () => setActionSheet(null);

  useEffect(() => setSelectedUsers([]), [selectMode]);
  useEffect(() => toggleSelectMode(null), [actionSheet]);

  return (
    <View style={{flex: 1}}>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(255,255,255,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={color.sky}
          />
        </View>
      )}
      <AppInfoHeader
        headerText={'Group Info'}
        leftComponent={
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.goBack()}>
            <MaterialIcons
              name={'arrow-back-ios'}
              color={color.sky}
              size={hp(3)}
            />
            <Text
              style={[
                styles.smallText,
                {color: color.sky, fontSize: normalize(12), marginLeft: -wp(2)},
              ]}>
              {groupDetail?.group?.group_name}
            </Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={{backgroundColor: color.light_background}}>
        <View>
          {profileImage === '' ? (
            <DefaultProfileImage
              name={groupDetail?.group?.short_name}
              style={{flex: 1, height: hp(25)}}
              labelStyle={{fontSize: normalize(100)}}
            />
          ) : (
            <Image
              style={{flex: 1, height: hp(25)}}
              source={{
                uri:
                  typeof profileImage === 'object' && profileImage?.uri
                    ? profileImage?.uri
                    : profileImage,
              }}
            />
          )}
          <TouchableOpacity
            style={styles.cameraContainer}
            onPress={profileImagePicker}>
            <SimpleLineIcons name={'camera'} color={color.sky} size={hp(2.5)} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          {isGroupNameEditable ? (
            <TextInput
              ref={groupNameRef}
              placeholder={'Add Group Name'}
              style={styles.titleText}
              placeholderTextColor={color.gray}
              value={newGroupName}
              onChangeText={(text) => setNewGroupName(text)}
            />
          ) : (
            <Text style={[styles.titleText]}>
              {groupDetail?.group?.group_name}
            </Text>
          )}
          {isGroupNameEditable ? (
            <TouchableOpacity
              onPress={() => {
                if (newGroupName === '') {
                  alert('Group Name cannot be blank');
                  setIsGroupNameEditable(false);
                } else if (newGroupName === DEFAULT_GROUP_NAME) {
                  setIsGroupNameEditable(false);
                } else {
                  toggleLoading(true);
                  dispatch(
                    updateGroup(
                      {
                        group_name: newGroupName,
                        description: groupDetail?.group?.description,
                        group_image: groupDetail.group.group_image,
                      },
                      groupDetail.group.group_id,
                    ),
                  )
                    .then((res) => {
                      toggleLoading(false);
                      if (res) {
                        setIsGroupNameEditable(false);
                      }
                    })
                    .catch((e) => {
                      toggleLoading(false);
                      setIsGroupNameEditable(false);
                    });
                }
              }}>
              <Text style={[styles.smallText, {color: color.sky}]}>Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => groupNameRef?.current?.focus(), 50);
                setIsGroupNameEditable(true);
              }}>
              <Text style={[styles.smallText, {color: color.sky}]}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.titleContainer}>
          {isDescEditable ? (
            <TextInput
              ref={descriptionRef}
              placeholder={'Add Description'}
              style={[styles.smallText, {color: color.gray, flex: 1}]}
              placeholderTextColor={color.gray}
              value={newDesc}
              onChangeText={(text) => setNewDesc(text)}
            />
          ) : (
            <Text
              style={[
                styles.smallText,
                groupDetail?.group?.description === '' && {
                  color: color.gray,
                },
              ]}>
              {groupDetail?.group?.description === ''
                ? 'Add Description'
                : groupDetail.group.description}
            </Text>
          )}
          {isDescEditable ? (
            <TouchableOpacity
              onPress={() => {
                if (newDesc === '') {
                  setIsDescEditable(false);
                } else {
                  toggleLoading(true);
                  dispatch(
                    updateGroup(
                      {
                        group_name: groupDetail.group.group_name,
                        description: newDesc,
                        group_image: groupDetail.group.group_image,
                      },
                      groupDetail.group.group_id,
                    ),
                  )
                    .then((res) => {
                      toggleLoading(false);
                      if (res) {
                        setIsDescEditable(false);
                      }
                    })
                    .catch((e) => {
                      toggleLoading(false);
                      setIsDescEditable(false);
                    });
                }
              }}>
              <Text style={[styles.smallText, {color: color.sky}]}>Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => descriptionRef?.current?.focus(), 50);
                setIsDescEditable(true);
              }}>
              <Text style={[styles.smallText, {color: color.sky}]}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.boxContainer}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() =>
              navigation.navigate('MediaLinksDocs', {
                group_id: groupDetail.group.group_id,
              })
            }>
            <Image
              source={photo_gallary}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text style={[styles.smallText, {flex: 1}]}>
              {'Media, Links and Docs'}
            </Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => {
              navigation.goBack();
              route?.params?.setSearch();
            }}>
            <Image
              source={search_chat}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text style={[styles.smallText, {flex: 1}]}>{'Chat Search'}</Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() =>
              setActionSheet(saveToCameraActionSheet(closeActionSheet))
            }>
            <Image
              source={download}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text style={[styles.smallText, {flex: 1}]}>
              {'Save to Camera Roll'}
            </Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.titleContainer} onPress={muteGroup}>
            <Image
              source={volume_off}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text style={[styles.smallText, {flex: 1}]}>
              {isMuteGroup ? 'Unmute Group' : 'Mute group'}
            </Text>
            <MaterialIcons
              name={'arrow-forward-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={() => {
                setAddParticipantVisible(true);
              }}>
              <Text style={[styles.smallText, {flex: 1, color: color.sky}]}>
                {'Add Participants'}
              </Text>
            </TouchableOpacity>
            <MaterialIcons
              name={'arrow-forward-ios'}
              color={color.sky}
              size={hp(2.5)}
            />
          </View>
          <TouchableOpacity
            style={styles.titleContainer}
            disabled={isSelectModeAdd()}
            onPress={() => toggleSelectMode('Add')}>
            <Image
              source={round_plus}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text
              style={[
                styles.smallText,
                {flex: 1, color: isSelectModeAdd() ? color.gray : color.sky},
              ]}>
              {'Add Admin'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.titleContainer}
            disabled={isSelectModeDelete()}
            onPress={() => toggleSelectMode('Delete')}>
            <Image
              source={round_minus}
              style={styles.rowImage}
              resizeMode={'cover'}
            />
            <Text
              style={[
                styles.smallText,
                {flex: 1, color: isSelectModeDelete() ? color.gray : color.red},
              ]}>
              {'Delete Participants'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.titleContainer,
            {backgroundColor: color.transparent, paddingVertical: hp(1)},
          ]}>
          <Text
            style={[
              styles.smallText,
              {flex: 1, color: color.gray, fontSize: normalize(12)},
            ]}>
            {groupDetail?.users?.length + ' Participants'.toUpperCase()}
          </Text>
          <Text
            style={[
              styles.smallText,
              {
                color: isSelectModeDelete() ? color.red : color.sky,
                fontSize: normalize(12),
              },
            ]}
            onPress={() => {
              if (isSelectModeDelete()) {
                setActionSheet(
                  deleteActionSheet(
                    closeActionSheet,
                    () => {
                      toggleLoading(true);
                      dispatch(
                        updateParticipant({
                          group_id: groupDetail.group.group_id,
                          update_type: 'remove',
                          user_ids: selectedUsers,
                        }),
                      )
                        .then((res) => {
                          toggleLoading(false);
                          toggleSelectMode(null);
                        })
                        .catch((e) => toggleLoading(false));
                    },
                    selectedUsers.length,
                  ),
                );
              } else if (isSelectModeAdd()) {
                toggleLoading(true);
                dispatch(
                  updateAddAdmin({
                    group_id: groupDetail.group.group_id,
                    is_admin: true,
                    user_ids: selectedUsers,
                  }),
                )
                  .then((res) => {
                    toggleLoading(false);
                    toggleSelectMode(null);
                  })
                  .catch((e) => toggleLoading(false));
              } else {
                toggleSearchParticipants(true);
              }
            }}>
            {selectMode ? selectMode : 'Search'}
          </Text>
        </View>

        <View>
          <FlatList
            data={groupDetail.users}
            renderItem={renderParticipants}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.boxContainer}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => {
              setActionSheet(
                clearChatAction(() => {
                  clearChat();
                  closeActionSheet();
                }),
              );
            }}>
            <Text style={[styles.smallText, {flex: 1, color: color.red}]}>
              {'Clear Chat'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.boxContainer, {marginBottom: hp(5)}]}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() =>
              setActionSheet(
                exitActionSheet(
                  closeActionSheet,
                  groupDetail?.group?.group_name,
                  exitGroup,
                ),
              )
            }>
            <Text style={[styles.smallText, {flex: 1, color: color.red}]}>
              {'Exit Group'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ActionSheet
        containerStyle={{paddingBottom: hp(0)}}
        data={actionSheet}
        visible={actionSheet !== null}
        setActionSheet={() => setActionSheet(null)}
      />
      <Modal transparent={true} visible={AddParticipantVisible}>
        <View
          style={{
            backgroundColor: '#ffffff',
            // marginTop: hp(5),
            flex: 1,
          }}>
          <AddParticipants
            fromGroupInfo={true}
            addedUsers={groupDetail?.users}
            rightComponentName={'Add'}
            onNext={(data) => {
              toggleLoading(true);
              dispatch(
                updateParticipant({
                  group_id: groupDetail.group.group_id,
                  update_type: 'add',
                  user_ids: data,
                }),
              )
                .then((res) => {
                  toggleLoading(false);
                  setAddParticipantVisible(false);
                })
                .catch((e) => toggleLoading(false));
            }}
            onCancel={(data) => {
              setAddParticipantVisible(false);
            }}
          />
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={searchParticipants}
        onRequestClose={() => toggleSearchParticipants(false)}>
        <SearchParticipants
          hideCheckBox={true}
          fromGroupInfo={true}
          listData={groupDetail?.users}
          rightComponentName={'   '}
          headerText={'Search Participants'}
          onNext={() => {}}
          navigation={navigation}
          onCancel={() => {
            toggleSearchParticipants(false);
          }}
        />
      </Modal>
    </View>
  );
};
export default GroupChatInfo;

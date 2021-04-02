import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import {AppInfoHeader, DefaultProfileImage} from '../../../Common';
import styles from './styles';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {camera} from '../../../Assets';
import _ from 'lodash';
import {openImagePicker} from '../../../../Helper/imageUpload';
import {CreateGroup} from '../../../../Redux/Actions/GroupsAction';
import {openSettings} from 'react-native-permissions';

export const NewGroupRide = (props) => {
  const {onCancel = null, navigation} = props;
  const {participants} = props;
  const friendsList = useSelector((state) => state?.friends?.olieFriends);
  const [selectedparticipants, setSelectedParticipants] = useState({});
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let data = [];
    _.map(friendsList, (i) =>
      _.find(i.data, (x) => {
        if (participants.includes(x.friend_user_id)) {
          data.push(x);
        }
      }),
    );
    setSelectedParticipants([...data]);
  }, [participants]);

  const removeParticipant = (user) => {
    let data = selectedparticipants;
    _.remove(data, (x) => x.friend_user_id === user);
    setSelectedParticipants([...data]);
    const index = participants.indexOf(user);
    participants.splice(index, 1);
    if (selectedparticipants.length === 0) {
      alert('Atleast One participant needed');
      onCancel();
    }
  };

  const renderParticipantsList = ({item}) => {
    const {user = null, friend_user_id} = item;
    return (
      <View style={styles.selectedContactInnerView}>
        <View>
          {user?.profile_image ? (
            <Image
              style={styles.selectedParticipantImage}
              source={{
                uri: user?.profile_image,
              }}
            />
          ) : (
            <DefaultProfileImage
              name={user?.short_name}
              style={styles.selectedParticipantImage}
            />
          )}
          <TouchableOpacity
            style={styles.selectedContactButtonView}
            onPress={() => {
              removeParticipant(friend_user_id);
            }}>
            <Ionicons name={'close'} color={color.white} size={wp(4)} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onSubmit = () => {
    if (groupName === '') {
      alert('Please Enter Group Name');
    } else {
      dispatch(
        CreateGroup({
          group_name: groupName,
          description: '',
          group_image: groupImage,
          group_users: JSON.stringify(participants),
        }),
      ).then((res) => {
        if (res) {
          Alert.alert(
            'Alert',
            groupName + ' is created!',
            [
              {
                text: 'Okay',
                onPress: () => navigation.navigate('Home'),
              },
            ],
            {cancelable: false},
          );
        }
      });
    }
  };

  const uploadGroupImage = () => {
    openImagePicker().then((image) => {
      setGroupImage(image);
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <AppInfoHeader
        leftComponent={
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.sideTextStyle}>Cancel</Text>
          </TouchableOpacity>
        }
        headerText={'New Group Ride'}
        containerStyle={{paddingTop: hp(2), backgroundColor: color.white}}
        rightComponent={
          <TouchableOpacity onPress={onSubmit}>
            <Text style={[styles.sideTextStyle]}>Create</Text>
          </TouchableOpacity>
        }
      />
      <View style={{flexDirection: 'row', paddingHorizontal: wp(5)}}>
        <TouchableOpacity
          style={styles.imageGroupStyle}
          onPress={uploadGroupImage}>
          {!groupImage || groupImage === '' ? (
            <Image
              source={camera}
              style={{
                resizeMode: 'contain',
                flex: 1,
                height: '40%',
                width: '40%',
              }}
            />
          ) : (
            <Image
              source={{
                uri:
                  (typeof groupImage === 'object' && groupImage?.uri) ||
                  groupImage,
              }}
              style={{height: '100%', width: '100%'}}
              resizeMode={'cover'}
            />
          )}
        </TouchableOpacity>
        <View style={styles.groupNameInputContainer}>
          <TextInput
            placeholder={'Group Name'}
            style={{
              fontFamily: fonts.Lato_Regular,
              fontSize: normalize(14),
            }}
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
            placeholderTextColor={color.gray}
          />
        </View>
      </View>
      <View style={styles.selectedParticipantMainView}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={selectedparticipants || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderParticipantsList}
        />
      </View>
    </View>
  );
};

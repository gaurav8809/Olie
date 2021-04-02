import React, {useState} from 'react';
import styles from './styles';
import {Image, Text, View} from 'react-native';
import {
  hp,
  color,
  isANDROID,
  wp,
  normalize,
} from '../../../../Helper/themeHelper';
import {AppButton, CustomInputText, DefaultProfileImage} from '../../../Common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AddFriendByPhone} from '../../../../Redux/Actions/FriendsAction';
import {useDispatch, useSelector} from 'react-redux';

export const AddFriendTab = (props) => {
  const [number, setNumber] = useState('');
  const [isNotNull, setIsNotnull] = useState(false);
  const [isLoading, toggleLoading] = useState(false);
  const user = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();

  const onAddContact = () => {
    toggleLoading(true);
    dispatch(AddFriendByPhone({phone_number: number}))
      .then((res) => {
        if (res) {
          alert(number + ' is added to your friend list');
        }
        toggleLoading(false);
      })
      .catch((e) => {
        toggleLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {user?.profile_image ? (
          <Image
            source={{uri: user?.profile_image}}
            style={styles.imageStyle}
          />
        ) : (
          <DefaultProfileImage
            name={user?.short_name}
            style={styles.imageStyle}
            labelStyle={{fontSize: normalize(40)}}
          />
        )}

        <Text style={styles.textTitle}>{user?.user_name}</Text>
        <Text style={[styles.textTitle, {marginVertical: hp(2)}]}>
          Add Friend
        </Text>

        <Text style={[styles.regularText, {marginHorizontal: wp(16)}]}>
          To Add someone to your Friends List enter their Phone Number
        </Text>

        <View
          style={{
            marginVertical: isANDROID ? hp(1) : hp(3),
            justifyItems: 'center',
          }}>
          <CustomInputText
            value={number}
            onChangeText={(text) => {
              setNumber(text);
              setIsNotnull(true);
              if (text.length === 0) {
                setIsNotnull(false);
              }
            }}
            containerStyle={styles.inputTextStyle}
            keyboardType={'phone-pad'}
          />
        </View>

        <AppButton
          isLoading={isLoading}
          label={'Add to contacts list'}
          disabled={!isNotNull}
          onPress={onAddContact}
          btnStyle={[
            styles.addButton,
            {
              backgroundColor: isNotNull ? color.sky : color.gray,
            },
          ]}
        />
      </View>
      {/* <View style={[styles.bottomView]}>
        <View style={{justifyContent: 'center'}}>
          <Text style={[styles.textTitle, {marginBottom: hp(2)}]}>Connect</Text>
          <AppButton
            label={'Add Facebook Friends'}
            rightComponent={
              <View style={[styles.facebookIcon, {left: -20}]}>
                <MaterialCommunityIcons
                  name={'facebook'}
                  color={color.white}
                  size={hp(3)}
                />
              </View>
            }
            btnStyle={[styles.facebookBtn]}
          />
        </View>
      </View>*/}
    </View>
  );
};

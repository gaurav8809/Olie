import React from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import styles from '../../Home/FindFriendsTab/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ConfirmationModal = ({onClose}) => {
  return (
    <Modal transparent={true}>
      <View
        style={{
          backgroundColor: '#FFFFFFaa',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: color.black_33,
            marginHorizontal: wp(6.4),
            paddingVertical: hp(4),
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.selectedCloseButtonView}
            onPress={() => {
              onClose();
            }}>
            <Ionicons name={'close'} color={color.darkgray} size={wp(4)} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: normalize(30),
                fontFamily: fonts.Lato_Regular,
                color: color.white,
                marginHorizontal: wp(5),
              }}>
              Your sponsored
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: normalize(30),
                fontFamily: fonts.Lato_Regular,
                color: color.white,
                marginHorizontal: wp(5),
              }}>
              ride out has been
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: normalize(30),
                fontFamily: fonts.Lato_Regular,
                color: color.white,
                marginHorizontal: wp(5),
              }}>
              submmited for review
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onClose();
            }}>
            <View
              style={{
                marginTop: hp(3),
                height: hp(5),
                width: wp(57),
                backgroundColor: color.sky,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
                shadowOpacity: 0.6,
                shadowColor: color.black,
                shadowRadius: 6,
                shadowOffset: {height: 5, width: 0},
                elevation: 2,
              }}>
              <Text
                style={{
                  color: color.white,
                  fontSize: normalize(14),
                  fontFamily: fonts.Lato_Bold,
                }}>
                Finish
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

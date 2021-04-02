import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../Helper/themeHelper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-generator';
import {AppButton} from './AppButton';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

export const QrCodeView = (props) => {
  let user = useSelector((state) => state.user.userDetail);
  const email = user?.email ?? '';
  const onClose = () => setViewQrCodePopup(false);
  const [viewQrCodePopup, setViewQrCodePopup] = useState(false);

  const renderQRCode = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}>
        <View
          style={{
            width: wp(88),
            height: hp(40),
            borderRadius: wp(5),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View style={styles.qrCodeUserView}>
            <Text style={styles.qrCodeUserText}>
              User : <Text style={{color: color.black}}>{email}</Text>
            </Text>
            <TouchableOpacity onPress={() => onClose()}>
              <MaterialCommunityIcons
                name={'close-circle'}
                color={color.gray}
                size={wp(5)}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.qrCodeView}>
            <QRCode value={email} size={150} bgColor="black" fgColor="white" />
          </View>

          <AppButton
            label={'Ok'}
            isRounded={false}
            btnStyle={[styles.btnQrCode]}
            onPress={() => onClose()}
          />
        </View>
      </View>
    );
  };
  return (
    <View>
      <AppButton
        isRounded={false}
        label={'My QR CODE'}
        btnStyle={styles.btnQrCode}
        labelStyle={styles.btnQrText}
        onPress={() => {
          setViewQrCodePopup(true);
        }}
      />
      <Modal
        animationType={'none'}
        transparent={true}
        visible={viewQrCodePopup}
        onRequestClose={() => setViewQrCodePopup(false)}>
        {viewQrCodePopup && renderQRCode()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  btnQrText: {
    fontSize: normalize(12),
    color: color.white,
    textAlign: 'center',
    flex: 1,
    fontFamily: fonts.Lato_Bold,
  },
  btnQrCode: {
    width: wp(30),
    marginVertical: hp(1),
    backgroundColor: color.sky,
    shadowOpacity: 0.2,
    paddingVertical: hp(1),
  },
  qrCodeUserView: {
    marginHorizontal: wp(6),
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrCodeUserText: {
    flex: 1,
    fontSize: normalize(13),
    fontFamily: fonts.Lato_Bold,
    color: color.gray,
  },
  qrCodeView: {
    // flex: 1,
    marginVertical: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: wp(20),
    height: hp(4),
    alignSelf: 'center',
    paddingVertical: hp(0),
    marginHorizontal: wp(2),
    marginVertical: hp(2),
    backgroundColor: color.sky,
    borderRadius: hp(0.5),
    shadowRadius: 0,
    shadowColor: 0,
    elevation: 0,
  },
  buttonLayout: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: wp(3),
  },
});

import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  color,
  fonts,
  hp,
  isANDROID,
  normalize,
  wp,
} from '../../Helper/themeHelper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BottomPopUpModal = (props) => {
  const {
    visible = false,
    onRequestClose = null,
    setBottomPopUp = false,
    contentContainerStyle = null,
    children,
    isModal = false,
  } = props;
  const insets = useSafeAreaInsets();
  const InnerComp = () => (
    <TouchableOpacity
      activeOpacity={1}
      style={[isModal ? styles.withModalMainContainer : styles.mainContainer]}>
      <View
        style={[
          styles.contentContainer,
          {paddingBottom: insets.bottom > 0 ? insets.bottom + hp(5) : hp(8)},
          contentContainerStyle,
        ]}>
        <TouchableOpacity onPress={setBottomPopUp} style={styles.closeBtn}>
          <MaterialCommunityIcons
            name={'close-circle'}
            color={color.gray}
            size={wp(5)}
          />
        </TouchableOpacity>
        <View style={{marginTop: hp(0.5)}}>{children}</View>
      </View>
    </TouchableOpacity>
  );

  return isModal ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <InnerComp />
    </Modal>
  ) : (
    <InnerComp />
  );
};
const styles = StyleSheet.create({
  withModalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainContainer: {
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    backgroundColor: color.white,
    // height: hp(25),
    // width: wp(100),
    shadowOpacity: 0.2,
    shadowColor: color.black,
    shadowRadius: 6,
    shadowOffset: {height: 5, width: 0},
    elevation: 2,
    opacity: 0.85,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    right: wp(2),
    top: hp(1),
  },
});

export default BottomPopUpModal;

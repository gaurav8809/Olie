import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {color, normalize, hp, wp, fonts} from '../../Helper/themeHelper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CheckBox = ({
  title = '',
  isChecked = false,
  onPress = null,
  viewStyle = null,
  titleStyle = null,
  rounded = false,
  checkboxStyle = false,
}) => {
  const {container, textStyle, checkbox} = styles;
  return (
    <View style={[container, viewStyle]}>
      <TouchableOpacity
        style={[checkbox, rounded && styles.roundedCheckBox, checkboxStyle]}
        onPress={onPress}
        activeOpacity={0.5}>
        {isChecked && (
          <MaterialCommunityIcons
            name={'check'}
            color={color.white}
            size={hp(2)}
          />
        )}
      </TouchableOpacity>
      <Text style={[textStyle, titleStyle]}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  checkbox: {
    height: hp(2),
    width: hp(2),
    borderRadius: hp(0.3),
    backgroundColor: color.black_33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedCheckBox: {
    height: hp(3),
    width: hp(3),
    borderRadius: hp(1.5),
    borderWidth: 1,
    borderColor: color.gray,
    backgroundColor: color.white,
  },
  textStyle: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: color.black_33,
    fontFamily: fonts.Lato_Bold,
    marginLeft: wp(2),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {CheckBox};

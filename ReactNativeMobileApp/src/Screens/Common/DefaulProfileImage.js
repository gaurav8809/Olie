import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {color, normalize, hp, wp, fonts} from '../../Helper/themeHelper';

export const DefaultProfileImage = ({
  name = '',
  style = null,
  labelStyle = null,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.textStyle, labelStyle]}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.profileImageGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: color.white,
    fontFamily: fonts.Lato_Bold,
    fontSize: normalize(16),
  },
});

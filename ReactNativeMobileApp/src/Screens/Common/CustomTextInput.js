import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {color, normalize, hp, wp, fonts} from '../../Helper/themeHelper';

const CustomInputText = (props) => {
  const {
    value = '',
    onChangeText = null,
    placeholder = '',
    placeholderColor = color.white,
    inputStyle = null,
    containerStyle = null,
    title = '',
    titleStyle = null,
    viewStyle = null,
    rightComponent = <View />,
    leftComponent = <View />,
    inputRef = null,
  } = props;
  const {textInput, container, textStyle} = styles;
  return (
    <View style={viewStyle}>
      {title !== '' && <Text style={[textStyle, titleStyle]}>{title}</Text>}
      <View style={[container, containerStyle]}>
        {leftComponent && leftComponent}
        <TextInput
          ref={inputRef}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={[textInput, inputStyle]}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnKeyType={'done'}
          {...props}
        />
        {rightComponent}
      </View>
    </View>
  );
};

const CustomProfileInputText = (props) => {
  const {
    value = '',
    onChangeText = null,
    placeholder = '',
    placeholderColor = color.black_33,
    inputStyle = null,
    containerStyle = null,
    title = '',
    titleStyle = null,
    viewStyle = null,
    rightComponent = <View />,
    leftComponent = <View />,
  } = props;
  const {textInput, profileContainer, textProfileStyle} = styles;
  return (
    <View style={viewStyle}>
      {title !== '' && (
        <Text style={[textProfileStyle, titleStyle]}>{title}</Text>
      )}
      <View style={[profileContainer, containerStyle]}>
        {leftComponent && leftComponent}
        <TextInput
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={[textInput, inputStyle]}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnKeyType={'done'}
          {...props}
        />
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: hp(4),
    borderColor: color.white,
    overflow: 'hidden',
    backgroundColor: color.transparent,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    marginTop: hp(0.5),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.gray,
    overflow: 'hidden',
    backgroundColor: color.transparent,
    // paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    // marginTop: hp(0.5),
  },
  textInput: {
    height: hp(4),
    fontSize: normalize(14),
    backgroundColor: color.transparent,
    color: color.black_33,
    paddingHorizontal: 0,
    flex: 1,
    paddingVertical: 0,
    fontFamily: fonts.Lato_Regular,
  },
  textStyle: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: color.black_33,
    fontFamily: fonts.Lato_Bold,
  },
  textProfileStyle: {
    fontSize: normalize(10),
    color: color.gray,
    fontFamily: fonts.Lato_Bold,
  },
});

export {CustomInputText, CustomProfileInputText};

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import {color, fonts, hp, normalize, wp} from '../../Helper/themeHelper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppButton = ({
  btnStyle = null,
  labelStyle = null,
  onPress = null,
  label = '',
  disabled = false,
  isLoading = false,
  isRounded = true,
  rightComponent = <View />,
}) => {
  const {container, textStyle} = styles;
  return (
    <TouchableOpacity
      style={[container, {borderRadius: isRounded ? hp(4) : hp(0.5)}, btnStyle]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={color.white}
          animating={isLoading}
        />
      ) : (
        <View style={styles.innerComponent}>
          {rightComponent}
          <Text style={[textStyle, labelStyle]}>{isLoading ? '' : label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const AppBorderButton = ({
  btnStyle = null,
  labelStyle = null,
  onPress = null,
  label = '',
  disabled = false,
  isLoading = false,
}) => {
  const {borderContainer, borderTextStyle} = styles;
  return (
    <TouchableOpacity
      style={[borderContainer, btnStyle]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading && (
        <ActivityIndicator
          size={'small'}
          color={color.white}
          animating={isLoading}
        />
      )}
      <Text style={[borderTextStyle, labelStyle]}>
        {isLoading ? '' : label}
      </Text>
    </TouchableOpacity>
  );
};

const ArrowButton = (props) => {
  const {
    btnStyle = null,
    onPress = null,
    disabled = false,
    isLoading = false,
    rotateDeg = 0,
  } = props;
  return (
    <TouchableOpacity
      style={[{alignSelf: 'flex-end'}, btnStyle]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      <Ionicons
        name={'chevron-forward-circle'}
        color={'rgba(255, 255, 255, 0.9)'}
        size={hp(5)}
        style={{transform: [{rotate: rotateDeg + 'deg'}]}}
      />
    </TouchableOpacity>
  );
};

const ShowMoreButton = (props) => {
  const {
    btnStyle = null,
    onPress = null,
    disabled = false,
    isLoading = false,
    name = null,
  } = props;
  return (
    <TouchableOpacity
      style={[{alignSelf: 'flex-end'}, btnStyle]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      <Ionicons name={name} color={color.sky} size={hp(3.5)} />
    </TouchableOpacity>
  );
};

const CircularButton = (props) => {
  const {viewStyle = null, textStyle = null, onPress, label = ''} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.circularButton, viewStyle]}>
      <Text style={[styles.circularButtonLabel, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1.5),
    backgroundColor: color.black_33,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.6,
    shadowColor: color.black,
    shadowRadius: 6,
    shadowOffset: {height: 5, width: 0},
    elevation: 2,
    flexDirection: 'row',
    zIndex: 0,
  },
  textStyle: {
    fontSize: normalize(14),
    color: color.white,
    fontFamily: fonts.Lato_Bold,
  },
  borderContainer: {
    paddingVertical: hp(1.5),
    backgroundColor: color.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: color.white,
    borderRadius: hp(4),
    flexDirection: 'row',
  },
  borderTextStyle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    color: color.black_33,
    fontFamily: fonts.Lato_Bold,
  },
  innerComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  circularButton: {
    backgroundColor: color.black,
    height: wp(20),
    width: wp(20),
    borderRadius: 100,
    alignItems: 'center',
  },
  circularButtonLabel: {
    color: color.white,
    fontWeight: '600',
    fontFamily: fonts.Lato_Bold,
    fontSize: normalize(19),
  },
});

export {
  AppButton,
  AppBorderButton,
  ArrowButton,
  ShowMoreButton,
  CircularButton,
};

import {Dimensions, PixelRatio, Platform} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isIOS = Platform.OS === 'ios';
const isANDROID = Platform.OS === 'android';
const isiPAD = screenHeight / screenWidth < 1.6;

const widthPercentageToDP = (wp) => {
  const widthPercent = wp;
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (hp) => {
  const heightPercent = hp;
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

// based on iphone 5s's scale
const scale = screenWidth / 375;
const normalize = (size) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const color = {
  black: '#000000',
  white: '#ffffff',
  pink: '#ff3b6c',
  red: '#fc3d39',
  light_gray_backgraound: 'rgba(236,236,247,0.9)',
  green_background: '#28b7b5',
  sky: '#35dad7',
  black_33: '#333333',
  light_black: '#272626',
  transparent: 'transparent',
  gray: '#b6b6b6',
  darkgray: '#3c3c43',
  lightgray: '#f3f3f3',
  lightest_gray: '#F9F9F9',
  map_text_gray: '#58595C',
  light_background: '#f2f2f7',
  transparent_white: 'rgba(255, 255, 255, 0.1)',
  darkPink: '#ff3366',
  lightSky: '#c1f4f4',
  mediumgray: '#F2F2F7',
  orange: 'rgb(235, 87, 87)',
  separator: 'rgb(225,225,225)',
  profileImageGray: '#DADADA',
  lightpink: '#fba0b7',
  green: '#7dd37c',
};

const fonts = {
  Lato_Regular: 'Lato-Regular',
  Lato_Bold: 'Lato-Bold',
};

export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  screenHeight,
  screenWidth,
  normalize,
  isIOS,
  isANDROID,
  isiPAD,
  color,
  fonts,
};

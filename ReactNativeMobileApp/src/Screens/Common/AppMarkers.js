import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {color, hp, wp} from '../../Helper/themeHelper';
import mainStyles from '../Component/Map/styles';
import {place_2} from '../Assets';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CurrentMarker = ({outerViewEnable, angle}) => {
  let _angle = parseInt(angle);
  console.log(_angle);

  return outerViewEnable ? (
    <View style={[styles.currentMarkerContainer]}>
      {/*<FontAwesome name={'location-arrow'} color={color.sky} size={hp(10)} />*/}
      <Image
        source={{
          uri:
            'https://www.google.com/search?q=navigation+arrow&rlz=1C5CHFA_enIN886IN886&sxsrf=ALeKk00lUUBg8OwogC30-avM6P1I9WlQbQ:1603178736684&tbm=isch&source=iu&ictx=1&fir=LVVZx-9Y-YpjQM%252Cch1HysBOeXeN7M%252C_&vet=1&usg=AI4_-kSS6BVcv0VnY2ybHxuGraW9dY9paA&sa=X&ved=2ahUKEwjC7PGY0sLsAhU1IbcAHTlGDtQQ9QF6BAgKEFs&biw=1366&bih=615#imgrc=LVVZx-9Y-YpjQM',
        }}
        style={{width: wp(10), height: hp(20)}}
      />
      <View style={mainStyles.currentMarker} />
    </View>
  ) : (
    <MaterialCommunityIcons
      style={{transform: [{rotate: `${_angle}deg`}]}}
      name={'navigation'}
      color={color.orange}
      size={wp(5)}
    />
    // <Image
    //     source={{
    //       uri:
    //           'https://static.thenounproject.com/png/654003-200.png',
    //     }}
    //     style={{width: wp(10), height: hp(20),transform: [{rotate: `${angle}deg`}]}}
    // />
    // <View
    //   style={[mainStyles.currentMarker, {transform: [{rotate: `${angle}deg`}]}]}
    // />
  );
};

const DestinationMarker = ({outerViewEnable}) => {
  return outerViewEnable ? (
    <View style={styles.destMarkerContainer}>
      <View style={styles.destMarker} />
    </View>
  ) : (
    <View style={styles.destMarker} />
  );
};

const styles = StyleSheet.create({
  currentMarkerContainer: {
    // backgroundColor: 'rgba(53, 218, 215, 0.35)',
    borderRadius: 100,
    padding: wp(7),
  },
  currentMarker: {
    borderColor: color.white,
    borderWidth: wp(0.7),
    width: wp(5),
    height: wp(5),
    backgroundColor: color.sky,
    borderRadius: 100,
  },
  destMarkerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 200,
  },
  destMarker: {
    borderColor: color.white,
    borderWidth: wp(0.7),
    width: wp(6),
    height: wp(6),
    backgroundColor: color.black,
    borderRadius: 100,
  },
});

export {CurrentMarker, DestinationMarker};

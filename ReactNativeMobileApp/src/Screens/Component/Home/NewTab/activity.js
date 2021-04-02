import React, {useState, useRef, useEffect} from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {hp, normalize, wp} from '../../../../Helper/themeHelper';
import {AppButton, ArrowButton, PopUp} from '../../../Common';
import ActivityTab from './ActivityModal/index';
import {
  executeWidgetAnimation,
  getViewPosition,
} from '../../../../Helper/appHelper';
import {useSelector} from 'react-redux';
import {toHHMMSS} from '../../../../Helper/validation';

export const Activity = (props) => {
  const [isPopUp, togglePopUp] = useState(false);
  const [setActivityModal] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isAnimated, toggleIsAnimated] = useState(false);
  const activities = useSelector((state) => state.activities.activities);

  const renderDetail = (text1 = '', text2 = '') => {
    return (
      <View style={{flex: 1, paddingLeft: wp(10), paddingVertical: hp(1.5)}}>
        <Text style={[styles.whiteText, {fontSize: normalize(16)}]}>
          {text1}
        </Text>
        <Text style={[styles.whiteText]}>{text2}</Text>
      </View>
    );
  };

  const renderModal = () => {
    return (
      <LinearGradient
        colors={['#23dad8', '#5fc4ff']}
        style={styles.activityModalcontainer}>
        <View style={{paddingHorizontal: wp(5)}}>
          <Text style={styles.whiteBoldText}>Activity</Text>
          <Text
            style={[styles.whiteText, {marginTop: hp(2), marginBottom: hp(3)}]}>
            Check out weekly activity, your badge progress, challenges and ride
            out events!
          </Text>
        </View>
        <View style={styles.activityMileView}>
          <Text style={[styles.whiteBoldText, {fontSize: normalize(14)}]}>
            This Week
          </Text>
          <Text style={[styles.whiteBoldText, styles.mileText]}>
            {activities?.distance?.toFixed(2) ?? '00.00'} {' miles'}
          </Text>
          <Text style={[styles.whiteText]}>Total Distance</Text>
        </View>
        <View style={styles.activityDetailView}>
          <View style={{flexDirection: 'row'}}>
            {renderDetail(activities?.speed?.toFixed(2) ?? '0.0mph', 'Speed')}
            {renderDetail(
              activities && activities.time
                ? toHHMMSS(activities.time)
                : '00:00:00',
              'Time',
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            {renderDetail(activities?.calories ?? '00000', 'Calories')}
            {/*{renderDetail(activities?.points ?? '0', 'Points')}*/}
          </View>
        </View>
        <View style={{flex: 1}}>
          <AppButton
            isRounded={false}
            label={'All Activities'}
            btnStyle={{
              marginHorizontal: wp(20),
              paddingVertical: hp(0.8),
              marginTop: hp(2),
            }}
            onPress={() => {
              toggleIsAnimated(false);
              togglePopUp(false);
              setPosition(null);
              setTimeout(() => {
                props.navigation.navigate('ActivityTab');
              }, 100);
            }}
          />
        </View>
        <ArrowButton
          onPress={closePopup}
          rotateDeg={210}
          btnStyle={{
            marginHorizontal: wp(3),
          }}
        />
      </LinearGradient>
    );
  };
  const closePopup = () => {
    toggleIsAnimated(false);
    executeWidgetAnimation(() => {
      togglePopUp(false);
      setPosition(null);
    });
  };

  const openPopup = () => {
    togglePopUp(true);
    getViewPosition(containerRef.current).then((data) => {
      setPosition({...data});
      setTimeout(() => {
        executeWidgetAnimation();
        toggleIsAnimated(true);
      }, 10);
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.container}
        ref={containerRef}
        renderToHardwareTextureAndroid={true}>
        <LinearGradient
          colors={['#23dad8', '#5fc4ff']}
          style={styles.container}>
          <View style={styles.activityContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.whiteBoldText}>Activity</Text>
              <Text style={styles.whiteText}>Total Distance</Text>
              <Text style={[styles.whiteBoldText, {marginTop: hp(1)}]}>
                {activities?.distance?.toFixed(2) ?? '00.00'} {' miles'}
              </Text>
            </View>
            <ArrowButton onPress={openPopup} rotateDeg={45} />
          </View>
        </LinearGradient>
      </View>
      <PopUp
        animationType={'none'}
        visible={isPopUp}
        onRequestClose={closePopup}
        containerStyle={{borderRadius: wp(5)}}
        isAnimated={isAnimated}
        position={position}>
        {isPopUp && renderModal()}
      </PopUp>
    </View>
  );
};

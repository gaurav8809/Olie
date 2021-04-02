import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {FlatList, Image, ScrollView, Text, View, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppBorderButton, ArrowButton, PopUp} from '../../../Common';
import {useDispatch, useSelector} from 'react-redux';
import {
  executeWidgetAnimation,
  getViewPosition,
} from '../../../../Helper/appHelper';
import {wp, hp, color, fonts, normalize} from '../../../../Helper/themeHelper';
import {SubscribeChallenge} from '../../../../Redux/Actions/ChallangesAction';

export const ChallengesTab = (props) => {
  const [viewDetail, setViewDetail] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');
  const challenges = useSelector((state) => state.challenges.challenges);
  const [position, setPosition] = useState(null);
  const [isAnimated, toggleIsAnimated] = useState(false);
  const dispatch = useDispatch();
  let containerRef = [];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  challenges.map(() => containerRef.push(useRef(null)));

  const subscribeChallenge = (challengeId) => {
    dispatch(SubscribeChallenge(challengeId)).then((res) => {
      if (res.success) {
        alert('Your Subscription for this challenge is done!');
        // closePopup();
      }
    });
  };
  const renderModal = () => {
    let colors = challenges[selectedIndex].theme_color;
    if (challenges[selectedIndex].theme_color.length === 1) {
      colors.push(colors[0]);
    }
    const item = challenges[selectedIndex];
    return (
      <View style={{flex: 1}}>
        <LinearGradient colors={colors} style={[styles.linearGradientModalBg]}>
          <View style={styles.modalTextHeaderView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.titleTextStyle, {flex: 3}]}>
                {challenges[selectedIndex] &&
                  challenges[selectedIndex].title.trim()}
              </Text>
              {challenges[selectedIndex].challenge_type === 'ride_out' && (
                <AppBorderButton
                  label={'Ride Out'}
                  btnStyle={styles.btnRideOut}
                  labelStyle={styles.btnRideOutText}
                  disabled={true}
                />
              )}
            </View>
            <Image
              source={
                challenges[selectedIndex]
                  ? {
                      uri: challenges[selectedIndex].challenge_image,
                    }
                  : {uri: ''}
              }
              resizeMode={'cover'}
              style={styles.modalImageBg}
            />
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                <Text style={styles.challengeTypeText}>
                  {challenges[selectedIndex] &&
                    challenges[selectedIndex].sub_title}
                </Text>
                <ScrollView style={{flex: 1}}>
                  <Text style={styles.descriptionText}>
                    {new Date(item?.start_time).toDateString()}
                    {item?.end_time && (
                      <Text> - {new Date(item?.end_time).toDateString()}</Text>
                    )}
                  </Text>
                  {(item?.measurement_message && (
                    <Text style={styles.descriptionText}>
                      {item?.measurement_message}
                    </Text>
                  )) ||
                    null}
                  <Text style={styles.descriptionText}>
                    {challenges[selectedIndex] &&
                      challenges[selectedIndex].description}
                  </Text>
                </ScrollView>
              </View>

              <View
                style={{
                  justifyItems: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: hp(1),
                }}>
                {challenges[selectedIndex].challenge_type === 'ride_out' ? (
                  <AppBorderButton
                    label={'Sign up'}
                    btnStyle={{
                      paddingVertical: hp(1),
                      borderRadius: wp(2),
                      borderWidth: wp(0.2),
                      paddingHorizontal: wp(7),
                    }}
                    labelStyle={[
                      styles.btnRideOutText,
                      {fontFamily: fonts.Lato_Bold, fontSize: normalize(12)},
                    ]}
                    onPress={() => {
                      challenges[selectedIndex].website &&
                        Linking.openURL(
                          `https://${challenges[selectedIndex].website}`,
                        );
                    }}
                  />
                ) : (
                  <AppBorderButton
                    label={'Subscribe'}
                    btnStyle={{
                      paddingVertical: hp(1),
                      borderRadius: wp(2),
                      borderWidth: wp(0.2),
                      paddingHorizontal: wp(7),
                    }}
                    labelStyle={[
                      styles.btnRideOutText,
                      {fontFamily: fonts.Lato_Bold, fontSize: normalize(12)},
                    ]}
                    onPress={() => {
                      subscribeChallenge(
                        challenges[selectedIndex].challenge_id,
                      );
                    }}
                  />
                )}
              </View>

              <View>
                <ArrowButton onPress={closePopup} rotateDeg={270} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    let colors = item.theme_color;
    if (item.theme_color.length === 1) {
      colors.push(colors[0]);
    }
    return (
      <View style={styles.challengeItemBg} ref={containerRef[index]}>
        <LinearGradient colors={colors} style={styles.linearGradientBg}>
          <View style={styles.btnBg}>
            <Text style={styles.titleTextStyle}>{item.title.trim()}</Text>
            <Image
              source={{uri: item.challenge_image}}
              style={styles.imageStyle}
              resizeMode={'cover'}
            />
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  paddingBottom: hp(1),
                }}>
                <Text style={styles.challengeTypeText}>{item.sub_title}</Text>
                <Text style={styles.descriptionText}>
                  {new Date(item?.start_time).toDateString()}
                  {item?.end_time && (
                    <Text> - {new Date(item?.end_time).toDateString()}</Text>
                  )}
                </Text>
                {item?.measurement_message ? (
                  <Text style={styles.descriptionText}>
                    {item?.measurement_message}
                  </Text>
                ) : null}
                <Text style={styles.descriptionText} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <ArrowButton onPress={() => openPopup(index)} rotateDeg={90} />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const closePopup = () => {
    toggleIsAnimated(false);
    executeWidgetAnimation(() => {
      setViewDetail(false);
      setPosition(null);
    });
  };

  const openPopup = (index) => {
    setViewDetail(true);
    setSelectedIndex(index);
    getViewPosition(containerRef[index]?.current).then((data) => {
      setPosition({...data});
      setTimeout(() => {
        executeWidgetAnimation();
        toggleIsAnimated(true);
      }, 10);
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          data={challenges}
          contentContainerStyle={{paddingBottom: hp(10)}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <PopUp
        visible={viewDetail}
        onRequestClose={closePopup}
        animationType={'none'}
        isAnimated={isAnimated}
        position={position}
        containerStyle={styles.popupContainer}>
        {viewDetail && renderModal()}
      </PopUp>
    </View>
  );
};

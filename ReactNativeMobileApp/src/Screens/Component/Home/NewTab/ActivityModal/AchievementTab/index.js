import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {
  hp,
  wp,
  normalize,
  color,
  fonts,
  isANDROID,
} from '../../../../../../Helper/themeHelper';
import {
  achievement_lock,
  bronze_coin,
  gold_coin,
  platinum_coin,
  silver_coin,
} from '../../../../../Assets';
import {arr, customBadges} from './data';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {FetchUserAchievements} from '../../../../../../Redux/Actions/ActivityAction';
import {AppButton, PopUp} from '../../../../../Common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import {getViewPosition} from '../../../../../../Helper/appHelper';

export const AchievementTab = (props) => {
  const [isGroup, setIsGroup] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [latestAchievements, setLatestAchievements] = useState(null);
  const [pointerText, setPointerText] = useState(0);
  const [defaultY, setDefaultY] = useState(0);
  const animatedScrollYValue = new Animated.Value(0);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const achievementsList = useSelector(
    (state) => state?.activities?.achievements ?? [],
  );
  const viewRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      getViewPosition(viewRef?.current).then((data) => {
        setDefaultY(data?.pageY);
      });
    }, 500);
    setInterval(() => {
      pointerValue.addListener((a) => {
        console.log(a.value);
      });
    }, 1000);
  }, []);

  // const shuffleBadges = _.shuffle(customBadges);
  const shuffleBadges = customBadges;

  useEffect(() => {
    dispatch(FetchUserAchievements());
  }, []);

  useEffect(() => {
    let list = _.sortBy(
      achievementsList,
      (x) => new Date(x.complete_time),
    ).reverse();

    if (list.length > 0 && list[0]?.is_complete === true) {
      setLatestAchievements(list[0]);
      list.shift();
      setAchievements([...list]);
    } else {
      setAchievements([...list]);
    }
  }, [achievementsList]);

  const [viewDetail, setViewDetail] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');

  const renderModal = () => {
    return (
      <View style={styles.containerModal}>
        <View style={{height: hp(5)}}>
          <AntDesign
            name={'closecircle'}
            size={wp(4)}
            color={color.white}
            style={{textAlign: 'right'}}
            onPress={() => {
              setViewDetail(false);
            }}
          />
        </View>
        <Image
          source={shuffleBadges[selectedIndex]}
          style={styles.imageStyle}
          resizeMode={'contain'}
        />
        <Text style={styles.textModalTitle}>
          {arr[selectedIndex] && arr[selectedIndex].title}
        </Text>

        <Text style={styles.textModalDescription}>
          Congratulation! you have earned the{' '}
          {arr[selectedIndex] && arr[selectedIndex].title} Badge.Share this
          achievement and receive 10 min FREE!
        </Text>
        <AppButton
          label={'share'}
          labelStyle={{textAlign: 'center', alignSelf: 'flex-start'}}
          btnStyle={styles.addButton}
        />
      </View>
    );
  };

  const renderBadge = ({item, index}) => {
    return (
      <TouchableOpacity
        disabled={!item?.is_complete}
        onPress={() => {
          setViewDetail(true);
          setSelectedIndex(index);
        }}
        style={{marginHorizontal: wp(5), marginVertical: hp(2), flex: 1}}>
        <Image
          source={!item?.is_complete ? achievement_lock : shuffleBadges[index]}
          style={styles.BadgeImage}
          resizeMode={'contain'}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={styles.BadgeTextStyle}>{item?.achievement_type}</Text>
          <Text style={styles.BadgeTitle}>
            {item?.achievement_details?.title}
          </Text>
          <Text style={styles.BadgeMileCounter}>
            {item?.total_achieved_by_user}/{item?.total_points_to_achieve}{' '}
            {item?.measurement}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: animatedScrollYValue}}}],
    {useNativeDriver: false},
    {
      listener: (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        console.log('offsetY--- ', scrollPosition);
        // do something special
      },
    },
  );

  const inputVal = (val) => (defaultY > 0 ? defaultY + val : val);
  const pointerTop = animatedScrollYValue.interpolate({
    inputRange: [
      inputVal(hp(-60)),
      inputVal(hp(-45)),
      inputVal(hp(-30)),
      inputVal(hp(-15)),
      inputVal(hp(0)),
      inputVal(hp(15)),
    ],
    outputRange: [
      insets.bottom > 0 ? 0 : hp(4),
      hp(15),
      hp(30),
      hp(45),
      hp(60),
      insets.bottom > 0 ? hp(68) : hp(80),
    ],
    extrapolate: 'clamp',
  });
  const AnimatedText = Animated.createAnimatedComponent(Text);

  const pointerValue = animatedScrollYValue.interpolate({
    inputRange: [
      inputVal(hp(-60)),
      inputVal(hp(-30)),
      inputVal(hp(-10)),
      inputVal(hp(15)),
    ],
    outputRange: [0, 100000, 200000, 300000],
    extrapolate: 'clamp',
  });

  const renderDefaultMadel = () => {
    return (
      <View style={styles.SwitchContainer}>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => setIsGroup(false)}>
            <View
              style={{
                width: wp(29),
                height: hp(3),
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isGroup ? color.white : color.sky,
                borderRadius: 5,
                marginHorizontal: wp(0.5),
              }}>
              <Text
                style={{
                  color: isGroup ? color.gray : color.white,
                  fontFamily: isGroup ? fonts.Lato_Regular : fonts.Lato_Bold,
                  fontSize: normalize(12),
                }}>
                Individual
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsGroup(true)}>
            <View
              style={{
                width: wp(29),
                height: hp(3),
                flex: 1,
                justifyContent: 'center',
                backgroundColor: isGroup ? color.sky : color.white,
                alignItems: 'center',
                borderRadius: 5,
                marginHorizontal: wp(0.5),
              }}>
              <Text
                style={{
                  color: isGroup ? color.white : color.gray,
                  fontFamily: isGroup ? fonts.Lato_Bold : fonts.Lato_Regular,
                  fontSize: normalize(12),
                }}>
                Group
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{marginTop: hp(5), flex: 1}}
          ref={viewRef}
          renderToHardwareTextureAndroid={true}>
          <Animated.View
            style={{
              position: 'absolute',
              marginTop: insets.bottom > 0 ? insets.bottom : 0,
              top: pointerTop,
              right: 0,
              height: hp(4),
              width: wp(25),
              backgroundColor: color.sky,
            }}>
            <Animated.Text>{pointerText}</Animated.Text>
          </Animated.View>
          <View style={{alignItems: 'center', flex: 1}}>
            <FastImage
              source={bronze_coin}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.CoinImage}
            />
            <View style={{marginTop: hp(2)}}>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontFamily: fonts.Lato_Bold,
                }}>
                0 Status Milaege
              </Text>
            </View>
            <View style={{marginTop: hp(0.5)}}>
              <Text style={styles.CoinHeaderText}>Bronze Medal</Text>
            </View>
          </View>
          <View style={{alignItems: 'center', flex: 1, marginTop: hp(4)}}>
            <Image source={silver_coin} style={styles.CoinImage} />
            <View style={{marginTop: hp(2)}}>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontFamily: fonts.Lato_Bold,
                }}>
                100 000 Status Milaege
              </Text>
            </View>
            <View style={{marginTop: hp(0.5)}}>
              <Text style={styles.CoinHeaderText}>Silver Medal</Text>
            </View>
          </View>
          <View style={{alignItems: 'center', flex: 1, marginTop: hp(4)}}>
            <Image source={gold_coin} style={styles.CoinImage} />
            <View style={{marginTop: hp(2)}}>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontFamily: fonts.Lato_Bold,
                }}>
                200 000 Status Milaege
              </Text>
            </View>
            <View style={{marginTop: hp(0.5)}}>
              <Text style={styles.CoinHeaderText}>Gold Medal</Text>
            </View>
          </View>
          <View style={{alignItems: 'center', flex: 1, marginTop: hp(4)}}>
            <Image source={platinum_coin} style={styles.CoinImage} />
            <View style={{marginTop: hp(2)}}>
              <Text
                style={{
                  fontSize: normalize(12),
                  fontFamily: fonts.Lato_Bold,
                }}>
                300 000 Status Milaege
              </Text>
            </View>
            <View style={{marginTop: hp(0.5)}}>
              <Text style={styles.CoinHeaderText}>Platinum Medal</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <Animated.ScrollView
      bounces={false}
      style={{flex: 1}}
      scrollEventThrottle={16}
      onScroll={onScroll}
      contentContainerStyle={{paddingBottom: hp(22) + insets.bottom}}>
      {latestAchievements && (
        <View style={{marginVertical: hp(4)}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: normalize(20),
                fontFamily: fonts.Lato_Bold,
                color: color.black_33,
              }}>
              Latest Achievement
            </Text>
          </View>
          <View style={{alignItems: 'center', flex: 1, marginTop: hp(2)}}>
            <Image
              source={
                !latestAchievements?.is_complete
                  ? achievement_lock
                  : shuffleBadges[0]
              }
              style={{height: hp(14), width: hp(12), flex: 1}}
              resizeMode={'contain'}
            />
            <View style={styles.displayText}>
              <Text style={styles.latestBadgeText}>
                {latestAchievements?.achievement_details?.title}
              </Text>
            </View>
          </View>
        </View>
      )}
      {achievements?.length > 0 && (
        <>
          <View style={styles.AchievementHeaderText}>
            <Text
              style={{
                fontSize: normalize(20),
                fontFamily: fonts.Lato_Bold,
                color: color.black_33,
              }}>
              All Achievements
            </Text>
          </View>
          <View style={{flex: 1}}>
            <FlatList
              data={achievements}
              renderItem={renderBadge}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              vertical={false}
            />
          </View>
        </>
      )}
      {renderDefaultMadel()}
      {viewDetail === true && (
        <PopUp
          visible={viewDetail}
          onRequestClose={() => setViewDetail(false)}
          containerStyle={{
            overflow: 'hidden',
            borderRadius: wp(5),
            height: hp(35),
            marginTop: hp(15),
          }}>
          {viewDetail && renderModal()}
        </PopUp>
      )}
    </Animated.ScrollView>
  );
};

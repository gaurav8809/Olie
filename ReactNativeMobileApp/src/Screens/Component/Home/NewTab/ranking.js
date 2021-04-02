import React, {useState, useRef, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import {ArrowButton, DefaultProfileImage, PopUp} from '../../../Common';
import {
  executeWidgetAnimation,
  getViewPosition,
} from '../../../../Helper/appHelper';
import {useDispatch, useSelector} from 'react-redux';

const Arr = [
  {
    id: 1,
    name: 'Adam',
    rank: '204999',
    position: '+1',
  },
  {
    id: 2,
    name: 'Adam',
    rank: '204999',
    position: '+1',
  },
  {
    id: 3,
    name: 'Adam',
    rank: '204999',
    position: '+1',
  },
];
export const Ranking = (props) => {
  const [isPopUp, togglePopUp] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isAnimated, toggleIsAnimated] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.userDetail);

  const renderList = ({item}) => {
    return (
      <View style={styles.ShopDetailView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...styles.rankingText,
              fontSize: normalize(12),
              flex: 1,
            }}>
            {item.id}
          </Text>
          <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image
                source={{uri: 'https://source.unsplash.com/user/erondu'}}
                style={{width: wp(10), height: wp(10), borderRadius: wp(5)}}
              />
            </View>
            <Text
              style={{
                ...styles.rankingText,
                fontSize: normalize(12),
                flex: 1,
                marginLeft: wp(2),
              }}>
              {item.name}
            </Text>
          </View>
          <Text
            style={{
              ...styles.rankingText,
              fontSize: normalize(12),
              flex: 1,
            }}>
            {item.rank}
          </Text>
        </View>
      </View>
    );
  };

  const renderModal = (item) => {
    return (
      <LinearGradient
        colors={[color.pink, color.pink]}
        style={styles.activityModalcontainer}>
        <View
          style={{
            paddingHorizontal: wp(5),
            paddingBottom: hp(3),
            borderBottomWidth: 0.8,
            borderColor: color.white,
          }}>
          <Text style={styles.whiteBoldText}>Rankings</Text>
          <Text
            style={{
              ...styles.rankingText,
              marginTop: hp(2),
            }}>
            Individual
          </Text>
          <View
            style={{
              marginTop: hp(2),
              flexDirection: 'row',
            }}>
            <View style={{marginHorizontal: wp(2)}}>
              <View style={styles.rankContainer}>
                <Text
                  style={{
                    ...styles.rankingText,
                    fontSize: normalize(10),
                  }}>
                  2
                </Text>
              </View>
              {user?.profile_image ? (
                <Image
                  source={{uri: user?.profile_image}}
                  style={{width: wp(14), height: wp(14), borderRadius: wp(7)}}
                />
              ) : (
                <DefaultProfileImage
                  name={user?.short_name}
                  style={{width: wp(14), height: wp(14), borderRadius: wp(7)}}
                />
              )}
            </View>
            <View>
              <Text
                style={{
                  ...styles.rankingText,
                  fontFamily: fonts.Lato_Regular,
                }}>
                Total Miles
              </Text>

              <Text style={styles.rankingText}>204 099</Text>
            </View>
          </View>
        </View>

        <FlatList
          style={{
            flex: 1,
          }}
          bounces={false}
          data={Arr}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
        />

        <View
          style={{
            marginVertical: hp(2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              togglePopUp(false);
              setPosition(null);
              toggleIsAnimated(false);
              setTimeout(() => {
                props?.navigation?.navigate('Rankings');
              }, 100);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: wp(35),
              height: hp(4),
              borderColor: color.white,
              borderWidth: 1,
              borderRadius: 5,
            }}>
            <Text
              style={{
                ...styles.rankingText,
                fontSize: normalize(12),
              }}>
              View Rankings
            </Text>
          </TouchableOpacity>
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
          colors={[color.pink, color.pink]}
          style={styles.container}>
          <View style={{marginTop: hp(2), paddingLeft: wp(4), flex: 1}}>
            <Text
              style={{
                ...styles.rankingText,
                fontSize: normalize(30),
              }}>
              Rankings
            </Text>
            <Text
              style={{
                ...styles.rankingText,
                marginTop: hp(0.7),
              }}>
              Individual
            </Text>
            <View style={{marginTop: hp(2), marginRight: wp(2)}}>
              <View style={styles.rankContainer}>
                <Text
                  style={{
                    ...styles.rankingText,
                    fontSize: normalize(10),
                  }}>
                  2
                </Text>
              </View>

              {user?.profile_image ? (
                <Image
                  source={{uri: user?.profile_image}}
                  style={{width: wp(14), height: wp(14), borderRadius: wp(7)}}
                />
              ) : (
                <DefaultProfileImage
                  name={user?.short_name}
                  style={{width: wp(14), height: wp(14), borderRadius: wp(7)}}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginBottom: hp(2),
              marginHorizontal: wp(3),
            }}>
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

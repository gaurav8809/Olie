import React, {useState, useRef, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import {AppBorderButton, AppButton, ArrowButton, PopUp} from '../../../Common';
import {
  executeWidgetAnimation,
  getViewPosition,
} from '../../../../Helper/appHelper';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {FetchNearestShops} from '../../../../Redux/Actions/RepairShopAction';
import {Image} from 'react-native-svg';
import {settings_disabled, silver_coin} from '../../../Assets';

export const RepairShops = (props) => {
  const [isPopUp, togglePopUp] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isAnimated, toggleIsAnimated] = useState(false);
  const dispatch = useDispatch();
  const [shopsList, setShopsList] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(async (position) => {
      await dispatch(
        FetchNearestShops({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          limit: 5,
        }),
      )
        .then((res) => {
          setShopsList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  const renderShop = (item) => {
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
              color: color.white,
              fontFamily: fonts.Lato_Regular,
              fontSize: normalize(12),
              flex: 2,
            }}
            numberOfLines={2}>
            {item.item.title}
          </Text>
          <Text
            style={{
              color: color.white,
              fontFamily: fonts.Lato_Regular,
              fontSize: normalize(12),
              flex: 1,
            }}>
            {item.item.location.distance.toFixed(2)} {'miles'}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                height: hp(4),
                width: wp(21.6),
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 20,
                flex: 1,
              }}>
              <Text
                style={{
                  color: color.white,
                  fontFamily: fonts.Lato_Regular,
                  fontSize: normalize(12),
                }}>
                Directions
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderModal = (item) => {
    return (
      <LinearGradient
        colors={['#23dad8', '#5fc4ff']}
        style={styles.activityModalcontainer}>
        <View
          style={{
            paddingHorizontal: wp(5),
            paddingBottom: hp(5),
            borderBottomWidth: 0.8,
            borderColor: color.white,
          }}>
          <Text style={styles.whiteBoldText}>Repair Shops</Text>
          <Text style={[styles.whiteText, {marginTop: hp(2)}]}>
            Have quick access to the nearest repair shop
          </Text>
        </View>

        <FlatList
          style={{
            flex: 1,
          }}
          bounces={false}
          data={shopsList}
          renderItem={renderShop}
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
                props?.navigation?.navigate('RepairShop');
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
                fontFamily: fonts.Lato_Bold,
                fontSize: normalize(12),
                color: color.white,
              }}>
              Repair Shops
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

  if (shopsList === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.container}
        ref={containerRef}
        renderToHardwareTextureAndroid={true}>
        <LinearGradient
          colors={['#23dad8', '#5fc4ff']}
          style={styles.container}>
          <View style={{marginTop: hp(2), paddingLeft: wp(4), flex: 1}}>
            <Text
              style={{
                fontSize: normalize(30),
                fontFamily: fonts.Lato_Bold,
                color: color.white,
              }}>
              Repair Shops
            </Text>
            <Text
              style={{
                marginTop: hp(0.7),
                fontSize: normalize(12),
                fontFamily: fonts.Lato_Regular,
                color: color.white,
              }}>
              Nearest Shop:
            </Text>
            <Text
              style={{
                marginTop: hp(1),
                fontSize: normalize(30),
                fontFamily: fonts.Lato_Bold,
                color: color.white,
              }}>
              {shopsList[0].location.distance.toFixed(2)} {' miles'}
            </Text>
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

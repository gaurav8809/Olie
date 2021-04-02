import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ImageBackground, Image, FlatList} from 'react-native';
import styles from './styles';
import {color, fonts, hp, normalize, wp} from '../../../../Helper/themeHelper';
import {map_background, map_icon, route_navigation} from '../../../Assets';
import {AppButton, ArrowButton, PopUp} from '../../../Common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FetchFavoriteRouteByUser} from '../../../../Redux/Actions/NavigationAction';
import {useDispatch, useSelector} from 'react-redux';
import {
  executeWidgetAnimation,
  getViewPosition,
} from '../../../../Helper/appHelper';

export const Navigation = (props) => {
  const [isPopUp, togglePopUp] = useState(false);
  const {navigation} = props;
  const dispatch = useDispatch();
  const [route, setRoute] = useState([]);
  const containerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isAnimated, toggleIsAnimated] = useState(false);

  let [favoriteRouteDataArray, setFavoriteRouteDataArray] = useState([]);
  const favouriteRoutesListData = useSelector(
    (state) => state?.navigation?.favouriteRoutesList ?? [],
  );

  useEffect(() => {
    fetchFavoriteRouteData();
  }, []);

  useEffect(() => {
    console.log(favoriteRouteDataArray);
    setFavoriteRouteDataArray(favouriteRoutesListData);
  }, [favouriteRoutesListData]);

  const fetchFavoriteRouteData = () => {
    dispatch(FetchFavoriteRouteByUser());
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.navigationRowContainer}>
        <Text style={[styles.blackText, {color: color.black}]}>
          {item.title}
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={route_navigation}
            style={{height: hp(6), width: wp(5)}}
            resizeMode={'contain'}
          />
          <View
            style={{
              justifyContent: 'space-between',
              marginLeft: wp(2),
              flex: 1,
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.blackText, {fontSize: normalize(12)}]}>
              {item.route_locations[0].location.title}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.blackText, {fontSize: normalize(12)}]}>
              {item.route_locations
                ? item.route_locations[item.route_locations.length - 1].location
                    .title
                : ''}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <AppButton
              isRounded={false}
              label={'Start'}
              btnStyle={styles.startBtn}
              onPress={() => {
                togglePopUp(false);
                let routeData = route;
                routeData = item?.route_locations;
                setRoute(routeData);
                console.log(route);
                navigation.navigate('StartingRideScreen', {
                  screen: 'NavigationTab',
                  selectedRoute: routeData,
                  is_Favorite: item?.is_favorite,
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderModal = () => {
    return (
      <ImageBackground
        source={map_background}
        // blurRadius={10}
        resizeMode={'cover'}
        style={styles.activityModalcontainer}>
        <View style={{paddingHorizontal: wp(5)}}>
          <Text style={[styles.whiteBoldText, {color: color.black_33}]}>
            Navigation
          </Text>
          <Text
            style={[
              styles.blackText,
              {fontSize: normalize(12), marginTop: hp(2), marginBottom: hp(3)},
            ]}>
            Check out routes, your trajectories, nearby rentals and your local
            challenges!
          </Text>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={favoriteRouteDataArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            /*ListFooterComponent={
              <View style={styles.navigationFooterContainer}>
                <AntDesign
                  name={'clockcircleo'}
                  color={color.sky}
                  size={wp(8)}
                  style={{marginHorizontal: wp(5)}}
                />
                <Text style={styles.blackText}>
                  {'Restaraunt Name\n'}
                  <Text
                    style={{color: color.gray, fontFamily: fonts.Lato_Regular}}>
                    {'9826 Main Street'}
                  </Text>
                </Text>
              </View>
            }*/
          />
        </View>
        <View
          style={[styles.navigationBottomContainer, {marginHorizontal: wp(3)}]}>
          <Image source={map_icon} style={styles.mapIcon} />
          <ArrowButton onPress={closePopup} rotateDeg={210} />
        </View>
      </ImageBackground>
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
    <View style={styles.container} ref={containerRef}>
      <ImageBackground source={map_background} style={{flex: 1}}>
        <View style={styles.navigationContainer}>
          <View style={{flex: 1}}>
            <Text style={[styles.blackText, {fontSize: normalize(30)}]}>
              Navigation
            </Text>
            <Text
              style={[
                styles.blackText,
                {fontFamily: fonts.Lato_Regular, marginTop: hp(1)},
              ]}>
              Check out routes, your trajectories, nearby rentals and your local
              challenges!
            </Text>
          </View>
          <View style={styles.navigationBottomContainer}>
            <Image source={map_icon} style={styles.mapIcon} />
            <ArrowButton rotateDeg={45} onPress={openPopup} />
          </View>
        </View>
      </ImageBackground>
      <PopUp
        visible={isPopUp}
        animationType={'none'}
        isAnimated={isAnimated}
        position={position}
        onRequestClose={closePopup}
        containerStyle={{borderRadius: wp(5)}}>
        {isPopUp && renderModal()}
      </PopUp>
    </View>
  );
};

import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import styles from './styles';
import {color, hp, normalize, wp} from '../../../../Helper/themeHelper';
import {ArrowButton, PopUp} from '../../../Common';
import {weatherConditions} from './data';
import DayCard from './dayWeatherCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentLocation} from '../../../../Redux/Actions/WeatherAction';
import {requestLocationAndroidPermission} from '../../../../Helper/permissionAndroid';
import {
  executeWidgetAnimation,
  getViewPosition,
} from '../../../../Helper/appHelper';

export const Weather = (props) => {
  const currentLocation = useSelector(
    (state) => state?.weatherLocation?.location ?? {},
  );
  const containerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isAnimated, toggleIsAnimated] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    temp: '',
    temp_max: '',
    temp_min: '',
    desc: '',
    icon: '',
    main: '',
    lat: 0,
    lon: 0,
    currentDt: new Date(),
  });
  const dispatch = useDispatch();

  const [isPopUp, togglePopUp] = useState(false);
  const [forcastData, setForcastData] = useState({
    fullData: {},
    dailyData: {},
    lat: 0,
    lon: 0,
  });
  const [dayRecords, setDayRecords] = useState({
    listData: null,
  });
  const [city, setCity] = useState('');

  useEffect(() => {
    setCity(currentLocation?.name ?? info?.name ?? '');
  }, [currentLocation, info]);

  useEffect(() => {
    if (city !== '') {
      getUserLocation();
    } else {
      getPermission();
    }
  }, [city]);

  const getPermission = () => {
    requestLocationAndroidPermission().then((res) => {
      if (res) {
        getUserLocation();
      }
    });
  };
  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        await fetchSunsetSunrise(position);
        const cordPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setInfo({
          ...info,
          ...cordPosition,
        });

        setForcastData({
          ...forcastData,
          ...cordPosition,
        });

        Geocoder.geocodePosition(cordPosition).then((res) => {
          setInfo({...info, name: res[0].locality});
          fetchWeather(res[0].locality);
        });
      },
      (error) => {
        if (error.PERMISSION_DENIED == 1) {
          dispatch(setCurrentLocation({}));
        }
      },
    );
  };

  const fetchSunsetSunrise = (position) => {
    fetch(
      `https://api.sunrise-sunset.org/json?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //Success
        setInfo((info) => ({
          ...info,
          sunrise: responseJson.results.sunrise,
          sunset: responseJson.results.sunset,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchWeather = (cityName) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=b80c543508c5756a5a9d6ee2f589218e&units=metric`,
    )
      .then((data) => data.json())
      .then((result) => {
        setInfo({
          name: cityName,
          temp: Math.round(result.main.temp),
          temp_min: Math.round(result.main.temp_min),
          temp_max: Math.round(result.main.temp_max),
          desc: result.weather[0].description,
          icon: result.weather[0].icon,
          main: result.weather[0].main.replace(' ', '_'),
          currentDt: result.dt,
        });
        dispatch(
          setCurrentLocation({
            name: cityName,
            temp: Math.round(result.main.temp),
            temp_min: Math.round(result.main.temp_min),
            temp_max: Math.round(result.main.temp_max),
            desc: result.weather[0].description,
            icon: result.weather[0].icon,
            main: result.weather[0].main.replace(' ', '_'),
            currentDt: result.dt,
            lat: result.coord.lat,
            lon: result.coord.lon,
          }),
        );
      })
      .catch((error) => {
        dispatch(setCurrentLocation({}));
      });
  };

  const fetchForcast = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=b80c543508c5756a5a9d6ee2f589218e&units=metric`,
    )
      .then((data) => data.json())
      .then((result) => {
        if (result?.list) {
          const dailyDetail = result.list.filter((reading) =>
            reading.dt_txt.includes('18:00:00'),
          );
          setForcastData({
            ...forcastData,
            fullData: result.list,
            dailyData: dailyDetail,
          });
          dispatch(
            setCurrentLocation({
              ...currentLocation,
              fullData: result.list,
              dailyData: dailyDetail,
            }),
          );
          return fetchDayWeather();
        }
      });
  };

  const fetchDayWeather = () => {
    if (forcastData.lat !== 0) {
      return fetch(
        'https://api.openweathermap.org/data/2.5/find?lat=' +
          forcastData.lat +
          '&lon=' +
          forcastData.lon +
          '&cnt=6&APPID=b80c543508c5756a5a9d6ee2f589218e',
      )
        .then((data) => data.json())
        .then((result) => {
          setDayRecords({listData: result.list});
          dispatch(
            setCurrentLocation({...currentLocation, listData: result.list}),
          );
          // togglePopUp(true);
        });
    }
    return true;
  };
  const detailCard = () => {
    return (
      <View
        style={{
          flex: 1,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: color.gray,
        }}>
        {forcastData.dailyData.length > 0 &&
          forcastData.dailyData.map((reading, index) => (
            <DayCard reading={reading} key={index} />
          ))}
      </View>
    );
  };
  const dayWeather = () => {
    return (
      dayRecords.listData &&
      dayRecords.listData.length > 0 &&
      dayRecords.listData.map((dayData, index) => {
        return (
          <View style={{flex: 1}} key={index}>
            <Text style={[styles.whiteText, {textAlign: 'center'}]}>
              {index === 0
                ? 'NOW'
                : dayData.dt &&
                  moment(dayData.dt)
                    .add(index - 1, 'hours')
                    .format('HH')}
            </Text>
            <MaterialCommunityIcons
              name={weatherConditions[dayData.weather[0].main].icon}
              size={hp(4)}
              color={'#f7ff51'}
              style={{alignItems: 'center', textAlign: 'center'}}
            />
          </View>
        );
      })
    );
  };

  const renderModal = () => {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={{
            uri:
              weatherConditions[info.main]?.uri ??
              'https://thumbs.gfycat.com/GiftedSimplisticKudu-size_restricted.gif',
          }}
          resizeMode={'cover'}
          style={styles.activityModalcontainer}>
          <View style={{flex: 1, paddingHorizontal: wp(3)}}>
            <Text style={styles.whiteBoldText}>{info?.name}</Text>
            <Text
              style={[
                styles.whiteText,
                {
                  fontSize: normalize(40),
                  marginTop: hp(2),
                  marginBottom: hp(3),
                },
              ]}>
              {info?.temp + '°'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: color.gray,
                borderBottomWidth: 1,
                paddingBottom: hp(1),
              }}>
              <Text style={styles.weatherText}>Today</Text>
              <Text style={styles.weatherText}>
                {info.temp_min + '° / ' + info.temp_max + '°'}
              </Text>
            </View>
            <View style={{flex: 1, marginVertical: hp(1)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginBottom: hp(2),
                }}>
                {dayWeather()}
              </View>
              <View style={{flex: 1}}>{detailCard()}</View>
            </View>
          </View>
          <View style={{paddingRight: wp(3)}}>
            <ArrowButton onPress={closePopup} rotateDeg={210} />
          </View>
        </ImageBackground>
      </View>
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

  if (info.name === '') {
    return <View />;
  }

  return (
    <View style={styles.scrollBox}>
      <View style={styles.container} ref={containerRef}>
        <ImageBackground
          source={{
            uri:
              weatherConditions[info.main]?.uri ??
              'https://thumbs.gfycat.com/GiftedSimplisticKudu-size_restricted.gif',
          }}
          resizeMode={'cover'}
          style={{flex: 1}}>
          <Text
            style={[
              styles.whiteBoldText,
              {marginVertical: hp(2), paddingLeft: wp(5)},
            ]}>
            Weather
          </Text>
          <View style={styles.weatherBottomContainer}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: wp(20), height: wp(20)}}
                  source={{
                    uri: `https://openweathermap.org/img/w/${info.icon}.png`,
                  }}
                />
                <Text style={styles.whiteText}>{info.temp + '°C'}</Text>
                <Text style={styles.whiteText}>
                  {info.temp_min + '°C / ' + info.temp_max + '°C'}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                  <Text style={styles.whiteBoldText}>{info.name}</Text>
                  <Text style={styles.whiteText}>{info.desc}</Text>
                </View>
                <ArrowButton
                  rotateDeg={45}
                  onPress={() => {
                    openPopup();
                    return fetchForcast();
                  }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <PopUp
          visible={isPopUp}
          animationType={'none'}
          onRequestClose={closePopup}
          containerStyle={{borderRadius: wp(5)}}
          isAnimated={isAnimated}
          position={position}>
          {renderModal()}
        </PopUp>
      </View>
    </View>
  );
};

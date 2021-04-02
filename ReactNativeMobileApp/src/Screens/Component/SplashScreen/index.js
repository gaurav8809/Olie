import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {olie_white_logo} from '../../Assets';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {
  setBottomTabMiddleButtonInfo,
  setBottomTabVisibility,
} from '../../../Redux/Actions/SystemAction';
import {FetchUserData} from '../../../Redux/Actions/AuthAction';
import {
  getDeviceToken,
  listenerForNotification,
  requestPermissionForNotification,
} from '../../../Helper/notificationHelper';

const SplashScreen = (props) => {
  const user = useSelector((state) => state.user.userDetail);
  const authToken = useSelector((state) => state.user.authToken);

  const rideRoute = useSelector((state) => state?.navigation?.rideRoute ?? []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBottomTabMiddleButtonInfo({
        label: 'Connect',
        visible: true,
      }),
    );
    dispatch(setBottomTabVisibility(true));
    if (user && authToken) {
      dispatch(FetchUserData());
      const isEnable = requestPermissionForNotification();
      if (isEnable) {
        listenerForNotification(props.navigation);
      }
    }
    setTimeout(() => {
      if (user && authToken) {
        if (rideRoute?.length > 0) {
          props.navigation.replace('StartingRideScreen');
        } else {
          props.navigation.replace('Home');
        }
      } else {
        props.navigation.replace('AuthSelection');
      }
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#28b7b6', '#2ec7c4', '#37d9d6']}
        style={styles.container}>
        <Image source={olie_white_logo} style={styles.logo} />
        <Text style={styles.textStyle}>Never ride alone</Text>
      </LinearGradient>
    </View>
  );
};
export default SplashScreen;

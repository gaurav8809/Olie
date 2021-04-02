import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  UIManager,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {olie_white_logo} from '../../Assets';
import {AppButton} from '../../Common';
import {SignUpSelection} from './signUpSelection';
import {LoginSelection} from './loginSelection';
import {EmailLogin} from './EmailLogin';
import {EmailSignUp} from './EmailSignUp';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions} from '@react-navigation/native';
import {
  color,
  fonts,
  hp,
  isIOS,
  normalize,
  wp,
} from '../../../Helper/themeHelper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  getDeviceToken,
  listenerForNotification,
  requestPermissionForNotification,
} from '../../../Helper/notificationHelper';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const AuthSelection = (props) => {
  const {navigation, route} = props;
  const type = route?.params?.type ?? '';
  const insets = useSafeAreaInsets();
  const goToAuthSelection = (type = '') => {
    navigation.push('AuthSelection', {type});
  };

  const requestForNotification = async () => {
    const isEnable = await requestPermissionForNotification();
    if (isEnable) {
      listenerForNotification(navigation);
      return getDeviceToken();
    }
  };

  const goToHome = () => {
    // navigation.setParams({type: ''});
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  const KeyboardHandlingView = (props) => {
    if (type === 'EmailLogin' || type === 'EmailSignUp') {
      return (
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={isIOS ? 0 : -hp(40)}
          style={{flex: 1}}>
          <ScrollView
            style={{flex: 1}}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            {props.children}
          </ScrollView>
        </KeyboardAvoidingView>
      );
    } else {
      return <View style={{flex: 1}}>{props.children}</View>;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#28b7b6', '#2ec7c4', '#37d9d6']}
        style={styles.container}>
        {type === '' || (
          <View
            style={{
              position: 'absolute',
              top: insets.top + hp(2),
              left: wp(6),
              alignSelf: 'flex-start',
              zIndex: 1000,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => navigation.goBack()}>
              <MaterialIcons
                name={'arrow-back-ios'}
                color={color.black_33}
                size={wp(7)}
              />
              <Text
                style={{
                  marginLeft: -wp(2),
                  fontSize: normalize(18),
                  fontWeight: 'bold',
                  color: color.black_33,
                  fontFamily: fonts.Lato_Bold,
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <KeyboardHandlingView>
          <View style={styles.upperContainer}>
            <Image source={olie_white_logo} style={styles.logo} />
            <Text style={styles.textStyle}>Never ride alone</Text>
          </View>
          {type === 'SignUpSelection' ? (
            <SignUpSelection
              navigation={navigation}
              goToAuthSelection={goToAuthSelection}
              goToHome={goToHome}
              requestForNotification={requestForNotification}
            />
          ) : type === 'LoginSelection' ? (
            <LoginSelection
              navigation={navigation}
              goToAuthSelection={goToAuthSelection}
              goToHome={goToHome}
              requestForNotification={requestForNotification}
            />
          ) : type === 'EmailLogin' ? (
            <EmailLogin
              navigation={navigation}
              goToHome={goToHome}
              requestForNotification={requestForNotification}
            />
          ) : type === 'EmailSignUp' ? (
            <EmailSignUp
              navigation={navigation}
              goToHome={goToHome}
              requestForNotification={requestForNotification}
            />
          ) : (
            <View style={styles.bottomContainer}>
              <AppButton
                label={'Create account'}
                onPress={() => {
                  goToAuthSelection('SignUpSelection');
                }}
              />
              <Text
                style={styles.blackText}
                onPress={() => goToAuthSelection('LoginSelection')}>
                Log in
              </Text>
            </View>
          )}
        </KeyboardHandlingView>
      </LinearGradient>
    </View>
  );
};
export default AuthSelection;

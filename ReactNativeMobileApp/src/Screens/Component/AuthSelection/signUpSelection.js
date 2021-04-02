import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {AppBorderButton, AppButton} from '../../Common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color, hp} from '../../../Helper/themeHelper';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {
  ExternalSignIn,
  RegisterExternalSignIn,
} from '../../../Redux/Actions/AuthAction';
import {useDispatch} from 'react-redux';
import {
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
} from '../../../Helper/constants';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {InstagramAuth} from './instagramAuth';
const {RNTwitterSignIn} = NativeModules;

const SignUpSelection = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {goToAuthSelection, requestForNotification} = props;
  // Replace Twitter Key Here & In Info.plist file
  const twitterBtnPressed = () => {
    RNTwitterSignIn.init(
      'xSnTUYw3cS7ryLoyOkTlWPgv2',
      'IouGgKCkO2reGx9BcYM0oAYuauBczlVPGdUBAMrf29S7fe0Khs',
    );

    RNTwitterSignIn.logIn()
      .then(async (loginData) => {
        if (__DEV__) {
          console.log('twitter data...', loginData);
        }
        const device_id = await requestForNotification();
        await dispatch(
          RegisterExternalSignIn({
            email: loginData.email,
            provider_id: loginData.userID,
            login_type: 'twitter',
            user_name: loginData.userName,
            first_name: loginData.userName,
            last_name: '',
            profile_image: '',
            device_id,
          }),
        ).then((res) => {
          if (res.alreadyLogged) {
            setIsLoading(false);
            return props.goToAuthSelection();
          }
          return props.goToHome();
        });
      })
      .catch((error) => {
        console.log('twitter error..', error);
        return props.goToAuthSelection();
      });
  };

  const loginWithFacebook = () => {
    setIsLoading(true);
    LoginManager.setLoginBehavior('web_only');
    LoginManager.logInWithPermissions(['email'])
      .then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            GetInformationFromToken(accessToken);
          });
        }
      })
      .catch((error) => {
        alert('Something Went Wrong!');
        setIsLoading(false);
      });
  };

  const GetInformationFromToken = (accessToken) => {
    const parameters = {
      fields: {
        string: 'id,email,picture.type(large),first_name,last_name',
      },
    };

    const myProfileRequest = new GraphRequest(
      '/me',
      {accessToken, parameters: parameters},
      async (error, myProfileInfoResult) => {
        if (error) {
          console.log('login info has error: ' + error);
          setIsLoading(false);
        } else {
          console.log(myProfileInfoResult);
          const device_id = await requestForNotification();
          dispatch(
            RegisterExternalSignIn({
              email: myProfileInfoResult.email,
              provider_id: myProfileInfoResult.id,
              login_type: 'fb',
              user_name:
                myProfileInfoResult.first_name +
                ' ' +
                myProfileInfoResult.last_name,
              first_name: myProfileInfoResult.first_name,
              last_name: myProfileInfoResult.last_name,
              profile_image: myProfileInfoResult.picture.data.url,
              device_id,
            }),
          ).then((res) => {
            if (res.alreadyLogged) {
              setIsLoading(false);
              return props.goToAuthSelection();
            }
            return props.goToHome();
          });
        }
      },
    );
    new GraphRequestManager().addRequest(myProfileRequest).start();
  };

  const signIn = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID, // client ID of type WEB for your server(needed to verify user ID and offline access)
        offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const device_id = await requestForNotification();
      await dispatch(
        RegisterExternalSignIn({
          email: userInfo.user.email,
          provider_id: userInfo.user.id,
          login_type: 'google',
          user_name: userInfo.user.givenName,
          first_name: userInfo.user.givenName,
          last_name: userInfo.user.familyName,
          profile_image: userInfo.user.photo,
          device_id,
        }),
      )
        .then((res) => {
          if (res.alreadyLogged) {
            setIsLoading(false);
            return props.goToAuthSelection();
          }
          setIsLoading(false);
          return props.goToHome();
        })
        .catch((e) => {
          setIsLoading(false);
          GoogleSignin.signOut();
          console.log('Something Went wrong!');
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setIsLoading(false);
        alert('Google signin is Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setIsLoading(false);
        alert('Sign In Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setIsLoading(false);
        alert(
          'Play Service is Outdated or Not Available. Please check and try again later',
        );
      } else {
        setIsLoading(false);
        console.log('Something Went Wrong!');
      }
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <ActivityIndicator
          animating={isLoading}
          size={'large'}
          color={color.black_33}
        />
      </View>
    );
  }

  return (
    <View style={styles.bottomContainer}>
      <Text style={styles.blackText}>Create a new account</Text>
      <AppButton
        label={'Create With Facebook'}
        btnStyle={styles.borderBtn}
        onPress={loginWithFacebook}
        rightComponent={
          <View style={styles.facebookIcon}>
            <MaterialCommunityIcons
              name={'facebook'}
              color={color.white}
              size={hp(3)}
            />
          </View>
        }
      />
      <AppBorderButton
        label={'Create Using Email'}
        btnStyle={styles.borderBtn}
        onPress={() => goToAuthSelection('EmailSignUp')}
      />
      <View style={styles.socialIconContainer}>
        <TouchableOpacity style={styles.socialIcon}>
          <MaterialCommunityIcons
            name={'instagram'}
            color={color.white}
            size={hp(3)}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon} onPress={signIn}>
          <MaterialCommunityIcons
            name={'google'}
            color={color.white}
            size={hp(3)}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon} onPress={twitterBtnPressed}>
          <MaterialCommunityIcons
            name={'twitter'}
            color={color.white}
            size={hp(3)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {SignUpSelection};

import React, {useState} from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppButton, CustomInputText, CheckBox} from '../../Common';
import {color, hp, isIOS, wp} from '../../../Helper/themeHelper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LogInUser, updateRememberData} from '../../../Redux/Actions/AuthAction';
import {checkEmail} from '../../../Helper/validation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const EmailLogin = (props) => {
  const rememberData = useSelector(
    (state) => state?.user?.rememberData ?? null,
  );
  const {requestForNotification} = props;

  const [email, setEmail] = useState(rememberData?.email ?? '');
  const [password, setPassword] = useState(rememberData?.password ?? '');
  const [rememberMe, setRememberMe] = useState(!!rememberData);
  const [showPassword, toggleShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const onLogin = async () => {
    if (!checkEmail(email)) {
      alert('Please enter correct e-mail');
    } else if (password === '') {
      alert('Please enter password');
    } else {
      setIsLoading(true);
      const device_id = await requestForNotification();
      dispatch(
        LogInUser({
          email,
          password,
          device_id,
        }),
      )
        .then((res) => {
          if (rememberMe) {
            dispatch(updateRememberData({email, password}));
          } else {
            dispatch(updateRememberData(null));
          }
          setIsLoading(false);
          return props.goToHome();
        })
        .catch((e) => {
          setIsLoading(false);
        });
    }
  };

  return (
    <View
      style={{marginTop: insets.bottom + hp(25), paddingHorizontal: wp(16)}}>
      <CustomInputText
        title={'E-MAIL'}
        value={email}
        onChangeText={(text) => setEmail(text)}
        viewStyle={styles.inputContainer}
      />
      <CustomInputText
        title={'PASSWORD'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        viewStyle={styles.inputContainer}
        secureTextEntry={!showPassword}
        containerStyle={[showPassword || {borderColor: color.gray}]}
        rightComponent={
          <TouchableOpacity onPress={() => toggleShowPassword(!showPassword)}>
            <FontAwesome5
              name={showPassword ? 'eye' : 'eye-slash'}
              color={showPassword ? color.white : color.gray}
              size={hp(2)}
            />
          </TouchableOpacity>
        }
      />
      <CheckBox
        title={'Remember Me'}
        isChecked={rememberMe}
        onPress={() => setRememberMe(!rememberMe)}
        viewStyle={styles.rememberMeView}
      />
      <AppButton
        isLoading={isLoading}
        label={'Log in'}
        btnStyle={styles.loginBtn}
        onPress={onLogin}
      />
    </View>
  );
};
export {EmailLogin};

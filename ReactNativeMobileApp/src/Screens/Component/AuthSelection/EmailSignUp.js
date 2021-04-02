import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import styles from './styles';
import {AppButton, CustomInputText} from '../../Common';
import {color, hp, isIOS, wp} from '../../../Helper/themeHelper';
import {SignUpUser} from '../../../Redux/Actions/AuthAction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {checkEmail} from '../../../Helper/validation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

const EmailSignUp = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [showPassword, toggleShowPassword] = useState(false);
  const [showCPassword, toggleShowCPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {requestForNotification} = props;
  const onSignUp = async () => {
    if (!checkEmail(email)) {
      alert('Please enter correct e-mail');
    } else if (username === '') {
      alert('Please enter your user name');
    } else if (password === '') {
      alert('Please enter create password');
    } else if (cPassword === '') {
      alert('Please enter confirm password');
    } else if (password !== cPassword) {
      alert('Passwords are not matched');
    } else {
      setIsLoading(true);
      const device_id = await requestForNotification();

      dispatch(
        SignUpUser({
          email,
          password: password,
          confirm_password: cPassword,
          user_name: username,
          device_id,
        }),
      )
        .then((res) => {
          setIsLoading(false);
          return props.goToHome();
        })
        .catch((e) => {
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={{marginTop: insets.top + hp(10), paddingHorizontal: wp(16)}}>
      <CustomInputText
        title={'E-MAIL'}
        value={email}
        onChangeText={(text) => setEmail(text)}
        viewStyle={styles.inputContainer}
      />
      <CustomInputText
        title={'USER NAME'}
        value={username}
        onChangeText={(text) => setUsername(text)}
        viewStyle={styles.inputContainer}
      />
      <CustomInputText
        title={'CREATE PASSWORD'}
        value={password}
        onChangeText={(text) => setPassword(text)}
        viewStyle={styles.inputContainer}
        secureTextEntry={!showPassword}
        // textContentType={''}
        blurOnSubmit={false}
        onSubmitEditing={() => Keyboard.dismiss()}
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
      <CustomInputText
        title={'CONFIRM PASSWORD'}
        value={cPassword}
        onChangeText={(text) => setCPassword(text)}
        viewStyle={styles.inputContainer}
        secureTextEntry={!showCPassword}
        blurOnSubmit={false}
        onSubmitEditing={() => Keyboard.dismiss()}
        containerStyle={[showCPassword || {borderColor: color.gray}]}
        rightComponent={
          <TouchableOpacity onPress={() => toggleShowCPassword(!showCPassword)}>
            <FontAwesome5
              name={showCPassword ? 'eye' : 'eye-slash'}
              color={showCPassword ? color.white : color.gray}
              size={hp(2)}
            />
          </TouchableOpacity>
        }
      />
      <AppButton
        isLoading={isLoading}
        label={'Create Account'}
        btnStyle={styles.loginBtn}
        onPress={onSignUp}
      />
    </View>
  );
};
export {EmailSignUp};

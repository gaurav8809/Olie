import React, {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import {AppButton, AppHeader} from '../../Common';
import {color} from '../../../Helper/themeHelper';
import {Notification} from './notification';
import {Permissions} from './permissions';
import {MeasurementSystem} from './measurementSystem';
import {MusicPreferences} from './musicPreferences';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SignOut} from '../../../Redux/Actions/AuthAction';
import {Get_Setting} from '../../../Redux/Actions/SettingsAction';

const Settings = (props) => {
  let user = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    dispatch(Get_Setting());
  }, []);

  const dispatch = useDispatch();
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <AppHeader
        isBack={true}
        navigation={navigation}
        HeaderText={'Settings'}
      />
      <ScrollView>
        <Notification />
        <Permissions />
        <MeasurementSystem />
        <MusicPreferences />
        <Text style={styles.headingStyle}>Account</Text>
        <View style={styles.accountContainer}>
          <Text style={styles.labelStyle}>
            {'Username: '}
            <Text style={{color: color.black_33}}>{user?.email ?? ''}</Text>
          </Text>
          <AppButton
            label={'Sign out'}
            btnStyle={styles.signoutBtn}
            onPress={() => {
              dispatch(SignOut()).then(() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'AuthSelection'}],
                  }),
                );
              });
            }}
          />
          <Text style={styles.underlineText}>Terms and Conditions</Text>
          <Text style={styles.underlineText}>Get Support</Text>
          <Text style={styles.underlineText}>About</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default Settings;

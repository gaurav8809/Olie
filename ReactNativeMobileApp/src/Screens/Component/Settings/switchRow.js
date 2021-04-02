import React from 'react';
import {View, Text, Switch} from 'react-native';
import styles from './styles';
import {color} from '../../../Helper/themeHelper';

export const SwitchRow = ({label, isEnabled = null, onChange = null}) => {
  const toggleSwitch = () => {
    onChange && onChange(!isEnabled);
  };

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.labelStyle}>{label}</Text>
      <Switch
        trackColor={{false: color.light_background, true: color.sky}}
        thumbColor={isEnabled ? color.white : color.black}
        ios_backgroundColor={color.white}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

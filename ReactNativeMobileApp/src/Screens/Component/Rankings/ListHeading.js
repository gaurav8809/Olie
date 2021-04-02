import styles from './styles';
import {Text, View} from 'react-native';
import React from 'react';

export const ListHeading = ({headings}) => {
  return (
    <View style={styles.headerContainer}>
      {headings.map((item, index) => (
        <View style={styles.headerView} key={index}>
          <Text style={styles.headerTextStyle}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

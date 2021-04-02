import styles from './styles';
import {Image, Text, View} from 'react-native';
import React from 'react';
import {color, normalize, wp} from '../../../Helper/themeHelper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ListRow = ({item}) => {
  return (
    <View style={styles.listContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.headerView,
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}>
          <Text style={styles.rankingBoldText}>{item.id}</Text>
          <View style={{marginLeft: wp(3), alignItems: 'center'}}>
            <Ionicons
              name={'caret-up-outline'}
              color={color.green}
              size={wp(5)}
              style={{marginLeft: wp(1)}}
            />
            <Text
              style={{
                ...styles.rankingText,
                fontSize: normalize(10),
                marginLeft: wp(2),
              }}>
              {item.position}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.headerView,
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}>
          <Image
            source={{uri: 'https://source.unsplash.com/user/erondu'}}
            style={{width: wp(8), height: wp(8), borderRadius: wp(4)}}
          />
          <Text
            style={{
              ...styles.rankingText,
              flex: 1,
              marginLeft: wp(1),
            }}
            numberOfLines={2}>
            {item.name}
          </Text>
        </View>
        <View style={styles.headerView}>
          <Text
            style={{
              ...styles.rankingText,
              color: color.sky,
            }}>
            {item.rank}
          </Text>
        </View>
      </View>
    </View>
  );
};

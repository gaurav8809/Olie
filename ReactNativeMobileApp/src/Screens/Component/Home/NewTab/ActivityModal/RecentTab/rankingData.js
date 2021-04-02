import {FlatList, Image, Text, View} from 'react-native';
import styles from './styles';
import {color, hp, wp} from '../../../../../../Helper/themeHelper';
import React from 'react';
import {arrFriends} from './data';
import {AppButton, DefaultProfileImage} from '../../../../../Common';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const RankingData = (props) => {
  const renderIndividualFriendsList = ({item}) => {
    return (
      <View style={styles.FriendsContainer}>
        <View>
          {item?.profile_url ? (
            <Image
              style={styles.FriendsImage}
              source={{
                uri: item?.profile_url,
              }}
            />
          ) : (
            <DefaultProfileImage
              name={item?.short_name}
              style={styles.FriendsImage}
            />
          )}
          <View style={styles.RankContainer}>
            <Text style={{color: color.white}}>{item.rank}</Text>
          </View>
          <View style={styles.RightDownContainer}>
            <Ionicons
              name={item.up ? 'caret-up-outline' : 'caret-down-outline'}
              color={item.up ? 'rgb(46,212,119)' : color.red}
              size={wp(5)}
            />
            <Text>-2</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.RecentMiddleContainer}>
        <Text
          style={[
            styles.RecentHeaderText,
            {paddingLeft: wp(4), marginVertical: hp(3)},
          ]}>
          Individual Ranking
        </Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={arrFriends}
          style={{paddingLeft: wp(4)}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderIndividualFriendsList}
        />
      </View>
      <View>
        <Text
          style={[
            styles.RecentHeaderText,
            {paddingLeft: wp(4), marginVertical: hp(3)},
          ]}>
          Group Ranking
        </Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={arrFriends}
          style={{paddingLeft: wp(4)}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderIndividualFriendsList}
        />
      </View>
      <AppButton
        label={'View Rankings'}
        btnStyle={styles.ViewRankingHeaderText}
        labelStyle={styles.RankingText}
        onPress={() => props?.navigation?.navigate('Rankings')}
      />
    </View>
  );
};

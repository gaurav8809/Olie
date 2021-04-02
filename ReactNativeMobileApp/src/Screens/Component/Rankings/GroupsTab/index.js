import React from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';
import {ListRow} from '../ListRow';
import {ListHeading} from '../ListHeading';
import {Arr} from './data';

export const GroupsTab = (props) => {
  const renderList = ({item}) => <ListRow item={item} />;
  return (
    <View style={styles.container}>
      <ListHeading headings={['World Ranking', 'Group', 'Mileage']} />
      <FlatList
        style={{
          flex: 1,
        }}
        bounces={false}
        data={Arr}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

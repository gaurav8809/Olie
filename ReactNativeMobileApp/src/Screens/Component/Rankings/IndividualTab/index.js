import React from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';
import {Arr} from './data';
import {ListHeading} from '../ListHeading';
import {ListRow} from '../ListRow';

export const IndividualTab = (props) => {
  const renderList = ({item}) => <ListRow item={item} />;
  return (
    <View style={styles.container}>
      <ListHeading headings={['World Ranking', 'Rider', 'Mileage']} />
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

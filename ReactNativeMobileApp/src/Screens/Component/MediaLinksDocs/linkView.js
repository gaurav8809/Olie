import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, SectionList} from 'react-native';
import styles from './styles';

import _ from 'lodash';
import moment from 'moment';
import {color, hp, wp} from '../../../Helper/themeHelper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNUrlPreview from 'react-native-url-preview';

const LinkView = ({navigation, route, linkFiles}) => {
  const [images, selectImages] = useState([]);

  const dataList = _.map(
    _.groupBy(linkFiles, (x) =>
      moment(new Date(x?.message?.created_time)).format('MMMM'),
    ),
    (val, key) => {
      let data = _.sortBy(val, (x) => new Date(x.createdAt));
      return {title: key, data: data};
    },
  );

  const renderItem = ({item, index}) => {
    const id = item.message_id;
    let url = item?.message?.message_text;
    if (!(url.includes('https://') || url.includes('https://'))) {
      url = 'https://' + url;
    }
    return (
      <TouchableOpacity
        style={[styles.mediaOuter]}
        onPress={() => {
          if (images.includes(id)) {
            _.remove(images, (x) => x === id);
          } else {
            images.push(id);
          }
          selectImages([...images]);
        }}>
        {images.includes(id) && (
          <View style={styles.selectedImage}>
            <AntDesign name={'check'} color={color.white} size={wp(5)} />
          </View>
        )}
        <RNUrlPreview
          text={url}
          onError={(e) => {
            console.log('RNUrlPreview', e);
          }}
          onLoad={(e) => {
            console.log('onLoad RNUrlPreview', e);
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section}) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={dataList}
        contentContainerStyle={{paddingBottom: hp(2)}}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparatorStyle} />
        )}
      />
      {images.length > 0 && (
        <Text style={[styles.sectionHeader, {textAlign: 'center'}]}>
          {images.length + ' Items Selected'}
        </Text>
      )}
    </View>
  );
};

export default LinkView;

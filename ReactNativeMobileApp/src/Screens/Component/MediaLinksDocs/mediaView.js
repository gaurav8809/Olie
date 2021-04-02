import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Video from 'react-native-video';
import _ from 'lodash';
import moment from 'moment';
import {color, hp, wp} from '../../../Helper/themeHelper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MediaView = ({navigation, route, mediaFiles}) => {
  const [images, selectImages] = useState([]);
  const dataList = _.map(
    _.groupBy(mediaFiles, (x) =>
      moment(new Date(x.created_time)).format('MMMM'),
    ),
    (val, key) => {
      let data = [...val];
      data.sort((a, b) => new Date(a.created_time) > new Date(b.created_time));
      return {title: key, data: data};
    },
  );

  const renderItem = ({item, index}) => {
    const id = item.message_file.message_file_id;
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
        {item.message_file.file_type === 'video' ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Video
              paused={true}
              source={{uri: item.message_file.message_file}}
              style={styles.mediaImage}
            />
            <View
              style={{
                position: 'absolute',
              }}>
              <FontAwesome
                name={'play-circle'}
                size={wp(8)}
                color={color.sky}
              />
            </View>
          </View>
        ) : (
          <Image
            source={{uri: item.message_file.message_file}}
            style={styles.mediaImage}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderList = (item, index) => {
    return (
      <View>
        <Text style={styles.sectionHeader}>{item.title}</Text>
        <FlatList
          data={item.data}
          renderItem={renderItem}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {dataList.map((item, index) => renderList(item, index))}
      </ScrollView>
      {images.length > 0 && (
        <Text style={[styles.sectionHeader, {textAlign: 'center'}]}>
          {images.length + ' Items Selected'}
        </Text>
      )}
    </View>
  );
};

export default MediaView;

import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native';
import styles from './styles';

import _ from 'lodash';
import moment from 'moment';
import {color, hp, wp} from '../../../Helper/themeHelper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DocumentView = ({navigation, route, docFiles}) => {
  const [images, selectImages] = useState([]);

  const dataList = _.map(
    _.groupBy(docFiles, (x) => moment(new Date(x.created_time)).format('MMMM')),
    (val, key) => {
      let data = [...val];
      data.sort((a, b) => new Date(a.created_time) > new Date(b.created_time));
      return {title: key, data: data};
    },
  );

  const renderItem = ({item, index}) => {
    const id = item.message_file.message_file_id;
    const data = item?.message_file?.message_file_metadata;
    return (
      <TouchableOpacity
        style={[styles.docOuter]}
        onPress={() => {
          Linking.openURL(`http://${data.url}`);
        }}>
        <AntDesign
          name={'file1'}
          size={hp(4.5)}
          color={color.black_33}
          style={{marginVertical: hp(1)}}
        />
        <View>
          <Text style={[styles.pdfName, {backgroundColor: color.transparent}]}>
            {data?.original_name}
          </Text>
          {data && (
            <Text style={[styles.pdfName, {color: color.gray}]}>
              {data?.page && data?.page > 0 && (
                <Text>
                  {data?.page}
                  {data?.page > 1 ? ' pages' : ' page'}
                  {'  •  '}
                </Text>
              )}
              {data?.pretty_size && (
                <Text>
                  {data?.pretty_size}
                  {'  •  '}
                </Text>
              )}
              {data?.extension && <Text>{data?.extension}</Text>}
            </Text>
          )}
        </View>
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

export default DocumentView;

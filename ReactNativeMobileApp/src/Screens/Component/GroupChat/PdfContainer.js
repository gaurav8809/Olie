import React from 'react';
import {color, hp, normalize, wp} from '../../../Helper/themeHelper';
import {View, Image, TouchableOpacity, Linking, Text} from 'react-native';
import {pdfView} from '../../Assets';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
export const PDfContainer = (props) => {
  const data = props?.currentMessage?.message_file_metadata ?? null;
  return (
    <TouchableOpacity
      style={styles.pdfRedirectBtn}
      onPress={() => {
        Linking.openURL(`http://${props.currentMessage.document}`);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <AntDesign
          name={'file1'}
          size={hp(4)}
          color={color.black_33}
          style={{marginVertical: hp(1)}}
        />
        <Text numberOfLines={2} style={styles.pdfName}>
          {data?.original_name}
        </Text>
      </View>
      {data && (
        <Text
          style={[
            styles.pdfName,
            {color: color.gray, fontSize: normalize(12)},
          ]}>
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
    </TouchableOpacity>
  );
};

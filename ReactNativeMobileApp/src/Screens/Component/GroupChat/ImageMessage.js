import React, {useState} from 'react';
import {View,Linking,TouchableOpacity,Image,Text} from 'react-native';
import styles from './styles';
import {pdfView} from '../../Assets';
import {fonts, hp, normalize, wp} from '../../../Helper/themeHelper';

export const ImageMessage = (props) => {
  const [viewImage, setViewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const source = {
    uri:
      'https://placeimg.com/960/540/any',
  };
  return (
    <View style={styles.pdfContainer}>
      <TouchableOpacity
        style={styles.pdfRedirectBtn}
        onPress={() => {
          Linking.openURL(`http://${props.currentMessage.image.imageUrl}`);

          setImageUrl(props.currentMessage.image.imageUrl);
        }}>
        <Image
          source={source}
          resizeMode={'contain'}
          style={{zIndex: 10, width: wp(30), height: hp(10)}}
        />
        <Text
          style={{
            marginVertical: hp(1),
            fontFamily: fonts.Lato_Regular,
            fontSize: normalize(15),
          }}>
          {props.currentMessage.image.imageName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

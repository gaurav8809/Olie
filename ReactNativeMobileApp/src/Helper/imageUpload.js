import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import {isANDROID} from './themeHelper';
import _ from 'lodash';

export const openImagePicker = (options = {}) => {
  return ImageCropPicker.openPicker({
    width: 400,
    height: 400,
    cropping: true,
    ...options,
  }).then((image) => {
    console.log('Image - ', image);
    if (options?.multiple === true) {
      const images = [];
      _.map(image, (x) => {
        const URL = isANDROID ? x.path : x.sourceURL;
        images.push({
          name: x.filename || 'olie_' + new Date().getTime() + '.jpg',
          type: x.mime,
          uri: URL,
        });
      });
      return images;
    } else {
      const URL = isANDROID ? image.path : image.sourceURL;
      return {
        name: image.filename || 'olie_' + new Date().getTime() + '.jpg',
        type: image.mime,
        uri: URL,
        // uri: URL.replace('file://', ''),
      };
    }
  });
};

export const openCameraPicker = (options = {}) => {
  return ImageCropPicker.openCamera({
    width: 400,
    height: 400,
    cropping: true,
    ...options,
  }).then((image) => {
    console.log('Image - ', image);
    if (options?.multiple === true) {
      const images = [];
      _.map(image, (x) => {
        const URL = isANDROID ? x.path : x.sourceURL;
        images.push({
          name: x.filename || 'olie_' + new Date().getTime() + '.jpg',
          type: x.mime,
          uri: URL,
        });
      });
      return images;
    } else {
      const URL = isANDROID ? image.path : image.sourceURL;
      return {
        name: image.filename || 'olie_' + new Date().getTime() + '.jpg',
        type: image.mime,
        uri: URL,
        // uri: URL.replace('file://', ''),
      };
    }
  });
};

export const openCamaraAndGalleryPicker = (options = {}) => {
  return new Promise((resolve) =>
    ImagePicker.showImagePicker(options, (image) => {
      console.log('image = ', image);
      if (image.didCancel) {
        console.log('User cancelled image picker');
      } else if (image.error) {
        console.log('ImagePicker Error: ', image.error);
      } else {
        return resolve({
          name: image.fileName || 'olie_' + new Date().getTime() + '.jpg',
          type: image.type,
          uri: isANDROID ? image.uri : image.uri.replace('file://', '/private'),
        });
      }
      return null;
    }),
  );
};

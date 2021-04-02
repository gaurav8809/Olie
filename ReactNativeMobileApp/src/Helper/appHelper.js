import {
  AsyncStorage,
  findNodeHandle,
  LayoutAnimation,
  NativeModules,
} from 'react-native';
import {hp, isANDROID, wp} from './themeHelper';
import {useSelector} from 'react-redux';
const RCTUIManager = NativeModules.UIManager;

export const GOOGLE_API_KEY = 'AIzaSyA0LzUOpbs57NVcloKRMKdoBkzWRZ_ivYs';
export const GOOGLE_API_SPARE_KEY = 'AIzaSyAD1tl1gQ9CExwdQ1iEQQOCzQhrNgpwU3k';
export const ASPECT_RATIO = wp(1) / hp(1);
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const INITIAL_REGION = {
  latitude: 37.79,
  longitude: -122.406417,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export function setAsyncStorage(key, value) {
  AsyncStorage.setItem(key, value);
}

export const ValueExist = (array, key, value) => {
  let data = array.filter((i) => i[key] === value);
  return data?.length > 0;
};

export const convertMetersToMiles = (i) => {
  return i * 0.000621371192;
};

export const convertMilesToMeters = (i) => {
  return i * 1609.344;
};

export const convertKMtoMiles = (i) => {
  return i * 0.62137;
};

export const convertKMtoM = (i) => {
  var value = i * 1000;
  value = value.toFixed(2);
  return value;
};

export const getAuthToken = (state) => state?.user?.authToken;

// eslint-disable-next-line react-hooks/rules-of-hooks

export const RANDOM_INDEX = () => {
  return new Date().getTime().toString(36);
};
export const removeDuplicates = (arrayName, key) => {
  var obj = {};
  for (let i = 0, len = arrayName.length; i < len; i++) {
    obj[arrayName[i][key]] = arrayName[i];
  }

  const tempNewArray = new Array();
  for (let key in obj) {
    tempNewArray.push(obj[key]);
  }
  return tempNewArray;
};

export const measurementConversion = (value, isMetric) => {
  let _value;

  if (isMetric) {
    _value = value;
  } else {
    _value = value * 1.609;
  }
  return _value.toFixed(2);
};
export const convertMphToKph = (value, isMetric) => {
  let _value;

  if (isMetric) {
    _value = value;
  } else {
    _value = value * 1.609;
  }
  return _value.toFixed(2);
};

export const CHECK_FAV_JSON_EXIST = (array, obj) => {
  const makeObj = (infoObj) => {
    let placesIDArray =
      infoObj &&
      infoObj.routeDetails &&
      infoObj.routeDetails.rideRoute &&
      infoObj.routeDetails.rideRoute.map((it) => {
        return it.place_id;
      });
    return {
      latitude: infoObj?.routeDetails?.originInfo?.position?.lat ?? 0,
      longitude: infoObj?.routeDetails?.originInfo?.position?.lng ?? 0,
      places: placesIDArray,
    };
  };
  let existIndex = 0;
  console.log(array);

  array.filter((i, index) => {
    existIndex =
      JSON.stringify(makeObj(obj)) === JSON.stringify(makeObj(i)) ? index : -1;
  });
  return existIndex;
};

export const executeWidgetAnimation = (cb = () => {}) => {
  if (isANDROID) {
    cb();
  } else {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, cb);
    const CustomLayoutLinear = {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      delete: {
        type: LayoutAnimation.Types.opacity,
        property: LayoutAnimation.Properties.scaleXY,
      },
    };
    LayoutAnimation.configureNext(CustomLayoutLinear, cb);
  }
};

export const getViewPosition = (ref) => {
  return new Promise((resolve) => {
    if (ref === null) {
      return resolve(null);
    }
    RCTUIManager.measure(
      findNodeHandle(ref),
      (x, y, width, height, pageX, pageY) => {
        console.log(
          'getViewPosition- x, y, width, height, pageX, pageY-- ',
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        );
        return resolve({x, y, width, height, pageX, pageY});
      },
    );
  });
};

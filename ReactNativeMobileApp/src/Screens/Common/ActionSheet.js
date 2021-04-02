import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  color,
  fonts,
  hp,
  isANDROID,
  normalize,
  wp,
} from '../../Helper/themeHelper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ActionSheet = (props) => {
  const {
    visible = false,
    onRequestClose = null,
    setActionSheet,
    data = [],
    containerStyle = null,
    rowStyle = null,
  } = props;
  const insets = useSafeAreaInsets();

  const [backgroundState, toggleBackgroundState] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(data?.reverse());
  }, [data]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        toggleBackgroundState(true);
      }, 300);
    } else {
      toggleBackgroundState(false);
    }
  }, [visible]);

  const renderOptions = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.optionView,
          index === data.length - 1 && {
            borderTopLeftRadius: wp(2.5),
            borderTopRightRadius: wp(2.5),
          },
          index === 0 && {
            borderBottomLeftRadius: wp(2.5),
            borderBottomRightRadius: wp(2.5),
          },
          rowStyle,
        ]}
        onPress={item.onPress}
        key={index}>
        {item?.leftComponent}
        <Text style={[styles.optionText, item.labelStyle && item.labelStyle]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const onPressEvents = (onPress = () => {}) => {
    toggleBackgroundState(false);
    setTimeout(() => onPress(), 50);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.mainContainer,
          {
            backgroundColor:
              backgroundState === true
                ? 'rgba(255,255,255,0.7)'
                : color.transparent,
          },
          containerStyle,
        ]}
        onPress={() => onPressEvents(() => setActionSheet())}>
        <View style={{flex: 1, marginBottom: insets.bottom + hp(1)}}>
          <View
            style={{flex: 1, marginBottom: hp(1), justifyContent: 'flex-end'}}>
            <FlatList
              scrollEnabled={false}
              data={dataList}
              ItemSeparatorComponent={() => (
                <View style={{height: 0.5, backgroundColor: color.gray}} />
              )}
              renderItem={renderOptions}
              keyExtractor={(item, index) => index.toString()}
              inverted={-1}
            />
          </View>

          <View style={styles.cancelOptionView}>
            <Text style={[styles.optionText, {color: color.white}]}>
              {'Cancel'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: hp(5),
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: isANDROID ? hp(7) : hp(6),
    width: wp(88),
    backgroundColor: color.darkgray,
    paddingHorizontal: wp(5),
  },
  optionText: {
    color: color.sky,
    fontFamily: fonts.Lato_Regular,
    fontSize: normalize(14),
  },
  cancelOptionView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: isANDROID ? hp(7) : hp(6),
    width: wp(88),
    borderRadius: wp(2.5),
    backgroundColor: color.darkgray,
  },
});

export {ActionSheet};

import React, {useRef, useState} from 'react';
import styles from './styles';
import {
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../../../../Helper/themeHelper';
import {ArrowButton, PopUp} from '../../../Common';
import {useSelector} from 'react-redux';
import {
  executeWidgetAnimation,
  getViewPosition,
} from '../../../../Helper/appHelper';

export const PopularTab = (props) => {
  const challenges = useSelector((state) => state.challenges.popularChallenges);
  const [viewDetail, setViewDetail] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [position, setPosition] = useState(null);
  const [isAnimated, toggleIsAnimated] = useState(false);
  let containerRef = [];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  challenges.map(() => containerRef.push(useRef(null)));

  const renderModal = () => {
    let colors = challenges[selectedIndex].theme_color;
    if (challenges[selectedIndex].theme_color.length === 1) {
      colors.push(colors[0]);
    }
    const item = challenges[selectedIndex];
    return (
      <LinearGradient colors={colors} style={styles.linearGradientModalBg}>
        <View style={styles.modalTextHeaderView}>
          <Text style={styles.titleTextStyle}>
            {challenges[selectedIndex] && challenges[selectedIndex].title}
          </Text>
          <Image
            source={
              challenges[selectedIndex]
                ? {
                    uri: challenges[selectedIndex].challenge_image,
                  }
                : {uri: ''}
            }
            style={styles.modalImageBg}
          />
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Text style={styles.challengeTypeText}>
                {challenges[selectedIndex] &&
                  challenges[selectedIndex].sub_title}
              </Text>
              <ScrollView>
                <Text style={styles.descriptionText}>
                  {new Date(item?.start_time).toDateString()}
                  {item?.end_time && (
                    <Text> - {new Date(item?.end_time).toDateString()}</Text>
                  )}
                </Text>
                {(item?.measurement_message && (
                  <Text style={styles.descriptionText}>
                    {item?.measurement_message}
                  </Text>
                )) ||
                  null}
                <Text style={styles.descriptionText}>
                  {challenges[selectedIndex] &&
                    challenges[selectedIndex].description}
                </Text>
              </ScrollView>
            </View>
            <ArrowButton onPress={closePopup} rotateDeg={270} />
          </View>
        </View>
      </LinearGradient>
    );
  };

  const renderItem = ({item, index}) => {
    let colors = item.theme_color;
    if (item.theme_color.length === 1) {
      colors.push(colors[0]);
    }
    return (
      <View style={styles.challengeItemBg} ref={containerRef[index]}>
        <LinearGradient colors={colors} style={styles.linearGradientBg}>
          <View style={styles.btnBg}>
            <Text style={styles.titleTextStyle}>{item.title.trim()}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: hp(2),
              }}>
              <Image
                source={{uri: item.challenge_image}}
                style={styles.imageStyle}
              />
              <View style={{flex: 1, marginLeft: wp(5)}}>
                <Text style={styles.challengeTypeText}>{item.sub_title}</Text>
                <Text style={styles.descriptionText}>
                  {new Date(item?.start_time).toDateString()}
                  {item?.end_time && (
                    <Text> - {new Date(item?.end_time).toDateString()}</Text>
                  )}
                </Text>
                {(item?.measurement_message && (
                  <Text style={styles.descriptionText}>
                    {item?.measurement_message}
                  </Text>
                )) ||
                  null}
                <Text style={styles.descriptionText} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </View>
            <ArrowButton onPress={() => openPopup(index)} rotateDeg={90} />
          </View>
        </LinearGradient>
      </View>
    );
  };

  const closePopup = () => {
    toggleIsAnimated(false);
    executeWidgetAnimation(() => {
      setViewDetail(false);
      setPosition(null);
    });
  };

  const openPopup = (index) => {
    setViewDetail(true);
    setSelectedIndex(index);
    getViewPosition(containerRef[index]?.current).then((data) => {
      setPosition({...data});
      setTimeout(() => {
        executeWidgetAnimation();
        toggleIsAnimated(true);
      }, 10);
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.newTabBotttom}>
        <FlatList
          data={challenges}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: hp(10)}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {viewDetail === true && (
        <PopUp
          visible={viewDetail}
          onRequestClose={closePopup}
          animationType={'none'}
          isAnimated={isAnimated}
          position={position}
          containerStyle={styles.popUpContainer}>
          {viewDetail && renderModal()}
        </PopUp>
      )}
    </View>
  );
};

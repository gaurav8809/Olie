import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, Text, SectionList} from 'react-native';
import styles from './styles';

import {color, hp, wp} from '../../../Helper/themeHelper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MediaView from './mediaView';
import LinkView from './linkView';
import DocumentView from './documentView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {FetchGroupMedia} from '../../../Redux/Actions/GroupsAction';

const HeaderTab = ['Media', 'Links', 'Docs'];

const MediaLinksDocs = ({navigation, route}) => {
  const group_id = route?.params?.group_id ?? 0;
  const insets = useSafeAreaInsets();
  const [selectedTab, changeSelectedTab] = useState(0);
  const dispatch = useDispatch();
  const [media, setMedia] = useState([]);
  const [links, setLinks] = useState([]);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    dispatch(FetchGroupMedia(group_id))
      .then((res) => {
        setLinks(res.links);
        setDocs(res.docs);
        setMedia(res.media);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const renderHeaderTab = (item, index) => {
    return (
      <TouchableOpacity
        style={[
          styles.headerInner,
          index === 1 && {
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: color.sky,
          },
          index === selectedTab && {
            backgroundColor: color.sky,
          },
        ]}
        onPress={() => changeSelectedTab(index)}>
        <Text
          style={[
            styles.headerText,
            index === selectedTab && {
              color: color.white,
            },
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top > 0 ? insets.top : hp(1),
        paddingBottom: insets.bottom > 0 ? insets.bottom : hp(1),
      }}>
      <View style={styles.topView}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name={'arrow-back-ios'}
            color={color.sky}
            size={hp(3)}
          />
        </TouchableOpacity>
        <View style={styles.headerOuter}>
          {HeaderTab.map((item, index) => renderHeaderTab(item, index))}
        </View>
      </View>
      <View style={styles.container}>
        {(selectedTab === 0 && <MediaView mediaFiles={media} />) ||
          (selectedTab === 1 && <LinkView linkFiles={links} />) ||
          (selectedTab === 2 && <DocumentView docFiles={docs} />) || <View />}
      </View>
    </View>
  );
};

export default MediaLinksDocs;

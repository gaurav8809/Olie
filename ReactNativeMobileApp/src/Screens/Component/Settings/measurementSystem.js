import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import {CheckBox} from '../../Common';
import {color} from '../../../Helper/themeHelper';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMetricStatus,
  Update_Setting,
} from '../../../Redux/Actions/SettingsAction';
import {IS_METRICS} from '../../../Redux/Types';
const measurements = ['Imperial', 'Metrics'];

export const MeasurementSystem = () => {
  const dispatch = useDispatch();
  const settingData = useSelector((state) => state.setting.settingDetails);
  let authToken = useSelector((state) => state.user.authToken);
  const [userSettings, setUserSetting] = useState({setting_json: settingData});

  const [imperial, setImperial] = useState({
    title:
      settingData &&
      settingData.measurement_systems &&
      settingData.measurement_systems.imperial.title,
    is_enabled:
      settingData &&
      settingData.measurement_systems &&
      settingData.measurement_systems.imperial.is_enabled,
  });

  const [metrics, setMetrics] = useState({
    title:
      settingData &&
      settingData.measurement_systems &&
      settingData.measurement_systems.metrics.title,
    is_enabled:
      settingData &&
      settingData.measurement_systems &&
      settingData.measurement_systems.metrics.is_enabled,
  });
  const [measurementSystem, setMeasurementSystem] = useState(
    settingData && settingData.measurement_systems,
  );
  const [measure, setMeasure] = useState(
    imperial.is_enabled ? 0 : metrics.is_enabled ? 1 : 0,
  );

  const createdUpdatedObject = async (item) => {
    if (item === 'Imperial') {
      dispatch(setMetricStatus(true));
      setMeasure(0);
      let _imperial = imperial;
      _imperial.is_enabled = true;
      let _metrics = metrics;
      _metrics.is_enabled = false;
      setImperial(_imperial);
      setMetrics(_metrics), console.log(imperial);
      let _measurementSystem = measurementSystem;

      _measurementSystem.imperial = imperial;
      _measurementSystem.metrics = metrics;
      setMeasurementSystem(_measurementSystem);
      let userSet = userSettings;
      userSet.setting_json.measurement_systems = measurementSystem;

      setUserSetting(userSet);
    } else if (item === 'Metrics') {
      dispatch(setMetricStatus(false));
      setMeasure(1);
      let _metrics = metrics;
      _metrics.is_enabled = true;
      let _imper = imperial;
      _imper.is_enabled = false;
      setImperial(_imper);

      setMetrics({title: metrics.title, is_enabled: true});

      let _measurementSystem = measurementSystem;
      _measurementSystem.imperial = imperial;
      _measurementSystem.metrics = metrics;
      setMeasurementSystem(_measurementSystem);
      let userSet = userSettings;
      userSet.setting_json.measurement_systems = measurementSystem;
      setUserSetting(userSet);
    }

    return userSettings;
  };

  const renderItem = ({item, index}) => {
    const isChecked = index === measure;
    return (
      <View style={{flex: 1}}>
        <CheckBox
          title={item}
          isChecked={isChecked}
          // onPress={() => setMeasure(index)}
          onPress={() =>
            createdUpdatedObject(item).then((res) => {
              if (res) {
                dispatch(Update_Setting(res));
              }
            })
          }
          titleStyle={styles.labelStyle}
          viewStyle={{flex: 1}}
          rounded={true}
          checkboxStyle={[
            isChecked && {borderWidth: 0, backgroundColor: color.sky},
          ]}
        />
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.headingStyle}>Measurement System</Text>
      <View style={styles.innerContainer}>
        <FlatList
          data={measurements}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
    </View>
  );
};

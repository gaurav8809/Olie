import React, {Component} from 'react';
import {View} from 'react-native';
import {Stopwatch} from 'react-native-stopwatch-timer';
import {color, fonts, normalize} from '../../../../Helper/themeHelper';

export class StopWatch extends Component {
  render() {
    const {
      stopWatchTimeStart,
      stopWatchTimeReset,
      setStopWatchTime,
      disabled = false,
    } = this.props;

    const options = {
      text: {
        fontFamily: fonts.Lato_Regular,
        color: disabled ? color.gray : color.black_33,
        fontSize: normalize(60),
      },
    };

    return (
      <View>
        <Stopwatch
          laps
          start={stopWatchTimeStart}
          reset={stopWatchTimeReset}
          options={options}
          getTime={setStopWatchTime}
        />
      </View>
    );
  }
}

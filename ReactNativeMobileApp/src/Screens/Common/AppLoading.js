import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {color} from '../../Helper/themeHelper';

const AppLoading = ({
  containerStyle = null,
  size = 'large',
  indicatorColor = color.sky,
  isLoading = false,
}) => {
  if (!isLoading) {
    return null;
  }
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator
        animating={isLoading}
        size={size}
        color={indicatorColor}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {AppLoading};

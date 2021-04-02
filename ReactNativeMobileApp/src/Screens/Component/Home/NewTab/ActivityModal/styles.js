import {StyleSheet} from 'react-native';
import {
  color,
  fonts,
  hp,
  normalize,
  wp,
} from '../../../../../Helper/themeHelper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.light_background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: hp(2),
    backgroundColor: color.lightgray,
    borderRadius: wp(1),
  },
});

export default styles;

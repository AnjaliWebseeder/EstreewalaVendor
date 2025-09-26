import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { windowHeight } from '../../theme/appConstant';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';

const CustomButton = ({ title, onPress, type = 'primary', buttonContainerStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : null} // disable press if true
      style={[
        styles.button,
        type === 'secondary' && styles.secondary,
        disabled && styles.disabledButton, // extra style when disabled
        {...buttonContainerStyle},
      ]}
      activeOpacity={disabled ? 1 : 0.7} // no click effect if disabled
    >
      <Text
        style={[
          styles.text,
          type === 'secondary' && styles.secondaryText,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: windowHeight(20),
  },
  secondary: {
    backgroundColor: '#F4F4F4',
  },
  text: {
    color: appColors.white,
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiBold,
    fontWeight: '600',
  },
  secondaryText: { color: appColors.secondary },
  disabledButton: {
    backgroundColor:appColors.inActive, // greyed out
  },
  disabledText: {
    color: appColors.disableText,
  },
});

export default CustomButton;

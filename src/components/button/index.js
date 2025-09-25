import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { windowHeight } from '../../theme/appConstant';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';

const CustomButton = ({ title, onPress, type = 'primary',buttonContainerStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, type === 'secondary' && styles.secondary,buttonContainerStyle]}
    >
      <Text style={[styles.text, type === 'secondary' && styles.secondaryText]}>
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
    marginHorizontal:windowHeight(20)
  },
  secondary: {
    backgroundColor: '#F4F4F4',
  },
  text: { color: appColors.white, fontSize: 16,fontFamily:fonts.PoppinsSemiBold,fontWeight:"600" },
  secondaryText: { color: appColors.secondary },
});

export default CustomButton;

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fontSizes, windowHeight } from '../../theme/appConstant';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';
import { BackIcon } from '../../assets/Icons/backIcon';

export default function Header({ title, onBack }) {
  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
      ) : (
        <View style={styles.left} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.right} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: windowHeight(20),
    backgroundColor: appColors.secondary,
  },
  backButton: {
    backgroundColor: appColors.white,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: windowHeight(25),
    width: windowHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.FONT21HALF,
    fontWeight: '700',
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
  },
  left: {
    width: 30, // placeholder space if no back button
  },
  right: {
    width: 30, // placeholder space for actions like filter
  },
});

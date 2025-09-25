import { View, Text, StyleSheet } from 'react-native';
import appColors from '../../../theme/appColors'
import {fontSizes} from '../../../theme/appConstant'
import fonts from '../../../theme/appFonts'

export default function TitleSubtitle({ title, subtitle, style }) {
  return (
    <View style={[styles.container, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
 title:{
color:appColors.title,
    fontFamily:fonts.InterRegular,
    marginTop:2,
    fontWeight:"600",fontSize:17
  },
  subtitle:{
 color:appColors.subTitle,
    fontFamily:fonts.InterRegular,
    fontSize:fontSizes.FONT15
  }
  
});

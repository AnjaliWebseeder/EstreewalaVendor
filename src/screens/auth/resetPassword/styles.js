import { StyleSheet } from 'react-native';
import appColors from '../../../theme/appColors'
import fonts from '../../../theme/appFonts';
import { fontSizes, windowHeight } from '../../../theme/appConstant';


export const styles = StyleSheet.create({
     container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
   mainContainerStyle: {
    marginHorizontal: 20,
    marginBottom:windowHeight(20)
  },
  footerText: {  marginTop: 0, fontSize: fontSizes.FONT13,fontFamily:fonts.InterRegular,color:appColors.subTitle,lineHeight:windowHeight(12) },
  link: { color: appColors.secondary, fontFamily:fonts.InterRegular,fontWeight:"700"},
})
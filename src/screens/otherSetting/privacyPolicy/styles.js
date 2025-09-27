import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { fontSizes } from '../../../theme/appConstant';
import { windowHeight } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  content: {
    paddingTop:windowHeight(20),
    paddingBottom: windowHeight(60),
  },
  mainStyle:{
    paddingHorizontal:24
  },
  section: {
    marginBottom:0,
    marginTop:windowHeight(2),
    paddingHorizontal:24
  },
  sectionTitle: {
    fontSize: fontSizes.FONT21,
   fontFamily:fonts.InterMedium,
    color: appColors.font,
    marginBottom: windowHeight(2),
   
  },
  sectionText: {
    fontSize: fontSizes.FONT15,
    lineHeight: 24,
    color:appColors.subTitle,
    fontFamily:fonts.InterRegular,
  },
  policySection: {
    marginTop: windowHeight(0),
  },
  policyItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: appColors.secondary,
    paddingHorizontal:24
  },
  policyIcon: {
    marginRight: 16,
    marginTop: 4,
  },
  policyTextContainer: {
    flex: 1,
  },
  policyTitle: {
    fontSize: windowHeight(13),
    color: appColors.font,
    marginBottom: windowHeight(1),
   fontFamily:fonts.InterRegular,
  },
  policyText: {
    fontSize: fontSizes.FONT15,
    lineHeight: 22,
    color: appColors.font,
    fontFamily:fonts.InterRegular,
  },
  updateSection: {
    marginTop: 0,
    paddingTop: 16,
  
  },
  updateText: {
    fontSize: 14,
    color: appColors.font,
     fontFamily:fonts.InterSemiBold,
    textAlign: 'center',
  },
});
import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { windowHeight } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
   mainContainerStyle: {
    marginHorizontal: 20,
  },
  footerText: {
    marginTop: 0,
    fontSize: 12,
    color: appColors.secondary,
    fontFamily:fonts.InterRegular,
    lineHeight:windowHeight(15),
    marginBottom:windowHeight(10)
  },
   link: {
    color: appColors.secondary,
    fontFamily: fonts.InterSemiBold,
    fontSize:12,
    textDecorationLine:"underline"
  },
  button:{
    marginTop:windowHeight(5)
  }

})
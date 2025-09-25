import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import { windowHeight } from "../../../theme/appConstant";
import fonts from "../../../theme/appFonts";


export const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  footerText: {
    marginTop: 0,
    fontSize: 12,
    color: appColors.secondary,
    fontFamily:fonts.InterRegular,
    lineHeight:windowHeight(15),
    marginBottom:windowHeight(10),
    textAlign:"center"
  },
   error:{
    color: appColors.error, marginTop: 5,
    textAlign:"center",
    fontSize:11,
    fontFamily:fonts.InterRegular,
    marginTop:10
  },
   link: {
    color: appColors.secondary,
    fontFamily: fonts.InterSemiBold,
    fontSize:12,
   
  },
  button:{
    marginTop:windowHeight(5)
  },
  blankView:{
    height:windowHeight(20)
  }
})
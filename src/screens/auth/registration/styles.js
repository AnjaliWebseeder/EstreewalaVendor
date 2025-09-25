import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { windowHeight } from "../../../theme/appConstant";


export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:appColors.white},

  footerText: { textAlign: 'center', marginTop: 4, fontSize: 14,fontFamily:fonts.InterRegular ,fontWeight:"700"},
  link: { color: appColors.secondary,marginTop:0,fontFamily:fonts.InterRegular,textDecorationLine:"underline",fontWeight:"700" },
  mainStyle:{
    marginHorizontal:20
  },
  row:{
    flexDirection:"row",alignItems:"center",justifyContent:"center"
  },
  contentContainerStyle:{
    paddingBottom:windowHeight(20)
  }
});
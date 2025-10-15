import appColors from "../../../theme/appColors";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import fonts from "../../../theme/appFonts";

const { StyleSheet } = require("react-native");
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:appColors.white },
  bannerContainer: {
  position: 'relative',
  
},
backButton: {
  position: 'absolute',
  top: windowHeight(15),
  left: windowHeight(15),
  backgroundColor: '#fff', // optional (circle background)
  borderRadius: 20,
  elevation: 3, // shadow for Android
  shadowColor: '#000', // shadow for iOS
  shadowOpacity: 0.2,
  shadowRadius: 3,
  height:windowHeight(25),
  width:windowHeight(25),
  alignItems:"center",
  justifyContent:"center"
},

   banner:
   { width: "100%", height:windowHeight(300), resizeMode:'cover' },
  title: { fontSize: 19, marginTop: windowHeight(10),fontFamily:fonts.PoppinsSemiBold,color:appColors.title,textAlign:"center",fontWeight:"700" },
  subText: { fontSize: 12, color: appColors.subTitle, textAlign: 'center', marginVertical: 10,fontFamily:fonts.PoppinsRegular },
  resend: { marginVertical: 15, fontSize: 14, color: appColors.secondary,fontFamily:fonts.PoppinsRegular },
  main:{
    alignItems:"center"
  },
  textStyle:{
    textAlign:"center",
    fontFamily:fonts.PoppinsRegular,
    color:appColors.lightText,
    fontSize:fontSizes.FONT15,
    lineHeight:20,
    marginHorizontal:20
  },
  error:{
    color: appColors.error, marginTop: 5,
    textAlign:"center",
    fontSize:11,
    fontFamily:fonts.InterRegular,
    marginTop:10
  },
    link: { color: appColors.secondary, textAlign:"center",fontFamily:fonts.PoppinsMedium, fontSize:fontSizes.FONT15,textDecorationLine:"underline"},

});

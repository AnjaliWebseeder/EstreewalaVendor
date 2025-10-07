import { StyleSheet } from "react-native";
import appColors from '../../../theme/appColors'
import {windowHeight , fontSizes} from '../../../theme/appConstant'
import fonts from '../../../theme/appFonts'

export const styles = StyleSheet.create({
  container: { flex: 1,backgroundColor:appColors.background},
  banner:
   { width: "100%", height:'45%', resizeMode:'cover' },
  title: { fontSize: 20,marginTop:windowHeight(14),fontFamily:fonts.InterSemiBold,textAlign:"center",fontWeight:"700" },
  subText: { fontSize: 14, color: appColors.subTitle, textAlign: 'center', marginVertical: 10, lineHeight: 22,fontFamily:fonts.InterRegular,marginHorizontal:windowHeight(20) },
  main:{
    marginHorizontal:windowHeight(15),
    
  }, 
  // Phone Input
  input: {
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 10,
    padding: 12,
    width: '100%',
    fontSize: 16,
    marginVertical: 10,
  },
  securityText: { fontSize: 12, color: '#888', marginBottom: 10 },
  phoneContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: appColors.border,
  borderRadius: 8,
  paddingHorizontal: 10,
  marginVertical: 6,
  backgroundColor: '#fff',
  marginTop:10
},
flag: {
  fontSize: 20, // makes the emoji look like a proper flag sticker
  marginRight: 6,
},
prefix: {
  fontSize: 14,
  fontWeight: '500',
  marginRight: 6,
  color: '#000',
},
phoneInput: {
  flex: 1,
  fontSize: 16,
  paddingVertical: 10,
  color:appColors.font,
  fontFamily:fonts.PoppinsRegular
},
text:{
  color:appColors.lightText,
  fontFamily:fonts.PoppinsRegular,
  fontSize:fontSizes.FONT14
},
 error:{
    color: appColors.error, marginTop: 5,
    fontSize:11,
    fontFamily:fonts.InterRegular,
    marginTop:-4,
    marginBottom:6
  },

  // Buttons
  button: {
    backgroundColor: appColors.secondary,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    marginTop:windowHeight(20),
    flexDirection:"row",
    justifyContent:"center",
    paddingVertical:14
  },
  buttonText: { color: appColors.white, fontSize: 16, fontFamily:fonts.PoppinsMedium,marginRight:10 },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    width: '100%',
  },
  line: { flex: 1, height: 1.5, backgroundColor: appColors.border },
  dividerText: { marginHorizontal: 10, fontSize: 14, color: '#666' },

  // Secondary button
  secondaryButton: {
    borderWidth: 2,
    borderColor: appColors.border,
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection:"row",
    justifyContent:"center"
  },
  secondaryText: { color: appColors.subTitle, fontSize: 16,fontFamily:fonts.PoppinsRegular,marginHorizontal:6 },

  // Footer
  footerText: { fontSize: 14, marginTop: 15,alignItems:"center",justifyContent:"center" ,fontFamily:fonts.PoppinsRegular,color:appColors.font},
  link: { color: appColors.secondary, textAlign:"center",fontFamily:fonts.PoppinsMedium,fontSize:14,textDecorationLine:"underline",fontWeight:"700"},
});
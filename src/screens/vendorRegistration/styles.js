import { StyleSheet } from "react-native";
import appColors from "../../theme/appColors";
import { fontSizes, windowHeight } from "../../theme/appConstant";
import fonts from "../../theme/appFonts";
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:appColors.white },
  mainContainer:{
    marginHorizontal:windowHeight(15),
    marginBottom:windowHeight(10)
  },
  details:{
   margin:windowHeight(10),
   flexDirection:"row",
   marginBottom:windowHeight(5)
  },
  image:{
    height:windowHeight(40),
    width:windowHeight(40),
    resizeMode:"contain",
  
  },
  main:{
    marginHorizontal:6
  },
  detail:{
    color:appColors.subTitle,
    fontFamily:fonts.InterRegular,
    fontSize:fontSizes.FONT15
  },
  detailStyle:{
    color:appColors.font,
    fontFamily:fonts.InterRegular,
    fontSize:fontSizes.FONT15,
    marginBottom:windowHeight(4),
    marginTop:windowHeight(5),
    fontWeight:"700"
  },
  textStyle:{
    color:appColors.error,
    fontFamily:fonts.InterRegular,
    fontSize:fontSizes.FONT13,
    marginTop:1,
    marginBottom:windowHeight(10)
  },
  title:{
color:appColors.title,
    fontFamily:fonts.InterRegular,
    fontSize:fontSizes.FONT18,
    marginTop:2,
    fontWeight:"600"
  },
  buttonTextStyle:{
    fontFamily:fonts.InterRegular,
    fontSize:fontSizes.FONT18,
    marginTop:2,
    fontWeight:"600",
    color:appColors.secondary
  },
  serviceRow: {
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
  button: {
    marginTop: 12,
    backgroundColor: '#4b4bff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  buttonStyle:{
    backgroundColor:appColors.lightBlue,
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:windowHeight(8),
    borderRadius:6,
    marginBottom:windowHeight(12)
  },
  add:{
    fontSize:fontSizes.FONT21
  },
  name:{
    color:appColors.font,
    fontFamily:fonts.InterRegular,
    fontSize:fontSizes.FONT18
  },
  buttonContainerStyle:{
    marginHorizontal:15,
    marginBottom:windowHeight(10)
  }
});
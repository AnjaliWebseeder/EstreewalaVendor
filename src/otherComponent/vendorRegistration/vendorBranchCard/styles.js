import { StyleSheet } from "react-native";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

export const styles = StyleSheet.create({
    ownerCard: {
  backgroundColor:appColors.white,
  borderRadius: 10,
  
  marginTop: windowHeight(1),
  borderWidth: 1,
  borderColor: appColors.secondary,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 0,
  marginBottom:windowHeight(15),
  overflow:"hidden"
  
},

ownerHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
  backgroundColor:"#F5F5F5",
  padding: 12,
  borderBottomColor:appColors.secondary,
  borderBottomWidth:1
},

cardTitle: {
  fontSize: 16,
  fontWeight: '600',
  color:appColors.font,
  fontFamily:fonts.InterSemiBold
},

actionRow: {
  flexDirection: 'row',
},

editBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 6,
  paddingHorizontal: 8,
  paddingVertical: 4,
  marginRight: 8,
  borderColor:"green",
  borderWidth:1
},

editText: {
  color: "green",
  marginLeft: 4,
  fontSize: 11,
  fontWeight: '500',
},

deleteBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 6,
  paddingHorizontal: 8,
  paddingVertical: 4,
   borderColor:appColors.error,
  borderWidth:1
},

deleteText: {
  color: appColors.error,
  marginLeft: 4,
  fontSize: 11,
  fontWeight: '500',
},
main:{
  paddingHorizontal:12,
  paddingBottom:windowHeight(10)
},

infoRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 6,
  marginBottom:4
},
rowStyle:{
  flexDirection:"row",justifyContent:"space-between"
},

infoIcon: {
  marginRight: 8,
},

infoText: {
  fontSize: 12,
   color: appColors.subTitle,
  fontSize:fontSizes.FONT17,
  fontFamily:fonts.InterRegular,
  marginBottom:2
},
detail:{
   fontSize: 11,
     color: appColors.font,

  fontSize:fontSizes.FONT17,
  fontFamily:fonts.InterRegular
}

})
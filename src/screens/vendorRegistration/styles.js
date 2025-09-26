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
    color:appColors.white
  },
  serviceRow: {
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  button: {
    marginTop: 12,
    backgroundColor: '#4b4bff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '700' ,fontFamily:fonts.InterRegular},
  buttonStyle:{
    backgroundColor:appColors.secondary,
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:windowHeight(8),
    borderRadius:6,
    marginBottom:windowHeight(12)
  },
  buttonmainContainerStyle: {
      backgroundColor: appColors.secondary,
      height:windowHeight(30),
      width:windowHeight(60),
      marginHorizontal: windowHeight(20),
      borderRadius:4,
      alignItems:"center",
      justifyContent:"center"
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
  },
  stepperContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 10,
  marginVertical: 15,
  marginTop:windowHeight,  
   paddingRight: 40,    
  
},
stepperItem: { alignItems: "center",marginHorizontal:10},
stepCircle: {
  height: 28,
  width: 28,
  borderRadius: 14,
  backgroundColor: "#ccc",
  justifyContent: "center",
  alignItems: "center",
},
isActive:{
   height: 28,
  width: 28,
  borderRadius: 14,
  backgroundColor: appColors.secondary,
  justifyContent: "center",
  alignItems: "center",
},
step:{
  color:appColors.font,
  fontFamily:fonts.InterRegular,
  fontSize:12
},
stepText: { color: "white", fontWeight: "bold", fontSize: 12 },
stepLabel: { fontSize: 11, marginTop: 4, color: "#777", textAlign: "center" },

navButtons: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 0,
  marginBottom: 15,
},
// Add these styles to your existing styles.js
pricingSummaryContainer: {
  backgroundColor: appColors.white,
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},
pricingSummaryTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: appColors.font,
  marginBottom: 12,
},
pricingList: {
  gap: 12,
},
pricingItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: appColors.border,
},
serviceInfo: {
  flex: 1,
},
serviceName: {
  fontSize: 16,
  fontWeight: '600',
  color: appColors.font,
  marginBottom: 4,
},
priceStatus: {
  flexDirection: 'row',
  alignItems: 'center',
},
pricedStatus: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},
notPricedStatus: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},
priceText: {
  fontSize: 14,
  fontWeight: '600',
  color: appColors.success,
},
notPricedText: {
  fontSize: 14,
  color: appColors.warning,
  fontStyle: 'italic',
},
editPriceButton: {
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
  minWidth: 80,
  alignItems: 'center',
},
setPriceButton: {
  backgroundColor: appColors.primary,
},
editButton: {
  backgroundColor: appColors.secondary,
},
editPriceButtonText: {
  color: appColors.white,
  fontSize: 12,
  fontWeight: '600',
},
pricingStats: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: appColors.lightBackground,
  borderRadius: 8,
  padding: 16,
  marginTop: 12,
  marginBottom: 8,
},
statItem: {
  alignItems: 'center',
},
statNumber: {
  fontSize: 20,
  fontWeight: '700',
  color: appColors.primary,
},
pendingStat: {
  color: appColors.warning,
},
statLabel: {
  fontSize: 12,
  color: appColors.lightFont,
  marginTop: 4,
},
noServicesText: {
  textAlign: 'center',
  color: appColors.lightFont,
  fontStyle: 'italic',
  padding: 20,
},
disabledButton: {
  backgroundColor: appColors.lightGray,
  opacity: 0.6,
},
headerInfo: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
  paddingHorizontal: 16,
},

});
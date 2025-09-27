import { StyleSheet } from "react-native";
import appColors from "../../theme/appColors";
import { fontSizes, windowHeight } from "../../theme/appConstant";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: appColors.white 
  },
  mainHeader:{
   backgroundColor: appColors.secondary,
   paddingHorizontal: 12,
   paddingTop: windowHeight(20),
   paddingBottom:windowHeight(3),
   marginBottom:windowHeight(10)
  },
  headerStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   paddingTop:windowHeight(8)
 
  },
   right: {
    width: 30, // placeholder space for actions like filter
  },
   backButton: {
    backgroundColor: appColors.white,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: windowHeight(25),
    width: windowHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    
    marginBottom: windowHeight(10)
  },
  mainContainerStyle:{
 marginHorizontal: windowHeight(15),
  },
  details: {
    margin: windowHeight(10),
    flexDirection: "row",
    marginBottom: windowHeight(5)
  },
  image: {
    height: windowHeight(40),
    width: windowHeight(40),
    resizeMode: "contain",
  },
  main: {
    marginHorizontal: 6
  },
  detail: {
    color: appColors.subTitle,
    fontFamily: fonts.InterRegular,
    fontSize: fontSizes.FONT15
  },
  detailStyle: {
    color: appColors.font,
    fontFamily: fonts.InterRegular,
    fontSize: fontSizes.FONT15,
    marginBottom: windowHeight(4),
    marginTop: windowHeight(5),
    fontWeight: "700"
  },
  textStyle: {
    color: appColors.error,
    fontFamily: fonts.InterRegular,
    fontSize: fontSizes.FONT13,
    marginTop: 1,
    marginBottom: windowHeight(10)
  },
  title: {
    color: appColors.title,
    fontFamily: fonts.InterRegular,
    fontSize: fontSizes.FONT18,
    marginTop: 2,
    fontWeight: "600"
  },
  titleStyle:{
       fontSize: fontSizes.FONT21HALF,
    fontWeight: '700',
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
  },
  buttonTextStyle: {
    fontFamily: fonts.InterRegular,
    fontSize: fontSizes.FONT18,
    marginTop: 2,
    fontWeight: "600",
    color: appColors.white
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
  buttonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '700',
    fontFamily: fonts.InterRegular 
  },
  buttonStyle: {
    backgroundColor: appColors.secondary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: windowHeight(8),
    borderRadius: 6,
    marginBottom: windowHeight(12)
  },
  buttonmainContainerStyle: {
    backgroundColor: appColors.secondary,
    height: windowHeight(30),
    width: windowHeight(60),
    marginHorizontal: windowHeight(20),
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    fontSize: fontSizes.FONT21
  },
  name: {
    color: appColors.font,
    fontFamily: fonts.InterRegular,
    fontSize: fontSizes.FONT18
  },
  buttonContainerStyle: {
    marginHorizontal: 15,
    marginBottom: windowHeight(10)
  },

  // Clean Stepper Slider without dots
stepperContainer:{
  marginVertical:windowHeight(20),
  marginTop:windowHeight(28)
},
 stepsSegmentsContainer: {
  flexDirection: 'row',
},

stepSegment: {
  flex: 1,                      // Equal width for all
  height: 4,                    // Thickness of each slider
  marginHorizontal: 4,          // Space between segments
  borderRadius: 3,
  backgroundColor: appColors.lightBlue,
 
},

activeSegment: {
  backgroundColor: appColors.border,
},

completedSegment: {
  backgroundColor: appColors.white,
},


  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 0,
    marginBottom: 15,
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
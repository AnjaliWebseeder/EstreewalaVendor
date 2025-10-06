// Updated styles.js
import { StyleSheet } from "react-native";
import appColors from "../../theme/appColors";
import { fontSizes, windowHeight, windowWidth } from "../../theme/appConstant";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: appColors.white 
  },
  mainHeader: {
    backgroundColor: appColors.secondary,
    paddingHorizontal: windowHeight(12),
    paddingTop: windowHeight(15),
    paddingBottom: windowHeight(6),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    shadowColor: appColors.secondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    width: 24,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
 
  },
  stepContainer: {
    marginHorizontal: windowHeight(14),
    marginTop: windowHeight(12),
  },
  
  // Enhanced Typography
  largeTitle: {
    fontSize: fontSizes.FONT22,
    fontWeight: '700',
    marginBottom: windowHeight(4),
  },
  largeSubtitle: {
    fontSize: fontSizes.FONT16,
    lineHeight: 22,
    color: appColors.gray,
    marginBottom: windowHeight(16),
  },
  largeInput: {
    fontSize: fontSizes.FONT16,
    height: windowHeight(48),
  },
  largeLabel: {
    fontSize: fontSizes.FONT14,
    fontWeight: '600',
    marginBottom: windowHeight(6),
  },

  // Enhanced Stepper
  stepperContainer: {
    marginVertical: windowHeight(16),
    marginTop:windowHeight(24)
  },
  stepsSegmentsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
     marginHorizontal: windowWidth(6),
  },
  stepSegment: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: appColors.lightBlue,
    marginBottom: windowHeight(6),
    
    
  },
  activeSegment: {
    backgroundColor: appColors.white,
    height: 5,
  },
  completedSegment: {
    backgroundColor: appColors.white,
  },
  stepLabel: {
    fontSize: fontSizes.FONT10,
    color: appColors.lightBlue,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeStepLabel: {
    color: appColors.white,
    fontWeight: '700',
    fontSize: fontSizes.FONT11,
  },
  completedStepLabel: {
    color: appColors.white,
    fontWeight: '600',
  },

  // Enhanced Buttons
  addButton: {
    backgroundColor: appColors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowHeight(12),
    paddingHorizontal: windowHeight(16),
    borderRadius: 10,
    elevation: 3,
    shadowColor: appColors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButtonText: {
    fontFamily: fonts.InterSemiBold,
    fontSize: fontSizes.FONT16,
    fontWeight: "600",
    color: appColors.white,
    marginLeft: windowHeight(6),
  },

  // Enhanced Services Section
  servicesContainer: {
    marginTop: windowHeight(8),
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.background,
    paddingVertical: windowHeight(9),
    paddingHorizontal: windowHeight(14),
    borderRadius: 10,
    marginBottom: windowHeight(8),
    borderWidth: 1.5,
    borderColor: appColors.border,
  },
  selectedServiceCard: {
    borderWidth: 1,
    borderColor: appColors.secondary,
    transform: [{ scale: 1.01 }],
  },
  serviceName: {
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    fontSize: fontSizes.FONT16,
    marginLeft: windowHeight(10),
    fontWeight: '500',
  },
  selectedServiceName: {
    color: appColors.white,
    fontWeight: '600',
  },

  // Enhanced Options Section
  optionsContainer: {
    marginTop: windowHeight(8),
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.background,
    paddingVertical: windowHeight(8.5),
    paddingHorizontal: windowHeight(10),
    borderRadius: 10,
    marginBottom: windowHeight(10),
    borderWidth: 1.5,
    borderColor: appColors.border,
  },
  selectedOptionCard: {
    backgroundColor: appColors.lightSecondary,
    borderColor: appColors.secondary,
  },
  optionText: {
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    fontSize: fontSizes.FONT16,
    marginLeft: windowHeight(8),
    fontWeight: '500',
  },
  selectedOptionText: {
    color: appColors.secondary,
    fontWeight: '600',
  },

  // Enhanced Navigation Buttons
  navButtons: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: windowHeight(14),
    paddingVertical: windowHeight(8),
    backgroundColor: appColors.white,
    borderTopWidth: 1,
    borderTopColor: appColors.borderLight,
  },
  backButtonContainer: {
  flexDirection: 'row',

    backgroundColor: appColors.white,
    paddingVertical: windowHeight(6),
    borderRadius: 8,
    elevation: 3,
    shadowColor: appColors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor:appColors.secondary,
    borderWidth:1
  },
  backButtonText: {
    color: appColors.secondary,
    fontFamily: fonts.InterSemiBold,
    fontSize: fontSizes.FONT15,
    fontWeight: '600',
    marginLeft: windowHeight(4),
      paddingHorizontal:10,
    paddingLeft:5
  },
  nextButton: {
    flexDirection: 'row',

    backgroundColor: appColors.secondary,
    paddingVertical: windowHeight(8),
    borderRadius: 8,
    elevation: 3,
    shadowColor: appColors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  nextButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
    fontSize: fontSizes.FONT15,
    fontWeight: '600',
    marginRight: windowHeight(4),
    paddingHorizontal:10,
    paddingLeft:15
  },
  buttonStyle:{
      paddingRight:10
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.secondary,
    paddingVertical: windowHeight(8.5),
    paddingHorizontal: windowHeight(20),
    borderRadius: 8,
    elevation: 4,
    shadowColor:  '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
    fontSize: fontSizes.FONT15,
    fontWeight: '700',
    marginRight: windowHeight(6),
  },

  // Enhanced Error Style
   errorStyle:{
     color:appColors.error,textAlign:"left",marginHorizontal:windowHeight(14),
     fontSize:fontSizes.FONT14,
     fontWeight:"500",
     marginTop:windowHeight(-4)
  },


  titleStyle: {
    fontSize: fontSizes.FONT20,
    fontWeight: '800',
    color: appColors.white,
    fontFamily: fonts.InterBold,
  },
});
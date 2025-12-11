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
    paddingTop: windowHeight(17),
    paddingBottom: windowHeight(3),
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
  mainView:{
    marginHorizontal:18,
    marginTop:15,
    marginBottom:1,
    
  },
  largeInput: {
    fontSize: fontSizes.FONT16,
    height: windowHeight(48),
  },
  largeLabel: {
    color: appColors.title,
    fontFamily: fonts.InterSemiBold,
    fontWeight: '600',
    fontSize: fontSizes.FONT17,
    marginTop:2
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
    fontSize: fontSizes.FONT9,
    color: appColors.lightBlue,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeStepLabel: {
    color: appColors.white,
    fontWeight: '700',
    fontSize: fontSizes.FONT9,
  },
  completedStepLabel: {
    color: appColors.white,
    fontWeight: '600',
      fontSize: fontSizes.FONT9,
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
    marginBottom: windowHeight(12),
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
sectionContainer: {
  marginBottom: 10,
},
sectionTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 4,
  color: appColors.text,
},
masterCardContainer: {
  backgroundColor: '#f8f9fa',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#e9ecef',
  overflow: 'hidden',
  marginBottom: 12,
  marginTop:2
},
selectedMasterContainer: {
  backgroundColor: '#e9edf1ff',
  borderColor: appColors.primary,
},
masterCardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  paddingVertical:10
},
masterCardLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},
masterCardTextContainer: {
  marginLeft: 12,
  flex: 1,
},
masterCardTitle: {
  fontSize: 14,
  fontWeight: '600',
  color: appColors.text,
  marginBottom: 2,
},
masterCardSubtitle: {
  fontSize: 10,
  color: '#666',
},
dropdownContent: {
  padding: 16,
  paddingTop: 0,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderTopColor: '#f0f0f0',
},
includedServicesHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '#f0f0f0',
},
includedServicesTitle: {
  fontSize: 14,
  fontWeight: '500',
  color: '#666',
  marginLeft: 8,
},
includedServicesGrid: {
  marginBottom: 12,
},
includedServiceItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#f8f8f8',
},
serviceBadge: {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: appColors.primary + '20',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},
serviceBadgeNumber: {
  fontSize: 12,
  fontWeight: '600',
  color: appColors.primary,
},
includedServiceName: {
  flex: 1,
  fontSize: 14,
  color: '#555',
},
allSelectedNote: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: appColors.success + '15',
  padding: 10,
  borderRadius: 8,
  marginTop: 1,
  paddingVertical:0
},
allSelectedText: {
  fontSize: 13,
  color: appColors.success,
  marginLeft: 8,
  fontWeight: '500',
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
    paddingLeft:5,
  },
  disabledButtonStyle: {
 
  opacity: 0.5,              // Makes it look inactive
  backgroundColor: appColors.border, // Optional subtle background
  borderColor: appColors.gray,          // Match your theme
  borderWidth: 1,

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
     marginTop:windowHeight(4)
  },


  titleStyle: {
    fontSize: fontSizes.FONT20,
    fontWeight: '800',
    color: appColors.white,
    fontFamily: fonts.InterBold,
  },
});
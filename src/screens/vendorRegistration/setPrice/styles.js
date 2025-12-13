import { StyleSheet, Dimensions } from "react-native";
import appColors from "../../../theme/appColors";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import fonts from "../../../theme/appFonts";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    marginTop:windowHeight(0)
  },
filter:{
    height:30,
    width:30,
    borderRadius:5,
    backgroundColor:appColors.secondary,
    alignItems:"center",
    justifyContent:"center",
    marginTop:windowHeight(5)
},
 
 
  // Service Tabs
  serviceTabsContainer: {
    backgroundColor: appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: appColors.borderLight,
   paddingBottom:windowHeight(12),
    
  },
  serviceTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: appColors.border,
   
  },
  serviceTabActive: {
    backgroundColor: appColors.secondary,
    borderColor: appColors.primary,
  },
  serviceTabText: {
    fontSize: fontSizes.FONT13,
    fontWeight: '600',
    color: appColors.primary,
    marginLeft: 6,
    fontFamily:fonts.InterSemiBold
  },
  serviceTabTextActive: {
    color: appColors.white,
  },

  

  // Price Cards
  listContainer: {
    // paddingBottom: 120,
    paddingVertical:windowHeight(0)
  },
  priceCard: {
    backgroundColor: appColors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: windowHeight(10),
    shadowColor: appColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    borderColor:appColors.secondary,
    borderWidth:1,
    paddingVertical:7,
     marginHorizontal:windowHeight(10)
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: fontSizes.FONT15,
    fontWeight: '600',
    color: appColors.title,
    marginBottom: 2,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCategory: {
    fontSize: fontSizes.FONT16,
    color: appColors.subTitle,
    fontWeight: '500',
    fontFamily:fonts.InterRegular
  },
  basePrice: {
    fontSize: fontSizes.FONT10,
    color: appColors.gray,
    fontStyle: 'italic',
  },
  priceActions: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: fontSizes.FONT15,
    fontWeight: '700',
    color: appColors.primary,
    marginBottom: 4,
  },
  customPrice: {
    color: appColors.success,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 3,
    backgroundColor: appColors.secondary,
    borderRadius: 6,
    marginLeft: 4,
  },
  quickPriceButton: {
    padding: 6,
    backgroundColor: appColors.lightSuccess,
    borderRadius: 6,
    marginLeft: 4,
  },
  editingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    width: 60,
    borderWidth: 1,
    borderColor: appColors.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: fontSizes.FONT13,
    fontWeight: '700',
    color: appColors.title,
    textAlign: 'center',
    marginRight: 3,
    backgroundColor: appColors.white,
    fontFamily:fonts.InterRegular
  },
  editActions: {
    flexDirection: 'row',
  },
  saveEditButton: {
    padding: 8,
    backgroundColor: appColors.success,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelEditButton: {
    padding: 8,
    backgroundColor: appColors.lightError,
    borderRadius: 6,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: fontSizes.FONT16,
    color: appColors.gray,
    marginTop: 12,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: fontSizes.FONT12,
    color: appColors.subTitle,
    marginTop: 4,
  },
 
filterItemActive: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
},
filterText: {
    fontSize: 14,
    color: appColors.title,
    marginLeft: 12,
    flex: 1,
    fontFamily:fonts.InterRegular
},
checkIcon: { marginLeft: 'auto' },
dropdownContainer: {
  position: 'absolute',
  top: 60,
  right: 10,
  backgroundColor: appColors.white,
  borderRadius: 12,
  paddingVertical: 8,
  paddingHorizontal: 12,
  width: width * 0.5,
  shadowColor: appColors.shadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5,
  zIndex: 100,
},
dropdownItem: {
  paddingVertical: 10,
  paddingHorizontal: 8,
  borderRadius: 8,
  marginVertical: 2,
},
dropdownItemActive: {
  backgroundColor: appColors.primary,
},
dropdownText: {
  fontSize: 14,
  color: appColors.title,
},
dropdownTextActive: {
  color: appColors.white,
  fontWeight: '700',
},
summaryValue:{
  color:appColors.font,
  fontFamily:fonts.InterSemiBold,
  fontWeight:"700",
  marginTop:10,
  marginHorizontal:5
},
containerStyle:{
  flexDirection:"row",justifyContent:"space-between",paddingBottom:0,  alignItems:"center",
  paddingTop:windowHeight(7),
  paddingBottom:windowHeight(10),
  marginHorizontal:windowHeight(10)
},
// Add to your styles
currentServiceInfo: {
  paddingHorizontal: 0,
  marginHorizontal: 16,
  borderRadius: 8,
  // marginBottom: 2,
   marginTop:windowHeight(10)
},
currentServiceText: {
  fontSize: 14,
  color: appColors.font,
  textAlign: "left",
},
serviceName: {
  fontWeight: 'bold',
  color: appColors.secondary,
},
// Validation Styles
validationBanner: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  marginHorizontal: 16,
  marginTop: 8,
  borderRadius: 8,
},
validationSuccess: {
  backgroundColor: appColors.success,
},
validationError: {
  backgroundColor: appColors.error,
},
validationText: {
  color: appColors.white,
  fontSize: 14,
  marginLeft: 8,
  flex: 1,
},
clearButton: {
  padding: 4,
  marginRight: 4,
},


});
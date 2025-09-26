import { StyleSheet, Dimensions } from "react-native";
import appColors from "../../../theme/appColors";
import { fontSizes, windowHeight } from "../../../theme/appConstant";
import fonts from "../../../theme/appFonts";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
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
  // Modal Overlay for Filter
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  // Filter Dropdown
  filterDropdown: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 20,
    width: width * 0.8,
    shadowColor: appColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  filterTitle: {
    fontSize: fontSizes.FONT18,
    fontWeight: '700',
    color: appColors.title,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily:fonts.InterSemiBold
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: appColors.border,
    marginBottom:10
  },
  filterItemActive: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
  },
  filterTextActive: {
    color: appColors.secondary,
    fontFamily:fonts.InterSemiBold,
    fontSize:fontSizes.FONT16HALF,
    fontWeight:"600"
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  closeFilterButton: {
    marginTop: 6,
    backgroundColor: appColors.lightBlue,
    borderRadius: 8,
    alignItems: 'center',
    padding:10
  },
  closeFilterText: {
    fontSize: fontSizes.FONT15,
    fontWeight: '600',
    color: appColors.white,
    fontFamily:fonts.InterRegular
  },

  // Service Tabs
  serviceTabsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    borderBottomWidth: 1,
    borderBottomColor: appColors.borderLight,
   paddingBottom:20
  },
  serviceTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
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
    paddingHorizontal: 12,
    paddingBottom: 120,
    paddingVertical:windowHeight(7)
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
    paddingVertical:7
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
    paddingVertical: 5,
    fontSize: fontSizes.FONT14,
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
 
  

  // Action Buttons
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: appColors.white,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
    shadowColor: appColors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  couponButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: appColors.lightBlue,
    borderWidth: 1,
    borderColor: appColors.primaryLight,
  },
  couponText: {
    fontSize: fontSizes.FONT13,
    fontWeight: '600',
    color: appColors.primary,
    marginLeft: 6,
  },
  saveButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: appColors.primary,
  },
  saveButtonText: {
    fontSize: fontSizes.FONT15,
    fontWeight: '700',
    color: appColors.white,
    marginRight: 6,
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

  paddingHorizontal:18,
  paddingTop:7,
  paddingBottom:10
}

});
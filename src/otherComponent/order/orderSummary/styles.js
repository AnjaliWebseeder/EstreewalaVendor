import { Dimensions } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { fontSizes, windowHeight } from "../../../theme/appConstant";

const { StyleSheet } = require("react-native");
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  
  // Scroll View
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 85,
  },
  
  // Cards - Enhanced with better styling
  deliveryCard: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop:windowHeight(8),
    paddingBottom:windowHeight(2),
    marginBottom: 10,
    borderColor: appColors.secondary,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  infoCard: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 16,
    paddingTop:10,
    marginBottom: 10,
    borderColor: appColors.secondary,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  itemsCard: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 16,
    paddingVertical:12,
    marginBottom: 16,
    borderColor: appColors.secondary,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  specialCard: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical:11,
    marginBottom: 16,
    borderColor: appColors.secondary,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryCard: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 16,
    paddingVertical:12,
    marginBottom: 16,
    borderColor: appColors.secondary,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  
  // Card Headers - Enhanced
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    marginTop:0.7
  },
  iconContainer: {
    width: 22,
    height: 22,
    borderRadius: 8,
    backgroundColor: appColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.font,
    fontFamily: fonts.InterSemiBold
  },
  
  // Enhanced Timeline
  timeline: {
    // marginLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: windowHeight(6),
  },
  timelineMarker: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    marginTop:3
  },
  dotCompleted: {
    backgroundColor: '#51cf66',
    borderColor: '#e8f5e8',
  },
  dotCurrent: {
    backgroundColor: appColors.blue,
    borderColor: appColors.background,
  },
  timelineConnector: {
    width: 2,
    height: 40,
    backgroundColor: appColors.border,
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.font,
    marginBottom: 4,
    fontFamily: fonts.InterSemiBold
  },
  timelineDate: {
    fontSize: 13,
    color: appColors.blue,
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: fonts.InterMedium
  },
  timelineTime: {
    fontSize: 13,
    color: appColors.subTitle,
    marginBottom: 4,
    fontFamily: fonts.InterRegular
  },
  timelineAddress: {
    fontSize: 12,
    color: appColors.font,
    lineHeight: 18,
    fontFamily: fonts.InterRegular
  },
  
  // Enhanced Customer Info
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:2
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 25,
    backgroundColor: appColors.border,
  },
  customerDetails: {
    marginLeft: 16,
    flex: 1,
   
  },
  customerName: {
    fontSize: 13,
    fontWeight: '600',
    color: appColors.font,
 
    fontFamily: fonts.InterSemiBold
  },
  customerLocation: {
    fontSize: 12,
    color: appColors.subTitle,
    marginBottom: 4,
    fontFamily: fonts.InterRegular,
    marginTop:1
  },
 
  
  // Enhanced Items
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: windowHeight(8),
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    
  },
  itemThumb: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: fontSizes.FONT17,
    fontWeight: '600',
    color: appColors.font,
    marginBottom: 2,
    fontFamily: fonts.InterSemiBold
  },
  itemService: {
    fontSize: fontSizes.FONT15,
    color: appColors.subTitle,
    marginBottom: 4,
    fontFamily: fonts.InterMedium
  },
  itemPrice: {
    fontSize: 14,
    color: appColors.blue,
    fontWeight: '600',
    fontFamily: fonts.InterSemiBold,
    
  },  
  // Enhanced Special Sections
  section: {
    marginBottom: 10,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    width: 22,
    height: 22,
    borderRadius: 8,
    backgroundColor: appColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: appColors.font,
    fontFamily: fonts.InterSemiBold
  },
  instructionContainer: {
    backgroundColor: appColors.background,
    padding: 12,
    paddingVertical:9,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: appColors.blue,
    marginTop:windowHeight(4)
  },
  instructionText: {
    fontSize: fontSizes.FONT16,
    color: appColors.font,
    lineHeight: 20,
    fontFamily: fonts.InterRegular
  },
  placeholder: {
    fontSize: 14,
    color: appColors.subTitle,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16,
    fontFamily: fonts.InterRegular
  },
  appliedCoupon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 16,
    paddingVertical:10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  couponInfo: {
    flex: 1,
  },
 
  
  
  // Enhanced Summary
  summaryRows: {
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 15,
    color: appColors.subTitle,
    fontFamily: fonts.InterMedium
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: appColors.font,
    fontFamily: fonts.InterSemiBold
  },
  discountText: {
    color: '#16a34a',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 7,
    borderTopWidth: 2,
    borderTopColor: appColors.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.font,
    fontFamily: fonts.InterSemiBold
  },
  totalNote: {
    fontSize: 10,
    color: appColors.subTitle,
    marginTop: 2,
    fontFamily: fonts.InterRegular
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: appColors.blue,
    fontFamily: fonts.InterBold
  },
  
  // Enhanced Action Bar
   fullWidthButton: {
    width: '100%',
    flex: 1,
  },

  // Half width button (for two button states)
  halfWidthButton: {
    width: '48%', // Slightly less than 50% for spacing
    flex: 0.48,
  },

  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: appColors.white,
    padding: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    justifyContent: 'space-between', // This handles the spacing
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.white,
    borderWidth: 0.8,
    borderColor: '#FF0000',
    height: windowHeight(35),
    borderRadius: 12,
    // Remove: marginRight, marginHorizontal
  },
  
  rejectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF0000',
    marginLeft: 8,
    fontFamily: fonts.InterSemiBold
  },
  payButton: {
    flex: 2,
    backgroundColor: appColors.blue,
    borderRadius: 12,
    shadowColor: appColors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    height:windowHeight(39)
  },
  payContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  payText: {
    fontSize: fontSizes.FONT17,
    fontWeight: '600',
    color: appColors.white,
    marginLeft: 8,
    fontFamily: fonts.InterSemiBold
  },
  
  // Status Indicators
  statusContainer: {
    paddingHorizontal: 16,
    paddingVertical: windowHeight(4),
    paddingBottom:windowHeight(8)
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingVertical:11,
    borderRadius: 12,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rejectedStatus: {
    backgroundColor: '#ea3c3cff',
  },
  statusText: {
    color: appColors.white,
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
    fontFamily: fonts.InterSemiBold
  },
  
  // Enhanced Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: appColors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical:10,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: appColors.font,
    fontFamily: fonts.InterBold
  },
  modalSubtitle: {
    fontSize: 14,
    color: appColors.subTitle,
    marginHorizontal: 20,
    marginBottom: 16,
    fontFamily: fonts.InterRegular,
    marginTop:10
  },
  closeButton: {
    padding: 4,
  },
 
  
  
  // Enhanced Modal Actions

  cancelBtn: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: appColors.border,
     paddingVertical:10,
  },
 
  saveBtn: {
    flex: 2,
    padding: 16,
    paddingVertical:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.blue,
  borderRadius: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.white,
    fontFamily: fonts.InterSemiBold
  },



  // Add to your styles.js
statusHeaderBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
  marginLeft: 10,
},
statusHeaderText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '600',
  marginLeft: 4,
},
acceptButton: {
  flex: 1,
 backgroundColor: "#10C761",
  borderRadius: 8,
  alignItems: 'center',
  marginLeft: 10,
  flexDirection:"row",
  justifyContent:"center"
  
},
completeButton: {
  flex: 1,
  backgroundColor: '#4CAF50',
  borderRadius: 8,
  alignItems: 'center',
  flexDirection:"row",
  padding:12,
  justifyContent:"center"
},
statusBadge: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  backgroundColor: '#f8f9fa',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#e9ecef',
},
statusText: {
  fontSize: 16,
  fontWeight: '600',
  marginLeft: 8,
  color: '#495057',
},
 loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    height: windowHeight(35),
  },
  
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.white,
    marginLeft: 8,
    fontFamily: fonts.InterSemiBold
  },

  // Disabled state for buttons
  disabledButton: {
    opacity: 0.6,
  },
  // Add these styles to your existing styles
itemImage: {
  width: 40,
  height: 40,
  borderRadius: 8,
  marginRight: 12,
},
itemDetails: {
  flex: 1,
},
itemName: {
  fontSize: 15,
  fontWeight: '600',
  color: '#333',
  marginBottom: 4,
},
itemService: {
  fontSize: 14,
  color: '#666',
  marginBottom: 2,
},
itemQuantity: {
  fontSize: 12,
  color: '#888',
  marginBottom: 2,
},

});
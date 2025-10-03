import { Dimensions } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { windowHeight } from "../../../theme/appConstant";

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
    paddingVertical: 12,
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
    fontSize: 14,
    fontWeight: '600',
    color: appColors.font,
    marginBottom: 2,
    fontFamily: fonts.InterSemiBold
  },
  itemService: {
    fontSize: 14,
    color: appColors.subTitle,
    marginBottom: 4,
    fontFamily: fonts.InterMedium
  },
  itemPrice: {
    fontSize: 14,
    color: appColors.blue,
    fontWeight: '600',
    fontFamily: fonts.InterSemiBold
  },
  itemActions: {
    alignItems: 'flex-end',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.background,
    borderRadius: 20,
    padding: 4,
    marginBottom: 8,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: appColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.font,
    marginHorizontal: 12,
    fontFamily: fonts.InterSemiBold
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: appColors.font,
    fontFamily: fonts.InterBold
  },
  
  // Enhanced Special Sections
  section: {
    marginBottom: 10,
  },
  couponSection: {
    marginBottom: 0,
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
  couponIcon: {
    backgroundColor: '#16a34a',
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
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: appColors.blue,
  },
  instructionText: {
    fontSize: 14,
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
  couponDetails: {
    marginTop: 2,
  },
  couponBadge: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom:6
  },
  couponCode: {
    fontSize: 14,
    fontWeight: '700',
    color: appColors.title,
    fontFamily: fonts.InterBold
  },
  couponDescription: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
    fontFamily: fonts.InterRegular
  },
  removeBtn: {
    padding: 8,
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
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: appColors.white,
    padding: 16,
    paddingVertical:10,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.white,
    borderWidth: 2,
    borderColor: '#ff6b6b',
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  rejectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
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
  },
  payContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  payText: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.white,
    marginLeft: 8,
    fontFamily: fonts.InterSemiBold
  },
  
  // Status Indicators
  statusContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rejectedStatus: {
    backgroundColor: '#ff6b6b',
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
  
  // Enhanced Coupon Cards
  couponList: {
    paddingHorizontal: 20,
    maxHeight: 400,
  },
  couponCard: {
    backgroundColor: appColors.white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: appColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  couponCardSelected: {
    borderColor: appColors.blue,
    backgroundColor: appColors.background,
    transform: [{ scale: 1.02 }],
  },
  couponCardDisabled: {
    opacity: 0.6,
  },
  couponColorStrip: {
    height: 4,
    width: '100%',
  },
  couponContent: {
    paddingHorizontal: 16,
    paddingVertical:7
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  
  couponDiscount: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.blue,
    marginTop: 2,
    fontFamily: fonts.InterSemiBold
  },
  couponDescription: {
    fontSize: 14,
    color: appColors.subTitle,
    marginBottom: 4,
    lineHeight: 18,
    fontFamily: fonts.InterRegular
  },
  couponDescriptionDisabled: {
    color: appColors.subTitle,
  },
  couponMinAmount: {
    fontSize: 12,
    color: appColors.subTitle,
    fontFamily: fonts.InterMedium
  },
  eligibilityWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  notEligibleText: {
    fontSize: 12,
    color: '#ff6b6b',
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: fonts.InterMedium
  },
  
  // Enhanced Radio Button
  radio: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: appColors.blue,
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: appColors.blue,
  },
  
  // Enhanced Instruction Input
  instructionInput: {
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: appColors.background,
    fontFamily: fonts.InterRegular,
    lineHeight: 20,
  },
  
  // Enhanced Modal Actions
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
  },
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
  cancelBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.subTitle,
    fontFamily: fonts.InterSemiBold
  },
  applyBtn: {
    flex: 2,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.blue,
    borderRadius: 12,
  },
  applyBtnDisabled: {
    opacity: 0.5,
  },
  applyBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.white,
    fontFamily: fonts.InterSemiBold
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
});
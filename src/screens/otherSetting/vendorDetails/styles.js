import { StyleSheet, Dimensions } from 'react-native';
import appColors from "../../../theme/appColors"
import { fontSizes, windowHeight } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  // Progress Indicator
  progressContainer: {
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginTop:windowHeight(22)
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: appColors.secondary,
    borderRadius: 2,
  },
  
  // Content Area
  content: {
    flex: 1,
    paddingTop: 17,
  },
  
  // Step Content
  stepContent: {
    paddingBottom: 120,
    paddingHorizontal:20
  },
  titleContainer:{
    marginHorizontal:10
  },
  stepTitle: {
    fontSize: fontSizes.FONT22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: fontSizes.FONT14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 13,
  },
  
  // Inputs
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: fontSizes.FONT18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: '#111827',
    fontFamily: 'System',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  locationText: {
    fontSize: 13,
    color: '#111827',
    flex: 1,
    fontFamily: 'System',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  clearLocation: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  clearLocationText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
  },
  
  // Owners Section
  ownersList: {
    maxHeight: height * 0.4,
    marginBottom: 20,
  },
  ownerCard: {
    backgroundColor: appColors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ownerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  ownerPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  ownerWhatsapp: {
    fontSize: 13,
    color: '#10B981',
    marginTop: 2,
  },
  editOwnerButton: {
    padding: 8,
  },
  
  // Empty States
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 4,
  },
  
  // Add Button
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.white,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  
  // Services Section
  servicesContainer: {
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
  },
  selectedServiceItem: {
    borderColor: appColors.black,
    backgroundColor: '#eaedebff',
  },
  serviceIconContainer: {
    marginRight: 12,
  },
  serviceText: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
    fontFamily:fonts.InterSemiBold
  },
  
 
  // Delivery Section
  deliveryOptions: {
    marginBottom: 24,
  },
  deliveryOptionCard: {
    backgroundColor: appColors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical:10
  },
  selectedDeliveryCard: {
    borderColor: appColors.secondary,
    backgroundColor: '#F0F9FF',
  },
  deliveryOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryOptionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  deliveryOptionTitle: {
    fontSize: 15,
    fontFamily:fonts.PoppinsBold,
    color: appColors.blue,
  },
  selectedDeliveryTitle: {
    color: appColors.secondary,
  },
  deliveryOptionDescription: {
    fontSize: 10,
    color: '#6B7280',
 
    lineHeight: 18,
  },
  

  // Professional Navigation
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: appColors.white,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
  },
  previousButton: {
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  previousButtonText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: appColors.secondary,
  },
  nextButtonText: {
    color: appColors.white,
    fontSize: fontSizes.FONT17,
    fontWeight: '600',
    marginRight: 8,
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});
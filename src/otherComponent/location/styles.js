import { StyleSheet } from 'react-native';
import appColors from '../../theme/appColors';
import fonts from '../../theme/appFonts';
import { fontSizes } from '../../theme/appConstant';
export const styles = StyleSheet.create({
  // Main Container
  mainContainer: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },

  // Row Layout
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Switch Row
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.textPrimary,
  },

  // Address Section
 
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.textPrimary,
  },
  mapButton: {
    backgroundColor: appColors.blue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mapButtonText: {
    color: appColors.white,
    fontSize: 12,
    fontWeight: '500',
  },

  // Map Modal
  modalContainer: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 20,
    color: appColors.textPrimary,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: appColors.subTitle,
  },

  // Permission Modal
  permissionModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  permissionModal: {
    backgroundColor: appColors.white,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 320,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionMessage: {
    fontSize: 14,
    color: appColors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  permissionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  permissionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: appColors.border,
    marginRight: 8,
  },
  allowButton: {
    backgroundColor: appColors.blue,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: appColors.textPrimary,
    fontWeight: '500',
  },
  allowButtonText: {
    color: appColors.white,
    fontWeight: '500',
  },

  // Delete Button
  deleteButton: {
    backgroundColor: appColors.error,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  deleteButtonText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '500',
  },
    webview: {
    flex: 1,
    width: '100%',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    minHeight: 400,
  },
  mapLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 1000,
  },
  mapLoadingText: {
    marginTop: 10,
    color: appColors.darkGray,
  },
  mapError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.lightGray,
  },
  mapErrorText: {
    color: appColors.error,
    textAlign: 'center',
    padding: 20,
  },
  selectedLocationInfo: {
    backgroundColor: appColors.lightGreen,
    padding: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    marginBottom: 8,
  },
  selectedLocationInfoText: {
    color: appColors.darkGreen,
    fontSize: 12,
    textAlign: 'center',
  },
  selectedLocationContainer: {
    backgroundColor: appColors.lightGreen,
    padding: 10,
    borderRadius: 6,
    marginVertical: 8,
  },
  selectedLocationText: {
    color: appColors.darkGreen,
    fontSize: 14,
    textAlign: 'center',
  },
  
  // Rest of your existing map styles...
  mapModalContainer: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  mapModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  mapModalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 20,
    color: appColors.darkGray,
  },
  currentAddressContainer: {
    backgroundColor: appColors.lightBlue,
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  currentAddressTitle: {
    fontWeight: '600',
    marginBottom: 4,
    color: appColors.darkGray,
  },
  currentAddressText: {
    color: appColors.darkGray,
    fontSize: 14,
  },
  mapModalButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  mapButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: appColors.blue,
  },
  secondaryButton: {
    backgroundColor: appColors.lightGray,
    borderWidth: 1,
    borderColor: appColors.border,
  },
  primaryButtonText: {
    color: appColors.white,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: appColors.darkGray,
    fontWeight: '600',
  },
    addressSection: {
    marginBottom: 10,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
     color: appColors.title,
    fontFamily: fonts.InterSemiBold,
    fontWeight: '600',
    fontSize: fontSizes.FONT17,
    
  },
  input: {
    borderWidth: 1,
    borderColor: appColors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
     fontSize: fontSizes.FONT17,
    backgroundColor: appColors.white,
    color: appColors.font,
  },
  addressInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    lineHeight: 20,
  },
  inputError: {
    borderColor: appColors.error,
    backgroundColor: appColors.errorLight,
  },
  errorText: {
    color: appColors.error,
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    fontSize: 12,
    color: appColors.border,
    marginTop: 6,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  // Add these styles to your existing styles
  mapModalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  mapModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.darkGray,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: appColors.darkGray,
    fontWeight: 'bold',
  },
  
  // Current Address Styles
  currentAddressContainer: {
    backgroundColor: appColors.lightBlue,
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: appColors.blue,
  },
  currentAddressTitle: {
    fontWeight: '600',
    marginBottom: 4,
    color: appColors.darkGray,
  },
  currentAddressText: {
    color: appColors.darkGray,
    fontSize: 14,
    lineHeight: 18,
  },
  
  // Map Container
  mapContainer: {
    flex: 1,
    minHeight: 400,
  },
  webview: {
    flex: 1,
  },
  
  // Loading States
  mapLoading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1000,
  },
  mapLoadingText: {
    marginTop: 12,
    fontSize: 16,
    color: appColors.gray,
  },
  
  // Error States
  mapError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.lightGray,
    padding: 20,
  },
  mapErrorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.error,
    marginBottom: 8,
  },
  mapErrorText: {
    fontSize: 14,
    color: appColors.darkGray,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: appColors.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  
  // Selected Location
  selectedLocationContainer: {
    backgroundColor: appColors.lightGreen,
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  selectedLocationText: {
    color: appColors.darkGreen,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Buttons
  mapModalButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  mapButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: appColors.blue,
  },
  secondaryButton: {
    backgroundColor: appColors.lightGray,
    borderWidth: 1,
    borderColor: appColors.border,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: appColors.darkGray,
    fontSize: 16,
    fontWeight: '600',
  },
   
});




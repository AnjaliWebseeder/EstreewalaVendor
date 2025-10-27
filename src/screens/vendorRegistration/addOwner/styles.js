// styles.js - Add these styles to your existing styles
import { StyleSheet } from 'react-native';
import appColors from '../../../theme/appColors';

export const styles = StyleSheet.create({
 mainContainer: {
    flex: 1,
    backgroundColor: appColors.white,
  },
    container: {
    padding: 16,
  },
  uploadSection: {
    // marginTop: 20,
  },
  uploadLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.text,
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: appColors.lightText,
    marginBottom: 12,
    lineHeight: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: appColors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: appColors.lightBackground,
  },
  uploadButtonError: {
    borderColor: appColors.error,
    backgroundColor: appColors.errorLight,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.secondary,
    marginLeft: 8,
  },
  uploadButtonTextError: {
    color: appColors.error,
  },
  uploadOptionsContainer: {
    gap: 12,
  },
  uploadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.white,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: appColors.border,
  },
  uploadOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.text,
    marginLeft: 12,
    flex: 1,
  },
  cancelOption: {
    alignItems: 'center',
    padding: 12,
  },
  cancelOptionText: {
    fontSize: 14,
    color: appColors.gray,
    fontWeight: '500',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: appColors.lightBackground,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: appColors.border,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: appColors.text,
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: appColors.gray,
  },
  removeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: appColors.error,
    marginTop: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.infoLight,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  infoText: {
    fontSize: 12,
    color: appColors.info,
    marginLeft: 8,
    flex: 1,
  },
});
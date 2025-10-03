import { StyleSheet } from 'react-native';

import appColors from '../../../theme/appColors';
import fonts from '../../../theme/appFonts';
import { windowHeight , windowWidth} from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
   
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingVertical:2
  },
  section: {
    marginBottom: 20,
    marginTop:windowHeight(10)
  },
  sectionTitle: {
    fontSize: 16,
    color: appColors.font,
    fontFamily: fonts.InterSemiBold,
    marginBottom: windowHeight(10),
  },
  sectionCard: {
    backgroundColor: appColors.menuCard,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1.8,
    paddingBottom: windowHeight(19),
    borderColor:appColors.darkBlue,
    borderWidth:1
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor:appColors.darkBlue,
    borderBottomWidth:1
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter-SemiBold',
  },
  input: {
    fontSize: 14,
    color: '#333',
   fontFamily:fonts.InterRegular,
    paddingVertical: 4,
    width: windowWidth(200),
    borderBottomWidth: 1,
    borderBottomColor:appColors.darkBlue,
    backgroundColor: appColors.menuCard, // fixes underline issue on Android
  },
  inputFocused: {
    borderBottomColor: appColors.darkBlue,
  },
  editButton: {
    padding: 6,
  },
  editText: {
    color: appColors.font,
    fontFamily:fonts.InterMedium
  },
  saveButton: {
    backgroundColor:appColors.font,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: windowHeight(14),
  },
  saveButtonText: {
    color: appColors.white,
   fontFamily:fonts.InterMedium,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
  },
});

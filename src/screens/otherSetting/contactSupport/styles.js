import { StyleSheet } from 'react-native';
import { windowHeight } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:  appColors.background},
  content: {
    paddingHorizontal: 20,
    paddingTop:windowHeight(18)
  },
  helpTitle: {
    fontSize: 17,
    fontFamily:fonts.InterSemiBold,
    color: appColors.font,
    marginBottom: 5,
   
  },
  helpSubText: {
    fontSize: 14,
     fontFamily:fonts.InterRegular,
    color:appColors.font,
    marginBottom: 23,
    lineHeight:25
  },
  cardBox: {
    backgroundColor: appColors.menuCard,
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 16,
    borderColor:appColors.secondary,
    borderWidth:1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
   fontFamily:fonts.InterRegular,
    color: appColors.font,
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 14,
    fontFamily: fonts.InterRegular,
    color:appColors.s,
    marginLeft: 28,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    
  },
  messageLabel: {
    fontSize: 14,
fontFamily:fonts.InterRegular,
    marginLeft: 6,
    color: '#000',
  },
  textInput: {
    borderColor:appColors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: appColors.menuCard,
    padding: 12,
fontFamily:fonts.InterRegular,
    fontSize: 14,
    minHeight: windowHeight(100),
    color:appColors.black
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color:appColors.font,
    marginTop: 4,
fontFamily:fonts.InterRegular,
  },
  submitBtn: {
    backgroundColor: appColors.secondary,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color:appColors.white,
  fontFamily:fonts.InterMedium,
    fontSize: 16,
  },
  disabledBtn: {
  backgroundColor: '#cccccc',
},
});

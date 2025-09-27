import { StyleSheet } from "react-native";
import { fontSizes } from '../../../theme/appConstant';
import { windowHeight } from '../../../theme/appConstant';
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: windowHeight(50),
    paddingTop:windowHeight(20)
  },
  faqContainer: {
    marginBottom: windowHeight(10),
  },
  faqItem: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: appColors.menuCard,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: fontSizes.FONT17,
    color:appColors.font,
    fontFamily:fonts.InterMedium,
    marginRight: 12,
    lineHeight:windowHeight(21)
  },
  faqAnswer: {
    padding: 13,
    paddingTop: 7,
  

     borderTopWidth: 1,
    borderStyle: 'dashed',
    borderTopColor: appColors.secondary,
    marginHorizontal:10
 
  },
  faqAnswerText: {
    fontSize: fontSizes.FONT15,
    lineHeight: 22,
    color:appColors.font,
    fontFamily:fonts.InterRegular,
    marginHorizontal:windowHeight(-10)
  },
  helpSection: {
    backgroundColor:appColors.menuCard,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 17,
    color:appColors.font,
    marginBottom: 8,
     fontFamily:fonts.InterMedium,
  },
  helpText: {
    fontSize: 15,
    color:appColors.font,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  helpButton: {
    backgroundColor: appColors.font,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  helpButtonText: {
    fontSize: 14,
    color: appColors.white,
fontFamily:fonts.InterMedium,
  },
});
import { Dimensions, StyleSheet } from "react-native";
import appColors from "../../../theme/appColors"
import fonts from "../../../theme/appFonts"
import { windowHeight } from "../../../theme/appConstant";
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  backgroundAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  confetti: {
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: windowHeight(30),
    zIndex: 1,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#cfecd3ff",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#a0ebacff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  lottieAnimation: {
    width: 80,
    height: 80,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: fonts.InterBold,
  },
  successSubtitle: {
    fontSize: 16,
    color: appColors.subTitle,
    textAlign: 'center',
    fontFamily: fonts.InterMedium,
  },
  detailsCard: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: appColors.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  amountRow: {
    borderBottomWidth: 0,
    paddingTop: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: appColors.subTitle,
    marginLeft: 12,
    marginRight: 'auto',
    fontFamily: fonts.InterMedium,
  },
  detailValue: {
    fontSize: 14,
    color: appColors.font,
    fontWeight: '600',
    fontFamily: fonts.InterSemiBold,
  },
  amountValue: {
    fontSize: 18,
    color: '#2e7d32',
    fontWeight: '700',
    fontFamily: fonts.InterBold,
  },
  progressContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
  },
  progressText: {
    fontSize: 12,
    color: appColors.subTitle,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: fonts.InterRegular,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: appColors.blue,
    borderRadius: 2,
  },
  nextSteps: {
    width: '100%',
    marginBottom: 32,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.font,
    marginBottom: 16,
    fontFamily: fonts.InterSemiBold,
  },
  stepsList: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: appColors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    color: appColors.subTitle,
    flex: 1,
    fontFamily: fonts.InterRegular,
  },
});


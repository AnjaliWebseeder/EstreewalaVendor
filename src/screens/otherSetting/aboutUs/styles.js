import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { StyleSheet } from 'react-native';
import { fontSizes } from '../../../theme/appConstant';
import { windowHeight } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  header: {
    backgroundColor: appColors.background,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    elevation: 0,
  },
  content: {
    paddingBottom: 40,
    paddingTop:windowHeight(20)
  },
  // Section Styles
  section: {
    paddingHorizontal: 24,
    marginBottom: windowHeight(3),
  
  },
  sectionTitle: {
    fontSize: 18,
    color: appColors.font,
    marginBottom: 2,
    fontFamily: fonts.InterMedium,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 24,
    color: appColors.subTitle,
    marginBottom: 16,
    fontFamily:fonts.InterRegular
  },
  
  // Stats Section
  statsSection: {
    backgroundColor:appColors.menuCard,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: windowHeight(10),
    paddingBottom:14,
  
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '48%',
    backgroundColor: appColors.card,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
      borderColor:appColors.secondary,
    borderWidth:1
  },
  statNumber: {
    fontSize: fontSizes.FONT19,
    fontWeight: '800',
    color: appColors.blue,
    marginBottom: 4,
    fontFamily:fonts.InterSemiBold
  },
  statLabel: {
    fontSize: 14,
    color: appColors.font,
    fontFamily:fonts.InterRegular,
    textAlign: 'center',
  },
  
  // Values Section
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: windowHeight(6),
  },
  valueCard: {
    width: '48%',
    backgroundColor: appColors.menuCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
      borderColor:appColors.secondary,
    borderWidth:1,
    marginBottom:15
  },
  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueTitle: {
    fontSize: 16,
    fontFamily:fonts.InterMedium,
    color: appColors.font,
    marginBottom: 3,
    fontFamily:fonts.InterMedium
  },
  valueText: {
    fontSize: 12,
    color: appColors.subTitle,
    lineHeight: 20,
    fontFamily:fonts.InterRegular
  },
  
  // Team Section
 
  // CTA Section
  ctaContainer: {
    backgroundColor: appColors.blue,
    padding: 22,
    alignItems: 'center',
    marginTop: 20,
  },
  ctaIcon: {
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 18,
    color: appColors.white,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily:fonts.InterMedium
  },
  ctaText: {
    fontSize: 14,
    color: appColors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
   fontFamily:fonts.InterMedium,
    lineHeight:windowHeight(20)
  },
  ctaButton: {
    backgroundColor: appColors.white,
    borderRadius: 24,
    paddingVertical:  10,
    paddingHorizontal: 32,
  },
  ctaButtonText: {
    fontSize: 14,
    color: appColors.font,
 fontFamily:fonts.InterMedium
  },
});
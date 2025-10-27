// styles.js
import { StyleSheet, Dimensions, Platform } from "react-native";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";
import { windowHeight } from "../../theme/appConstant";

const { width, height } = Dimensions.get('window');

// Static Colors
const COLORS = {
  primary: '#2563EB',
  secondary: '#1E40AF',
  white: '#FFFFFF',
  black: '#000000',
  background: '#F8FAFD',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  border: '#E5E7EB',
  cardBackground: '#FFFFFF',
  promo: '#2D3748',
  gold: '#FFD700',
  green: '#48BB78',
  orange: '#ED8936',
  lightBlue: '#F0F7FF',
  lightOrange: '#FEEBC8',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: appColors.secondary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
   
  },
   backButton: {
    backgroundColor: appColors.white,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: windowHeight(19),
    width: windowHeight(19),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:12
  },
  plansSection: {
  paddingTop: 10,

},
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    marginLeft: 8,
    fontFamily:fonts.PoppinsSemiBold
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    fontFamily:fonts.InterRegular
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: appColors.promo,
    borderRadius: 20,
  },
  skipButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
    fontFamily:fonts.InterSemiBold
  },
  promoBanner: {
    marginHorizontal: 20,
    marginTop: -7,
    backgroundColor: COLORS.promo,
    borderRadius: 12,
    padding: 16,
    paddingHorizontal:10,
    paddingVertical:12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  promoContent: {
    flexDirection: 'row',
    flex: 1,
  },
  promoText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  promoBadge: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  promoBadgeText: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: '800',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  durationSection: {
    marginBottom:windowHeight(15),
  
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
    fontFamily:fonts.InterSemiBold,
      paddingHorizontal: 20,
  },
  durationScrollContent: {
    paddingRight: 20,
    paddingBottom:1
  },
  durationCard: {
    backgroundColor:appColors.background,
    padding: 16,
    marginLeft:14,
    borderRadius: 12,
    minWidth: 140,
    borderWidth: 1,
    borderColor: appColors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  
  selectedDurationCard: {
    borderColor: appColors.secondary,
    backgroundColor: "#e9edf1ff",
  },
  durationBadge: {
    backgroundColor:appColors.secondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  durationBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
    fontFamily:fonts.InterSemiBold
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
    
  },
  selectedDurationLabel: {
    color: appColors.secondary,
    fontWeight: '700',
  },
  durationDays: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
    fontFamily:fonts.InterRegular
  },
  freeDaysTag: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    
  },
  freeDaysText: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: '600',
    fontFamily:fonts.InterRegular
  },
  savingTag: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  savingTagText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
    fontFamily:fonts.InterRegular
  },
  plansGrid: {
    paddingHorizontal: 15,
  },
  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 10,
    paddingHorizontal:15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectedPlanCard: {
    borderColor:appColors.secondary,
  backgroundColor: "#e9edf1ff",
  },
  popularPlanCard: {
    borderColor: COLORS.gold,
  },
  popularRibbon: {
    position: 'absolute',
    top: -6,
    right: 20,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    zIndex: 1,
  },
  popularRibbonText: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: '800',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  planIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  planTitle: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
    fontFamily:fonts.InterSemiBold
  },
  planDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
    fontFamily:fonts.InterRegular
  },
  selectedIndicator: {
    padding: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  priceMain: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop:windowHeight(5)
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  priceInfo: {
    alignItems: 'flex-end',
    marginTop:3
  },
  monthlyEquivalent: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.green,
  },
  savingBadge: {
    backgroundColor: COLORS.lightOrange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  savingText: {
    color: '#744210',
    fontSize: 12,
    fontWeight: '600',
  },
  featuresList: {
    marginBottom:8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: 8,
    fontWeight: '500',
    fontFamily:fonts.InterRegular
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:windowHeight(8)
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: appColors.secondary,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  detailsButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily:fonts.InterSemiBold
  },
  selectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.border,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  selectedButton: {
    backgroundColor: appColors.secondary,
  },
  selectButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedButtonText: {
    color: COLORS.white,
  },
  faqSection: {
    // padding: 20,
  },
  faqGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  faqCard: {
    left:20,
    // marginHorizontal:10,
     width: '44%',
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    margin: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 8,
    marginBottom: 4,
    lineHeight:20
  },
  faqAnswer: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  footerSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedPlanText: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.font,
  },
  selectedPlanDuration: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily:fonts.InterRegular
  },
  finalPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: appColors.secondary,
  },
  subscribeButton: {
    backgroundColor: appColors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: appColors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  subscribeButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    marginRight: 8,
    fontFamily:fonts.InterSemiBold
  },
  toast: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  toastText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
  },
  // Add these styles to your existing styles.js

// Modal Styles
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'flex-end',
},
modalContent: {
  backgroundColor: COLORS.white,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  maxHeight: '100%',
  padding: 10,
  paddingHorizontal:15,
  paddingTop:16
},
modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 10,
  borderBottomWidth: 1,
  borderBottomColor: COLORS.border,
  paddingBottom: 16,
},
modalTitleContainer: {
  flex: 1,
  marginRight: 16,
},
modalTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: COLORS.textPrimary,
  marginBottom: 2,
  fontFamily:fonts.InterSemiBold
},
modalDescription: {
  fontSize: 13,
  color: COLORS.textSecondary,
  fontWeight: '500',
    fontFamily:fonts.InterRegular
},
closeButton: {
  padding: 4,
},
modalScroll: {
  maxHeight: 400,
},
pricingTable: {
  backgroundColor: COLORS.background,
  borderRadius: 12,
  padding: 10,
  marginBottom: 10,
},
pricingTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: COLORS.textPrimary,
  marginBottom: 0,
  fontFamily:fonts.InterRegular
},
pricingRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: COLORS.border,
},
pricingLeft: {
  flex: 1,
},
pricingRight: {
  alignItems: 'flex-end',
},
pricingDuration: {
  fontSize: 14,
  fontWeight: '600',
  color: COLORS.textPrimary,
  marginBottom: 4,
},
pricingDays: {
  fontSize: 14,
  color: COLORS.textSecondary,
  fontFamily:fonts.InterRegular
},
pricingAmount: {
  fontSize: 16,
  fontWeight: '700',
  color: appColors.secondary,
  marginBottom: 4,
},
freeText: {
  fontSize: 12,
  color: COLORS.success,
  fontWeight: '600',
},
featuresSection: {
  marginBottom: 5,
},
featuresTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: COLORS.textPrimary,
  marginBottom: 10,
},
modalFeatureItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  padding: 12,
  backgroundColor: COLORS.background,
  borderRadius: 8,
},
modalFeatureText: {
  fontSize: 14,
  color: COLORS.textPrimary,
  marginLeft: 12,
  fontWeight: '500',
  flex: 1,
},
benefitsSection: {
  marginBottom: 0,
},
benefitsTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: COLORS.textPrimary,
  marginBottom: 10,
},
benefitItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  padding: 12,
  backgroundColor: COLORS.lightBlue,
  borderRadius: 8,
},
benefitText: {
  fontSize: 14,
  color: COLORS.textPrimary,
  marginLeft: 12,
  fontWeight: '500',
},
modalActions: {
  flexDirection: 'row',
  gap: 12,
  marginTop: 6,
},
secondaryButton: {
  flex: 1,
  paddingVertical:10,
  borderWidth: 1,
  borderColor: appColors.secondary,
  borderRadius: 12,
  alignItems: 'center',
},
secondaryButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: COLORS.textSecondary,
  fontFamily:fonts.InterSemiBold
},
primaryButton: {
  flex: 2,
   paddingVertical:10,
  backgroundColor: appColors.secondary,
  borderRadius: 12,
  alignItems: 'center',
},
primaryButtonText: {
  fontSize: 14,
  fontWeight: '600',
  color: COLORS.white,
},
paymentAmount: {
  fontSize: 19,
  fontWeight: '800',
  color: appColors.secondary,
  marginTop: 4,
},
paymentPlan: {
  fontSize: 16,
  color: COLORS.textSecondary,
  marginBottom: 12,
  fontWeight: '500',
},
paymentMethodsList: {
  maxHeight: 300,
  marginBottom: 20,
},
paymentMethodCard: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 8,
  backgroundColor: COLORS.white,
  borderWidth: 1,
  borderColor: COLORS.border,
  borderRadius: 12,
  marginBottom: 12,
},
paymentIcon: {
  width: 30,
  height: 30,
  backgroundColor: COLORS.lightBlue,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 16,
},
paymentMethodName: {
  flex: 1,
  fontSize: 16,
  fontWeight: '600',
  color: COLORS.textPrimary,
},
cancelButton: {
  paddingHorizontal: 16,
  paddingVertical:13,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: COLORS.border,
  borderRadius: 12,
  backgroundColor: appColors.secondary,
},
cancelButtonText: {
  color: COLORS.white,
  fontSize: 14,
  fontWeight: '600',
  fontFamily:fonts.InterSemiBold
},
// Add these styles to your existing styles.js

paymentModalContent: {
  maxHeight: '80%',
  width: '100%',
},

paymentPlanInfo: {
  alignItems: 'center',
  paddingVertical: 0,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E7EB',
  paddingBottom:10
},

paymentPlanName: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1F2937',
  marginTop: 10,
},

paymentDuration: {
  fontSize: 16,
  color: '#6B7280',
  marginTop: 4,
},

paymentValidity: {
  fontSize: 14,
  color: '#9CA3AF',
  marginTop: 2,
},
// Add to your styles.js
paymentPriceBreakdown: {
  fontSize: 12,
  color: '#6B7280',
  marginTop: 4,
  textAlign: 'center',
},

paymentFeatures: {
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#E5E7EB',
},

paymentFeature: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
},

paymentFeatureText: {
  fontSize: 14,
  color: '#374151',
  marginLeft: 8,
},

razorpayButton: {
  backgroundColor: appColors.secondary,
  padding: 16,
  borderRadius: 12,
  marginVertical: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},

razorpayButtonContent: {
  flexDirection: 'row',
  alignItems: 'center',
},

razorpayButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
  marginLeft: 8,
},

securityText: {
  textAlign: 'center',
  fontSize: 12,
  color: '#6B7280',
  marginTop: 10,
},

// For View Details Modal
modalTitleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},

pricingTable: {
  marginBottom: 20,
},

pricingRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#F3F4F6',
},

pricingLeft: {
  flex: 1,
},

pricingRight: {
  alignItems: 'flex-end',
},

pricingDuration: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1F2937',
},

pricingDays: {
  fontSize: 14,
  color: '#6B7280',
  marginTop: 2,
},

pricingAmount: {
  fontSize: 18,
  fontWeight: 'bold',
  color: appColors.secondary,
},

featuresSection: {
  marginBottom: 20,
},

benefitsSection: {
  marginBottom: 20,
},

benefitItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
},

benefitText: {
  fontSize: 14,
  color: '#374151',
  marginLeft: 8,
},
});
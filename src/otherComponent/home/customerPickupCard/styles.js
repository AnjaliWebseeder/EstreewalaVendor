import appColors from "../../../theme/appColors";
import { windowHeight, windowWidth } from "../../../theme/appConstant";
import fonts from "../../../theme/appFonts";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: windowHeight(4),
    paddingBottom: 20,
  },
  separator: {
    height: 12,
  },
  card: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 0,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor:appColors.secondary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: windowHeight(4),
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontFamily: fonts.InterSemiBold,
    color: appColors.subTitle,
    marginBottom: 2,
  },
  daysLeftBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  daysLeftText: {
    fontSize: 12,
    fontFamily: fonts.InterSemiBold,
    fontWeight:"700"
  },
  stageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  stageText: {
    fontSize: 12,
    fontFamily: fonts.InterSemiBold,
    marginLeft: 6,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#4361ee" + '20',
  },
  profileInfo: {
    flex: 1,
  },
  name: { 
    fontSize: 16, 
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
    marginBottom: 2,
  },
  location: { 
    fontSize: 13, 
    color: "#6c757d",
    fontFamily: fonts.InterMedium,
  },
  acceptedTime: {
    fontSize: 11,
    color: "#adb5bd",
    fontFamily: fonts.InterRegular,
    marginTop: 2,
  },
  
  timeline: {
    marginBottom: windowHeight(11),
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
    marginTop: 2,
    alignItems:"center",
    justifyContent:"center"
  },
  innerDot:{
  width: 10.5,
    height: 10.5,
    borderRadius: 20,
    backgroundColor:appColors.white
  },
  dotCompleted: {
    backgroundColor: "#1CA75A",
    
  },
  dotCurrent: {
    backgroundColor: "#4361ee",
    borderWidth: 3,
    borderColor: "#4361ee" + '40',
  },
  dotUpcoming: {
    backgroundColor: "#CF3131",
  },
  timelineConnector: {
    width: 2,
    height: 20,
    backgroundColor: appColors.border,
    marginLeft: 7,
    marginTop:-12
  },
 
  timelineLabel: {
    fontSize: 13,
    fontFamily: fonts.InterSemiBold,
    color: appColors.font,
    marginBottom: 2,
  },
  timelineValue: {
    fontSize: 12,
    fontFamily: fonts.InterMedium,
    color: "#6c757d",
  },
  timelineTime: {
    fontSize: 11,
    fontFamily: fonts.InterRegular,
    color: "#adb5bd",
  },
  addressSection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  addressText: {
    flex: 1,
    marginLeft: 10,
  },
  addressLabel: {
    fontSize: 12,
    fontFamily: fonts.InterSemiBold,
    color: appColors.subTitle,
    marginBottom: 2,
  },
  addressValue: {
    fontSize: 13,
    fontFamily: fonts.InterMedium,
    color: appColors.font,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    gap: 8,
    width: '100%', // Full width
    marginBottom: 8,
  },
  rejectButton: {
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: "#f72585",
    width:"50%"
  },
  rejectButtonText: {
    color: "#f72585",
    fontFamily: fonts.InterSemiBold,
    fontSize: 14,
      fontWeight:"800"
  },
  acceptButton: {
    backgroundColor: "#10C761",
    width:"50%"
  },
  acceptButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
    fontSize: 14,
    fontWeight:"800"
  },
  readyButton: {
    backgroundColor: "#f8961e",
  },
  readyButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
    fontSize: 14,
     fontWeight:"800"
  },
  deliveryButton: {
    backgroundColor: appColors.secondary,
  },
  deliveryButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
    fontSize: 14,
  },
  completeButton: {
    backgroundColor: "#4cc9f0",
  },
  completeButtonText: {
    color: appColors.white,
    fontFamily: fonts.InterSemiBold,
    fontSize: 14,
  },
  progressActions: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontFamily: fonts.InterBold,
    color: "#6c757d",
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 13,
    fontFamily: fonts.InterRegular,
    color: "#adb5bd",
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  // Add these styles to your existing styles
paymentBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 8,
  marginBottom: 8,

 
},
paymentBadgeText: {
  fontSize: 12,
  fontFamily: fonts.InterSemiBold,
  marginLeft: 6,
},
paymentButton: {
  backgroundColor: appColors.blue, // Orange color for payment
},
paymentButtonText: {
  color: appColors.white,
  fontFamily: fonts.InterSemiBold,
  fontSize: 14,
  marginLeft: 8,
},
totalAmount: {
  fontSize: 16,
  fontFamily: fonts.InterBold,
  color: appColors.primary,
  marginTop: 4,
},
disabledButton: {
  opacity: 0.6,
},
});
import { StyleSheet, Dimensions } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { fontSizes, windowHeight } from "../../../theme/appConstant";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: appColors.secondary,
    paddingHorizontal: 20,
    paddingBottom: windowHeight(20),
    paddingTop: windowHeight(9),
    overflow: 'hidden',
    position: 'relative',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  waveBackground: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    height: 200,
    backgroundColor: appColors.secondary,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    opacity: 0.8,
  },
  headerContent: {
    paddingTop: windowHeight(15),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  locationIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationTextContainer: {
    flex: 1,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: appColors.white,
    fontWeight: '600',
    fontSize: fontSizes.FONT18,
    fontFamily: fonts.InterSemiBold,
    marginRight: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
    width: 30,
    height: 30,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF4757',
    width: 15,
    height: 15,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: appColors.secondary,
  },
  badgeText: {
    color: appColors.white,
    fontSize: 7,
    fontFamily: fonts.InterBold,
    lineHeight: 14,
    bottom: 2,
    fontWeight: "bold"
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
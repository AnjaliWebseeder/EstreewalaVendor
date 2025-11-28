const { StyleSheet } = require("react-native");
import appColors from "../../theme/appColors"
import { windowHeight } from "../../theme/appConstant";

export const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: appColors.background 
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: appColors.background,
    paddingHorizontal: 8, // Reduced padding to fit four tabs
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    paddingTop: windowHeight(3)
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
    minWidth: 80, // Added minWidth for better touch area
  },
  activeTab: {
    backgroundColor: appColors.background,
  },
  tabText: {
    fontSize: 11, // Slightly reduced to fit four tabs
    fontWeight: '600',
    color: '#6c757d',
    textAlign: 'center',
  },
  activeTabText: {
    color: appColors.secondary,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '60%', // Adjusted for four tabs
    height: 3,
    backgroundColor: appColors.secondary,
    borderRadius: 2,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 5, // Adjusted position for four tabs
    backgroundColor: appColors.secondary,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: appColors.white,
    fontSize: 9, // Slightly smaller
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: appColors.background,
    marginHorizontal: windowHeight(6),
    marginTop: windowHeight(10)
  },
  contentContainerStyle: {
    paddingBottom: windowHeight(80)
  }
});
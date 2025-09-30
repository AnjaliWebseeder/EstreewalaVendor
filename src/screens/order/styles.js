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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    paddingTop:windowHeight(3)
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: appColors.background,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  activeTabText: {
    color:appColors.secondary,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
    height: 3,
    backgroundColor: appColors.secondary,
    borderRadius: 2,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 20,
    backgroundColor: appColors.secondary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: appColors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: appColors.background,
    marginHorizontal:windowHeight(6),
    marginTop:windowHeight(10)
  },
  contentContainerStyle:{
    paddingBottom:windowHeight(80)
  }
});
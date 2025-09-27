import { Dimensions, StyleSheet } from "react-native";
import { fontSizes } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

const {width} = Dimensions.get('window')

export const styles = StyleSheet.create({
   // Modal Overlay for Filter
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

     // Filter Dropdown
  filterDropdown: {
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 20,
    width: width * 0.8,
    shadowColor: appColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  filterTitle: {
    fontSize: fontSizes.FONT18,
    fontWeight: '700',
    color: appColors.title,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily:fonts.InterSemiBold
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: appColors.border,
    marginBottom:10
  },
  filterItemActive: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
  },
  filterTextActive: {
    color: appColors.secondary,
    fontFamily:fonts.InterSemiBold,
    fontSize:fontSizes.FONT16HALF,
    fontWeight:"600"
  },
  filterText:{
    color: appColors.font,
    fontFamily:fonts.InterSemiBold,
    fontSize:fontSizes.FONT16HALF,
    fontWeight:"600",
    marginHorizontal:10
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  closeFilterButton: {
    marginTop: 6,
    backgroundColor: appColors.lightBlue,
    borderRadius: 8,
    alignItems: 'center',
    padding:10
  },
  closeFilterText: {
    fontSize: fontSizes.FONT15,
    fontWeight: '600',
    color: appColors.white,
    fontFamily:fonts.InterRegular
  },

})
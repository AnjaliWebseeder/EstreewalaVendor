import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

export const styles = StyleSheet.create({
     headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: appColors.font,
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
    fontFamily:fonts.InterSemiBold,
    marginHorizontal:5
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    marginLeft: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 0.6,
    borderColor: '#e6e9ee',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },

})
import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { windowHeight } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  marginBottom:windowHeight(5)
  },
  switchLabel: {
    fontWeight: fonts.PoppinsSemiBold,
    color: appColors.text,
    fontWeight:"500"

  },
});

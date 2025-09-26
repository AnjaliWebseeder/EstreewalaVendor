import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";

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
    marginVertical: 10,
  },
  switchLabel: {
    fontWeight: '500',
    color: appColors.text,
  },
});

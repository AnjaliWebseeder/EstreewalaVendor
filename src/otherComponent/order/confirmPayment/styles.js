import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: "600",
    color:appColors.font,
    marginBottom: 5,
    fontFamily:fonts.InterSemiBold
  },
  amountValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
    fontFamily:fonts.InterSemiBold
  },
  qrImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  scanText: {
    fontSize: 14,
    color:appColors.subTitle,
    marginTop: 5,
    fontFamily:fonts.InterRegular
  },
  confirmButton: {
    backgroundColor: appColors.blue, // green
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color:appColors.white,
    fontSize: 16,
    fontWeight: "600",
    fontFamily:fonts.InterSemiBold
  },
});
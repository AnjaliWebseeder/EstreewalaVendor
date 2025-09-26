import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  // Main form container
  mainContainerStyle: {
    marginHorizontal: 20,
  },
  // Input forgot password
  forgot: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: appColors.secondary,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 13,
    fontWeight:"700"
  },

  // Footer text
  footerText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: appColors.black,
    fontFamily:fonts.InterRegular,
    fontWeight:"700"
  },
  link: {
    color: appColors.secondary,
    fontFamily: fonts.PoppinsSemiBold,
     textDecorationLine:"underline"
  },


});

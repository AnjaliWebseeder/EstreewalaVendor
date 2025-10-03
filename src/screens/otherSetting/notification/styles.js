import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { windowHeight } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColors.background,
  },
  listContainer: {
    paddingHorizontal: 16,
    marginTop:windowHeight(20)
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appColors.menuCard,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily:fonts.InterMedium,
    color:appColors.font,
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    fontFamily:fonts.InterRegular,
    color:appColors.subTitle,
  },
});
import { StyleSheet } from "react-native";
import appColors from '../../theme/appColors'
import { windowHeight, fontSizes, windowWidth } from "../../theme/appConstant";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({ 
   // Banner as background
  bannerContainer: {
    width: windowWidth(480),
    height: windowHeight(290),
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  // Back button
  backButton: {
    position: "absolute",
    top: windowHeight(15),
    left: windowHeight(15),
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: windowHeight(25),
    width: windowHeight(25),
    alignItems: "center",
    justifyContent: "center",
  },

 
  // Overlay content on banner
  mainStyle: {
    alignItems: "center",
    marginTop:windowHeight(20)
  },

  // Banner text
  title: {
    fontSize: 20,
    fontFamily: fonts.InterSemiBold,
    marginBottom: 6,
    color: appColors.title,
    textAlign: "center",
    fontWeight: "700",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
   line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc", // light gray line
    marginHorizontal: 10,
  },
  subText: {
    fontSize: 12,
    color: appColors.subTitle,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: fonts.PoppinsRegular,
  },
  
})
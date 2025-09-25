import { StyleSheet } from "react-native";
import appColors from '../../theme/appColors'
import { windowHeight, fontSizes, windowWidth } from "../../theme/appConstant";
import fonts from "../../theme/appFonts";

export const styles = StyleSheet.create({ 
   // Banner as background
  bannerContainer: {
    width: windowWidth(480),
    height: windowHeight(240),
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
  },

  // Banner text
  title: {
    fontSize: 20,
    fontFamily: fonts.PoppinsSemiBold,
    marginBottom: 6,
    color: appColors.title,
    textAlign: "center",
    fontWeight: "700",
  },
  subText: {
    fontSize: 12,
    color: appColors.subTitle,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: fonts.PoppinsRegular,
  },
    // Vendor / profile picker
  vendorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: appColors.border,
    borderRadius: 10,
    padding: 8,
    width: '100%',
    marginVertical: windowHeight(4),
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: "center",
    paddingVertical:7
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  vendorText: {
    fontSize: fontSizes.FONT17,
    color: appColors.black,
    fontFamily: fonts.PoppinsMedium,
    fontWeight: "500",
  },
})
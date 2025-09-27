import { StyleSheet, Platform } from "react-native";
import appColors from "../../theme/appColors";
import fonts from "../../theme/appFonts";
import { windowHeight } from "../../theme/appConstant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background, // ultra-light bg
  },
main:{
  backgroundColor:appColors.secondary,
  marginBottom:windowHeight(20)
},
profileSection:{
  paddingTop:windowHeight(10)
},
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: windowHeight(80),
  },

  // ===== MENU CARD =====
  menuCard: {
    backgroundColor: appColors.menuCard,
    borderRadius: 16,
    marginBottom: 14,
    overflow: "hidden",
    borderColor:appColors.border,
    borderWidth:0.2,
    paddingVertical:5,
    ...Platform.select({
      ios: {
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
    }),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12.3,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor:appColors.border,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  menuText: {
    fontSize: 14.5,
    color: appColors.font,
    fontFamily: fonts.InterMedium,
    flex: 1,
  },
  chevron: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: appColors.subTitle,
    transform: [{ rotate: "45deg" }],
    marginRight:10
  },
  // ================= PHOTO STYLES =================
profileImage: {
  width: 100,
  height: 100,
  borderRadius: 50, // circular image
  borderColor: appColors.border,
  resizeMode: "cover",
  alignSelf: "center",
  marginBottom: 10,
},
userName: {
  fontSize: 18,
  fontWeight: "600",
  color: appColors.white,
  textAlign: "center",
},

userEmail: {
  fontSize: 14,
  color: "#888",
  textAlign: "center",
  marginBottom:windowHeight(18)
},


  // ===== SIGN OUT =====


});

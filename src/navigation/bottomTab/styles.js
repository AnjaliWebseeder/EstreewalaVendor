const { StyleSheet } = require("react-native");
import appColors from "../../theme/appColors";
import { windowHeight } from "../../theme/appConstant";

export const styles = StyleSheet.create({
  minimalTabBar: {
  backgroundColor: appColors.white,
  height: 78,
  position: "absolute",
  bottom: 0, // make sure it sits at the bottom
  left: 0,
  right: 0,

  // ✅ Shadow for iOS
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: -4, // push shadow upward since tab bar is at bottom
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,

  // ✅ Shadow for Android
  elevation: 10,

  // Layout
  paddingHorizontal: 5,
  alignItems: "center",
  justifyContent: "center",
  borderTopWidth: 0,
  borderTopColor: "transparent",
  zIndex: 10, // ensure it's above other views
},

  minimalTabButton: {
      height: '60%',
      marginTop:-8,
        paddingVertical: 2, 

  },
  minimalIconContainer: {
    padding: 15,
    borderRadius: 10,
    height:20,
width:20,
alignItems:"center",
justifyContent:"center",

    
  },
  minimalIconContainerActive: {
    backgroundColor: "#153a67",
 
  },
  minimalTabLabel: {
     fontSize: 10,
  letterSpacing: 0.2,
  lineHeight: 14,  // makes sure letters like "e" render fully
  color: appColors.subTitle,
  textAlign:"center",
  height:windowHeight(14)
    
  },
});
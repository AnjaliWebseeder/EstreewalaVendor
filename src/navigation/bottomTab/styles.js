const { StyleSheet } = require("react-native");
import appColors from "../../theme/appColors";
import { windowHeight } from "../../theme/appConstant";

export const styles = StyleSheet.create({
  minimalTabBar: {
    backgroundColor: appColors.white,
    height: 78,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
    paddingHorizontal: 5,
    alignItems:"center",
    justifyContent:"center",
     borderTopWidth: 0,
     borderTopColor:appColors.secondary,
     borderTopWidth:1


  },
  minimalTabButton: {
      height: '60%',
      marginTop:-8,
        paddingVertical: 2, 

  },
  minimalIconContainer: {
    padding: 18,
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
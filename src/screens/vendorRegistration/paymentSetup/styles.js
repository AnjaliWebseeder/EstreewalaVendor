import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import { windowHeight } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
  mainContainer:{
     flex: 1, backgroundColor: appColors.white
  },
  container: {
    flex: 1,
    padding: 20,
  },
  centerView:{
    height:"80%",justifyContent:"center"
  },
 qrWrapper: {
  alignSelf: 'center',
  width: 220,
  height: 220,
  // remove borderRadius to show full image
  backgroundColor: '#f4f4f4',
   alignItems: 'center',
   justifyContent: 'center',
  marginVertical: 30,
  position: 'relative',
  overflow: 'hidden', // ensures image does not spill out
  borderRadius:20
},
qrImage: {
  width: "100%",
  height: "200%",
  resizeMode: 'cover', // make image cover the full wrapper
   borderRadius:20
},

  editButton: {
    position: 'absolute',
    bottom: 20,
    right: windowHeight(40),
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: appColors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 3,
  },
  footer: {
    padding: 20,
   
  }
});

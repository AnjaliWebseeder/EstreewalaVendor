import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import fonts from "../../../theme/appFonts";
import { fontSizes } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: fontSizes.FONT19,
    color:appColors.title,
    marginBottom: 4,
    fontFamily:fonts.InterSemiBold,
    fontWeight:"600"
  },
  subtitle: {
    fontSize: 14,
    color:appColors.title,
    marginBottom: 5,
    fontWeight:"700",
    fontFamily:fonts.InterSemiBold
  },
  subtitleStyle:{
     fontSize: fontSizes.FONT14,
    color:appColors.lightText,
    marginBottom: 30,
    fontFamily:fonts.InterRegular
  },
  qrWrapper: {
    alignSelf: 'center',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  qrImage: {
    width: '70%',
    height: '70%',
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    right: 15,
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
   
  },
  button: {
    backgroundColor: appColors.secondary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});

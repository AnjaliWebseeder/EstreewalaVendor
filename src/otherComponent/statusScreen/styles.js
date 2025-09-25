import { StyleSheet } from 'react-native';
import appColors from '../../theme/appColors'
import { windowHeight, windowWidth } from "../../theme/appConstant";
import fonts from "../../theme/appFonts";
export const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:appColors.white
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  bannerContainer: {
      width: windowWidth(480),
      height: windowHeight(400),
      justifyContent: "flex-end",
      paddingHorizontal: 20,
      paddingBottom: 8,
    },
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
   mainStyle: {
    alignItems: "center",
  },

  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
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
    lineHeight:windowHeight(18)
  }
});

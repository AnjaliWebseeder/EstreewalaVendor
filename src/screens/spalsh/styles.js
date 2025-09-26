import { StyleSheet } from 'react-native';
import appColors from '../../theme/appColors'
import fonts from '../../theme/appFonts';
import { windowHeight } from '../../theme/appConstant';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#45466a", 
    overflow: 'hidden',
  },
  iconWrapper: {
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  welcome: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 3,
    marginBottom: 5,
  fontFamily:fonts.InterSemiBold
  },
  appName: {
    fontSize: 32,
    color: appColors.white,
    letterSpacing: 2,
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontFamily:fonts.InterBold
  },
  bubble: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#5d5e86',
  },
  bubble1: {
    width: 100,
    height: 100,
    top: '20%',
    left: '10%',
  },
  bubble2: {
    width: 70,
    height: 70,
    top: '60%',
    right: '15%',
  },
  bubble3: {
    width: 50,
    height: 50,
    top: '40%',
    right: '25%',
  },
  image:{
    height:windowHeight(120),
    width:windowHeight(120),
    resizeMode:"contain"
  }
});
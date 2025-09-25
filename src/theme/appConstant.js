import {Dimensions, PixelRatio, Platform} from 'react-native';

export let SCREEN_HEIGHT = Dimensions.get('window').height;
export let SCREEN_WIDTH = Dimensions.get('window').width;

export const IsIOS = Platform.OS == 'ios';
export const IsIPAD = Platform.isPad;

export const IsHaveNotch = SCREEN_HEIGHT > 750;

export const Isiphone12promax = Platform.OS == 'ios' && SCREEN_HEIGHT > 2778;


export const windowHeight = height => {
  let tempHeight = SCREEN_HEIGHT * parseFloat(height / 667);
  return PixelRatio.roundToNearestPixel(tempHeight);
};

export const windowWidth = width => {
  let tempWidth = SCREEN_WIDTH * parseFloat(width / 480);
  return PixelRatio.roundToNearestPixel(tempWidth);
};

export const fontSizes = {
  FONT6: windowWidth(6),
  FONT7: windowWidth(7),
  FONT8: windowWidth(8),
  FONT9: windowWidth(9),
  FONT10: windowWidth(10),
  FONT11: windowWidth(11),
  FONT12: windowWidth(12),
  FONT13: windowWidth(13),
  FONT14: windowWidth(14),
  FONT14HALF: windowWidth(14.5),
  FONT15: windowWidth(15),
  FONT15HALF: windowWidth(15.5),
  FONT16: windowWidth(16),
  FONT16HALF: windowWidth(16.5),
  FONT17: windowWidth(17),
  FONT17HALF: windowWidth(17.5),
  FONT18: windowWidth(18),
  FONT18HALF: windowWidth(18.5),
  FONT19: windowWidth(19),
  FONT19HALF: windowWidth(19.5),
  FONT20: windowWidth(20),
  FONT20HALF: windowWidth(20.5),
  FONT21: windowWidth(21),
  FONT21HALF: windowWidth(21.5),
  FONT22: windowWidth(22),
  FONT23: windowWidth(23),
  FONT24: windowWidth(24),
  FONT25: windowWidth(25),
  FONT25HALF: windowWidth(25.5),
  FONT26: windowWidth(26),
  FONT26HALF: windowWidth(26.5),
  FONT27: windowWidth(27),
  FONT28: windowWidth(28),
  FONT29: windowWidth(29),
  FONT30: windowWidth(30),
  FONT32: windowWidth(32),
  FONT34: windowWidth(34),
  FONT36: windowWidth(36),
  FONT38: windowWidth(38),
  FONT40: windowWidth(40),
  FONT42: windowWidth(42),
  FONT46: windowWidth(46),
  FONT48: windowWidth(48),
  FONT50: windowWidth(50),
  FONT62: windowWidth(62),
  FONT64: windowWidth(64),
  FONT60: windowWidth(60),
  FONT65: windowWidth(65),
  FONT70: windowWidth(70),
  FONT80: windowWidth(80),
  FONT90: windowWidth(90),
  FONT100: windowWidth(100),
};

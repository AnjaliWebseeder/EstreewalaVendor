import { StyleSheet } from "react-native";
import { windowHeight } from "../../../theme/appConstant";
import appColors from "../../../theme/appColors";

export const styles = StyleSheet.create({
     grid: {
    marginTop: windowHeight(17),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    minHeight: 120,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // elevation for Android
    elevation: 3,
    backgroundColor:appColors.white
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  }
})
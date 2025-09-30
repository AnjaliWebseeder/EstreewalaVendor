
import { Text, StyleSheet } from "react-native";
import appColors from "../../theme/appColors"
import fonts from "../../theme/appFonts"
import { fontSizes, windowHeight } from "../../theme/appConstant";

const Title = ({ children, size = 16, color = appColors.font, align = "left" }) => {
  return (
    <Text style={[styles.title, { fontSize: size, color, textAlign: align }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginVertical: 0,
    marginHorizontal:5,
    fontFamily:fonts.InterSemiBold,
    fontSize:fontSizes.FONT20,
    paddingVertical:4,
    marginBottom:windowHeight(4)
  },
});

export default Title;

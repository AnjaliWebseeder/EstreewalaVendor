
import { Text, StyleSheet } from "react-native";
import appColors from "../../theme/appColors"
import fonts from "../../theme/appFonts"
import { fontSizes } from "../../theme/appConstant";

const Title = ({ children, size = 18, color = appColors.font, align = "left" }) => {
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
    fontSize:fontSizes.FONT22
  },
});

export default Title;

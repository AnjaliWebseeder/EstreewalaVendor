import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from "./styles";
import { BackIcon } from '../../assets/Icons/backIcon';
import CustomButton from '../../components/button';
import { windowHeight } from '../../theme/appConstant';
import { SafeAreaView } from 'react-native-safe-area-context';

const StatusScreen = ({ route, navigation }) => {
  const {
    title,
    message,
    buttonText,
    onButtonPress,
    onBackPress,
  } = route.params || {};

  return (
   <SafeAreaView style={styles.main}>
     <ImageBackground
      source={require('../../assets/images/register.png')}
      style={styles.bannerContainer}
      resizeMode="cover"
    >
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress || (() => navigation.goBack())}
      >
        <BackIcon />
      </TouchableOpacity>

      <View style={styles.mainStyle}>
        <Image
          source={require('../../assets/images/sucess.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subText}>{message}</Text>
      </View>
        <CustomButton buttonContainerStyle={{  marginHorizontal:windowHeight(10)}} title={buttonText} onPress={onButtonPress} />

    
    </ImageBackground>
   </SafeAreaView>
  );
};

export default StatusScreen;

import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { styles } from "./styles"
import { LocationIcon } from "../../../assets/Icons/location"
import { NotificationIcon } from "../../../assets/Icons/notification"
import { ProfileIcon } from "../../../assets/Icons/profile"
import appColors from '../../../theme/appColors'
import { useEffect, useRef } from 'react'
import { VendorContext } from '../../../utils/context/vendorContext'
import { useContext } from 'react'

export default function Header(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const {userLocation} = useContext(VendorContext)
  useEffect(() => {
    // Animate header elements on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.headerContainer}>
      {/* Background Wave */}
      <View style={styles.waveBackground} />
      
      {/* Main Header Content */}
      <Animated.View 
        style={[
          styles.headerContent,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Top Row - Location & Icons */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.locationContainer} activeOpacity={0.7}>
            <View style={styles.locationIconWrapper}>
              <LocationIcon color={appColors.white} />
            </View>
               {/* {userLocation?.address &&  <View style={styles.locationTextContainer}> */}
              <View style={styles.locationTextContainer}>
              <View style={styles.locationRow}>
                <Text style={styles.locationText}>{userLocation?.address}</Text>
              </View>
            </View> 
            {/* } */}
           
          </TouchableOpacity>

          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => props.navigation.navigate("Notification")} style={styles.iconButton} activeOpacity={0.7}>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
              <NotificationIcon color={appColors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => props.navigation.navigate("Main", {screen:"Account"})} style={styles.iconButton} activeOpacity={0.7}>
              <View style={styles.profileImage}>
                <ProfileIcon color={appColors.secondary} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

   

     
      </Animated.View>
    </View>
  )
}
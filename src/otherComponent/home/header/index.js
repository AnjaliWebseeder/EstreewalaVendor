import { View, Text, TouchableOpacity } from 'react-native'
import {styles} from "./styles"
import {LocationIcon} from "../../../assets/Icons/location"
import {NotificationIcon} from "../../../assets/Icons/notification"
import {ProfileIcon} from "../../../assets/Icons/profile"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Header() {
  return (
    <View style={styles.headerRow}>
          <View style={styles.location}>
           <LocationIcon/>
            <Text style={styles.locationText}> Chinchwad, India</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#7f8c9a" />
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIconBtn}>
         <NotificationIcon/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
           <ProfileIcon/>
            </TouchableOpacity>
          </View>
        </View>
  )
}
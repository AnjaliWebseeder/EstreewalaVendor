import { View, Text,TouchableOpacity } from 'react-native'
import React, { useContext  } from 'react';
import {styles} from './styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { VendorContext } from '../../../utils/context/vendorContext';
import appColors from '../../../theme/appColors';
import { windowWidth } from '../../../theme/appConstant';

export default function VendorOwnerCard({owner,navigation}) {

     const {
deleteOwner
         } = useContext(VendorContext);
  return (
  <View key={owner.id} style={styles.ownerCard}>
    {/* Header Row */}
    <View style={styles.ownerHeader}>
      <Text style={styles.cardTitle}>Owner Details</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddOwner', { owner })}
          style={styles.editBtn}
        >
          <Icon name="create-outline" size={14} color={"green"} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteOwner(owner.id)}
          style={styles.deleteBtn}
        >
          <Icon name="trash-outline" size={14} color={appColors.error}/>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Owner Info */}
   <View style={styles.main}>
     <View style={{flexDirection:"row",justifyContent:"space-between"}}>
         <View style={styles.infoRow}>
      <Icon name="person-outline" size={16} color={appColors.secondary} style={styles.infoIcon} />
      
      <View>
        <Text style={styles.infoText}>First Name </Text>
        <Text style={styles.detail}>{owner.firstName}</Text>
      </View>
    </View>

    <View style={[styles.infoRow,{paddingHorizontal:8,width:windowWidth(180)}]}>
      <Icon name="person-outline" size={16} color={appColors.secondary} style={styles.infoIcon} />
      <View>
        <Text style={styles.infoText}>Last Name</Text>
        <Text style={styles.detail}>{owner.lastName}</Text>
      </View>
    </View>
     </View>
    

    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <View style={styles.infoRow}>
      
      <Icon name="call-outline" size={14} color={appColors.secondary} style={styles.infoIcon} />
     
      <View>
        <Text style={styles.infoText}>Mobile No </Text>
        <Text style={styles.detail}>{owner.primary}</Text>
      </View>
    </View>

    <View style={[styles.infoRow,{paddingHorizontal:8,width:windowWidth(180)}]}>
      <Icon name="logo-whatsapp" size={16} color="#25D366" style={styles.infoIcon} />
      <View>
          <Text style={styles.infoText}>Whatsapp Number</Text>
          <Text style={styles.detail}> {owner.whatsapp}</Text>
      </View>
     
    </View>
    </View>
   </View>

   
  </View>
  )
}
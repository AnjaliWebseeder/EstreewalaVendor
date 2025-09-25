import React, { useContext , useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { VendorContext } from '../../utils/context/vendorContext';
import {styles} from './styles'
import Header from '../../components/header';
import InputField from '../../components/InputField'
import TitleSubtitle  from '../../otherComponent/vendorRegistration/titleSubTitle'
import appColors from '../../theme/appColors';
import CustomButton from '../../components/button'
import VendorOwnCard from '../../otherComponent/vendorRegistration/vendorOwnerCard'

const VendorRegistration = () => {
  const navigation = useNavigation();
  const {
    branches,
    services,
    selectedServiceIds,
    toggleServiceCategory,
    deliveryOption,
    setDeliveryOption,
    owners
  } = useContext(VendorContext);

  const [businessName, setBusinessName] = useState('');
  

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Vendor Registration" onBack={() => navigation.goBack()} />
           <View style={styles.details}>
             <Image source={require('../../assets/images/todoList.png')} style={styles.image} />
             <View style={styles.main}>
              <Text style={styles.detail}>Details</Text>
              <Text style={styles.title}>Vendor Details</Text>
             </View>
          </View>
            <View style={styles.mainContainer}>
              <TitleSubtitle style={{marginBottom:2}} title={"Business Details"} subtitle={"Help us get to know you better by sharing details about your business. We’d love t support you!"}/>
          <Text style={styles.textStyle}>*Required fields</Text>
    
         <InputField label="Business Name*" value={businessName} onChangeText={setBusinessName} placeholder="Enter Business Name" />
          <TitleSubtitle  title={"Owner Details"} subtitle={"Add the owner details to help streamline management and ensure everything runs smoothly."}/>
          <TouchableOpacity onPress={() => navigation.navigate('AddOwner')} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}> <Text style={styles.add}>+ </Text>Please Add Owner</Text>
          </TouchableOpacity>


{owners.map((owner) => (
    <VendorOwnCard navigation={navigation}  owner={owner}/>
))}

          <TouchableOpacity onPress={() => navigation.navigate('AddBranch')} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}> <Text style={styles.add}>+ </Text>Please Add Branch</Text>
          </TouchableOpacity>
            <TitleSubtitle style={{marginBottom:2}} title={"Services Provided"} subtitle={"Choose Services You Provide"}/>
        <Text style={styles.detailStyle}>Select one or more services you offer to customers*</Text>
        {services.map((s) => {
  const isSelected = selectedServiceIds.includes(s.id);
  return (
    <TouchableOpacity
      key={s.id}
      style={[styles.serviceRow, isSelected]}
      onPress={() => toggleServiceCategory(s.id)} // toggles multiple
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name={isSelected ? 'checkbox-outline' : 'square-outline'}
          size={18}
          color={isSelected ? appColors.primary : '#999'}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.name}>{s.name}</Text>
      </View>
    </TouchableOpacity>
  );
})}
         <TouchableOpacity style={[styles.buttonStyle,{marginTop:10,marginBottom:0}]}>
            <Text style={styles.buttonTextStyle}> <Text style={styles.add}>+ </Text>Set Price</Text>
          </TouchableOpacity>
        <Text style={[styles.detailStyle,{marginTop:10}]}>Select how you will serve your customers*</Text>
        

        {["Delivery", "Pickup", "Pickup & Delivery"].map((option) => (
  <TouchableOpacity
    key={option}
    style={styles.serviceRow}
    onPress={() => setDeliveryOption(option)}
  >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
     
    <Icon
      name={deliveryOption === option ? "radio-button-on" : "radio-button-off"}
     size={16}
      color={deliveryOption === option ? appColors.primary : "#999"}
          style={{ marginRight: 8 }}
    />
     <Text style={styles.name}>{option}</Text>

      </View>
   
  </TouchableOpacity>
))}
      </View>

      </ScrollView>
        <CustomButton buttonContainerStyle={styles.buttonContainerStyle} title="Submit" onPress={() => {}} />
    </View>
  );
};

export default VendorRegistration;



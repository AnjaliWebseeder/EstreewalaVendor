import React, { useContext, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import Header from '../../../components/header';
import InputField from '../../../components/InputField';
import { VendorContext } from '../../../utils/context/vendorContext';
import { styles } from './styles';
import CustomButton from '../../../components/button';
import appColors from '../../../theme/appColors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddOwner({ navigation, route }) {
  const { addOwner, editOwner } = useContext(VendorContext);
  const editingOwner = route.params?.owner; // if editing
  const [firstName, setFirstName] = useState(editingOwner?.firstName || '');
  const [lastName, setLastName] = useState(editingOwner?.lastName || '');
  const [primary, setPrimary] = useState(editingOwner?.primary || '');
  const [whatsapp, setWhatsapp] = useState(editingOwner?.whatsapp || '');
  const [sameAsPrimary, setSameAsPrimary] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!primary.trim() || primary.length !== 10) newErrors.primary = 'Enter valid primary number';
    if (!sameAsPrimary && (!whatsapp.trim() || whatsapp.length !== 10))
      newErrors.whatsapp = 'Enter valid whatsapp number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const newOwner = { firstName, lastName, primary, whatsapp: sameAsPrimary ? primary : whatsapp };
    if (editingOwner) {
      editOwner(editingOwner.id, newOwner);
    } else {
      addOwner(newOwner);
    }
    navigation.goBack();
  };

  return (
   <SafeAreaView style={styles.mainContainer}>
     <View style={styles.mainContainer}>
      <Header title="Add New Owner" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
       <InputField
  label="First Name*"
  value={firstName}
  onChangeText={(t) => {
    setFirstName(t);
    if (errors.firstName) setErrors({ ...errors, firstName: null });
  }}
  placeholder="e.g. Nick"
  error={errors.firstName}
/>

<InputField
  label="Last Name*"
  value={lastName}
  onChangeText={(t) => {
    setLastName(t);
    if (errors.lastName) setErrors({ ...errors, lastName: null });
  }}
  placeholder="e.g. Rao"
  error={errors.lastName}
/>

<InputField
  label="Primary Number*"
  value={primary}
  keyboardType="phone-pad"
  onChangeText={(t) => {
    setPrimary(t);
    if (errors.primary) setErrors({ ...errors, primary: null });
  }}
  placeholder="e.g. 1234567890"
  error={errors.primary}
/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: '500' }}>Same as primary number</Text>
          <Switch value={sameAsPrimary} onValueChange={(val) => { setSameAsPrimary(val); if (val) setWhatsapp(primary); }} 
             trackColor={{ false: appColors.border, true: appColors.blue }}
        thumbColor={sameAsPrimary ? appColors.white : appColors.white}
            
            />
        </View>

      {!sameAsPrimary && (
  <InputField
    label="Whatsapp Number*"
    value={whatsapp}
    keyboardType="phone-pad"
    onChangeText={(t) => {
      setWhatsapp(t);
      if (errors.whatsapp) setErrors({ ...errors, whatsapp: null });
    }}
    placeholder="e.g. 1234567890"
    error={errors.whatsapp}
/>
)}
      </View>

      <CustomButton title={editingOwner ? 'Update' : 'Submit'} onPress={submit} />
    </View>
   </SafeAreaView>
  );
}

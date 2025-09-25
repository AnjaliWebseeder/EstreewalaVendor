import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Switch , ScrollView } from 'react-native';
import Header from '../../../components/header';
import InputField from '../../../components/InputField';
import { VendorContext } from '../../../utils/context/vendorContext';
import { styles } from './styles';
import CustomButton from '../../../components/button';
import Feather from 'react-native-vector-icons/Feather';
import appColors from '../../../theme/appColors';

export default function AddBranch({ navigation }) {
  const { addBranch } = useContext(VendorContext);

  const [branchName, setBranchName] = useState('');
  const [contactFirst, setContactFirst] = useState('');
  const [contactLast, setContactLast] = useState('');
  const [primary, setPrimary] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPrimary, setSameAsPrimary] = useState(false);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!branchName.trim()) newErrors.branchName = 'Branch name is required';
    if (!contactFirst.trim()) newErrors.contactFirst = 'First name is required';
    if (!contactLast.trim()) newErrors.contactLast = 'Last name is required';
    if (!primary.trim() || primary.length !== 10) newErrors.primary = 'Enter valid primary number';
    if (!sameAsPrimary && (!whatsapp.trim() || whatsapp.length !== 10))
      newErrors.whatsapp = 'Enter valid whatsapp number';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!pincode.trim() || pincode.length !== 6) newErrors.pincode = 'Enter valid pincode';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    addBranch({
      branchName,
      contactFirst,
      contactLast,
      primary,
      whatsapp: sameAsPrimary ? primary : whatsapp,
      address,
      pincode,
      state,
      city,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <Header title="Add New Branch Details" onBack={() => navigation.goBack()} />
        <ScrollView>
 <View style={styles.container}>

        <InputField
          label="Branch Name*"
          value={branchName}
          onChangeText={(t) => { setBranchName(t); if (errors.branchName) setErrors({ ...errors, branchName: null }); }}
          placeholder="e.g. QuickClean Laundry"
          error={errors.branchName}
        />

        <InputField
          label="Contact Person’s First Name*"
          value={contactFirst}
          onChangeText={(t) => { setContactFirst(t); if (errors.contactFirst) setErrors({ ...errors, contactFirst: null }); }}
          placeholder="e.g. Raj"
          error={errors.contactFirst}
        />

        <InputField
          label="Contact Person’s Last Name*"
          value={contactLast}
          onChangeText={(t) => { setContactLast(t); if (errors.contactLast) setErrors({ ...errors, contactLast: null }); }}
          placeholder="e.g. Patel"
          error={errors.contactLast}
        />

        <InputField
          label="Primary Number*"
          value={primary}
          keyboardType="phone-pad"
          onChangeText={(t) => { setPrimary(t); if (errors.primary) setErrors({ ...errors, primary: null }); }}
          placeholder="e.g. 9876543210"
          error={errors.primary}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Same as primary number</Text>
          <Switch
            value={sameAsPrimary}
            onValueChange={(val) => { setSameAsPrimary(val); if (val) setWhatsapp(primary); }}
            trackColor={{ false: appColors.border, true: appColors.blue }}
            thumbColor={appColors.white}
          />
        </View>

        {!sameAsPrimary && (
          <InputField
            label="Whatsapp Number*"
            value={whatsapp}
            keyboardType="phone-pad"
            onChangeText={(t) => { setWhatsapp(t); if (errors.whatsapp) setErrors({ ...errors, whatsapp: null }); }}
            placeholder="e.g. 9876543210"
            error={errors.whatsapp}
          />
        )}

        <InputField
          label="Address*"
          value={address}
          onChangeText={(t) => { setAddress(t); if (errors.address) setErrors({ ...errors, address: null }); }}
          placeholder="e.g. Abc Nagar 1st Block, 17-A Abc Society"
          error={errors.address}
        />

        <TouchableOpacity style={styles.locationRow}>
          <Feather name="map-pin" size={18} color={appColors.blue} />
          <Text style={styles.locationText}>Change Current Location</Text>
        </TouchableOpacity>

        <InputField
          label="Pincode*"
          value={pincode}
          keyboardType="numeric"
          onChangeText={(t) => { setPincode(t); if (errors.pincode) setErrors({ ...errors, pincode: null }); }}
          placeholder="e.g. 380001"
          error={errors.pincode}
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <InputField
              label="State*"
              value={state}
              onChangeText={(t) => { setState(t); if (errors.state) setErrors({ ...errors, state: null }); }}
              placeholder="e.g. Gujarat"
              error={errors.state}
            />
          </View>
          <View style={{ flex: 1 }}>
            <InputField
              label="City*"
              value={city}
              onChangeText={(t) => { setCity(t); if (errors.city) setErrors({ ...errors, city: null }); }}
              placeholder="e.g. Ahmedabad"
              error={errors.city}
            />
          </View>
        </View>
      </View>
        </ScrollView>
     

      <CustomButton title="Submit" onPress={submit} />
    </View>
  );
}

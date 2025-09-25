import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Header from '../../../components/header'
import { VendorContext } from '../../../utils/context/vendorContext';
import InputField from '../../../components/InputField'

export default function CreateCoupon({ navigation }) {
const { addCoupon } = useContext(VendorContext);
const [code, setCode] = useState('');
const [discountType, setDiscountType] = useState('percentage');
const [discountValue, setDiscountValue] = useState('');
const [description, setDescription] = useState('');


const submit = () => {
if (!code || !discountValue) return Alert.alert('Validation', 'Enter code and discount value');
addCoupon({ code, discountType, discountValue, description });
Alert.alert('Saved', 'Coupon created');
navigation.goBack();
};


return (
<View style={{ flex: 1 }}>
<Header title="Create Coupon" onBack={() => navigation.goBack()} />
<View style={styles.container}>
<InputField label="Coupon Code" value={code} onChangeText={setCode} placeholder="e.g. SAVE20" />
<InputField label="Discount Type" value={discountType} onChangeText={setDiscountType} placeholder="percentage / flat" />
<InputField label="Discount Value" value={discountValue} onChangeText={setDiscountValue} placeholder="e.g. 20" keyboardType="numeric" />
<InputField label="Description" value={description} onChangeText={setDescription} placeholder="Optional" />


<TouchableOpacity style={styles.button} onPress={submit}>
<Text style={styles.buttonText}>Save Coupon</Text>
</TouchableOpacity>
</View>
</View>
);
}


const styles = StyleSheet.create({
container: { padding: 16 },
button: { marginTop: 20, backgroundColor: '#4b4bff', padding: 14, borderRadius: 12, alignItems: 'center' },
buttonText: { color: '#fff', fontWeight: '700' },
});
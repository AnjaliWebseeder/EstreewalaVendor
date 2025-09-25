import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Header from '../../../components/header'
import { VendorContext } from '../../../utils/context/vendorContext';
import {styles} from './styles'

export default function SelectLocation({ navigation }) {
const { setLocation } = useContext(VendorContext);
const [mockLocation] = useState({ coords: { latitude: 19.07, longitude: 72.87 }, address: 'Mumbai, Maharashtra, India' });


const select = () => {
setLocation(mockLocation);
Alert.alert('Location', 'Location selected.');
navigation.goBack();
};


return (
<View style={{ flex: 1 }}>
<Header title="Select Location" onBack={() => navigation.goBack()} />
<View style={styles.container}>
<View style={styles.mapPlaceholder}>
<Text style={{ color: '#777' }}>Map placeholder (plug react-native-maps here)</Text>
</View>


<Text style={{ marginTop: 12 }}>{mockLocation.address}</Text>


<TouchableOpacity style={styles.button} onPress={select}>
<Text style={styles.buttonText}>Select</Text>
</TouchableOpacity>
</View>
</View>
);
}



import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../../../components/header'
import { VendorContext } from '../../../utils/context/vendorContext';
import ServiceItem from '../../../otherComponent/vendorRegistration/serviceItem'
import {styles} from './styles'

export default function SetPrice({ navigation }) {
const { services, selectedServiceIds, priceMap, setItemPrice } = useContext(VendorContext);
const categories = useMemo(() => services.filter((s) => selectedServiceIds.includes(s.id)), [services, selectedServiceIds]);


const onSavePrices = () => {
Alert.alert('Success', 'You have set the prices Successfully.');
navigation.navigate('VendorRegistration');
};


return (
<View style={{ flex: 1 }}>
<Header title="Set Price" onBack={() => navigation.goBack()} />
<ScrollView contentContainerStyle={{ padding: 16 }}>
{categories.length === 0 ? (
<Text style={{ color: '#777' }}>No services selected. Go back and select services.</Text>
) : (
categories.map((cat) => (
<View key={cat.id} style={{ marginBottom: 18 }}>
<Text style={{ fontWeight: '700', marginBottom: 8 }}>{cat.name}</Text>
{cat.items.map((it) => (
<ServiceItem key={it.id} item={it} price={priceMap[it.id]} onChangePrice={(id, p) => setItemPrice(id, Number(p || 0))} />
))}
</View>
))
)}


<TouchableOpacity style={styles.createCoupon} onPress={() => navigation.navigate('CreateCoupon')}>
<Text style={{ color: '#4b4bff' }}>+ Create Coupon</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.button} onPress={onSavePrices}>
<Text style={styles.buttonText}>Set Prices</Text>
</TouchableOpacity>


<View style={{ height: 40 }} />
</ScrollView>
</View>
);
}



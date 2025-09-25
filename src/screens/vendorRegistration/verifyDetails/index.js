import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../../components/header'
import { VendorContext } from '../../../utils/context/vendorContext';
import { styles } from './styles';


export default function VerifyDetails({ navigation }) {
const { owners, branches, services, selectedServiceIds, location } = useContext(VendorContext);


return (
<View style={{ flex: 1 }}>
<Header title="Verify Details" onBack={() => navigation.goBack()} />
<ScrollView contentContainerStyle={{ padding: 16 }}>
<Text style={styles.title}>Owners</Text>
{owners.map((o, i) => (
<View key={i} style={styles.card}><Text style={{ fontWeight: '600' }}>{o.firstName} {o.lastName}</Text><Text>{o.phone}</Text></View>
))}


<Text style={styles.title}>Branches</Text>
{branches.map((b, i) => (
<View key={i} style={styles.card}><Text style={{ fontWeight: '600' }}>{b.branchName}</Text><Text>{b.address}</Text></View>
))}


<Text style={styles.title}>Services</Text>
{services.filter(s => selectedServiceIds.includes(s.id)).map(s => (
<View key={s.id} style={styles.card}><Text style={{ fontWeight: '600' }}>{s.name}</Text></View>
))}


<Text style={styles.title}>Location</Text>
<View style={styles.card}><Text>{location ? location.address : 'Not selected'}</Text></View>


<TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={() => navigation.navigate('PaymentSetup')}>
<Text style={styles.buttonText}>Next</Text>
</TouchableOpacity>
</ScrollView>
</View>
);
}



import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../../../components/header'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

export default function PaymentSetup({ navigation }) {
const submit = () => navigation.navigate('VendorRegistration');


return (
<View style={{ flex: 1 }}>
<Header title="Payment Setup" onBack={() => navigation.goBack()} />
<View style={styles.container}>
<View style={styles.qrPlaceholder}>
<Icon name="qrcode-scan" size={80} color="#999" />
<Text style={{ color: '#777', marginTop: 12 }}>Upload/scan QR for payments</Text>
</View>
<TouchableOpacity style={styles.button} onPress={submit}>
<Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>
</View>
</View>
);
}



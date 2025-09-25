import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function ServiceItem({ item, price, onChangePrice }) {
return (
<View style={styles.container}>
<View style={styles.info}>
<Text style={styles.name}>{item.name}</Text>
</View>
<View style={styles.controls}>
<TextInput
value={price === undefined ? '' : String(price)}
onChangeText={(t) => onChangePrice(item.id, t.replace(/[^0-9]/g, ''))}
placeholder={`${item.price}`}
keyboardType="numeric"
style={styles.priceInput}
/>
</View>
</View>
);
}


const styles = StyleSheet.create({
container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
info: { flex: 1 },
name: { fontSize: 16 },
controls: { width: 120, alignItems: 'flex-end' },
priceInput: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10, width: 110, textAlign: 'right' },
});
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from "./styles"

export default function StatusCard() {
    const StatCard = ({ bgColor, iconName, iconLib: IconLib, statusText, title, count }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={styles.cardRow}>
        <View style={styles.iconCircle}>
          {IconLib ? (
            <IconLib name={iconName} size={18} color="#fff" />
          ) : (
            <MaterialCommunityIcons name={iconName} size={18} color="#fff" />
          )}
        </View>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.countText}>{count}</Text>
    </TouchableOpacity>
  );
};

  return (
     <View style={styles.grid}>
          <StatCard
            bgColor="#4f8af2"
            iconName="calendar-clock"
            iconLib={MaterialCommunityIcons}
            statusText="Pending"
            title="Customer Pickup"
            count="8"
          />
          <StatCard
            bgColor="#ff6161"
            iconName="truck-delivery"
            iconLib={MaterialCommunityIcons}
            statusText="Pending"
            title="Customer Delivery"
            count="2"
          />
          <StatCard
            bgColor="#8b3df3"
            iconName="truck-check"
            iconLib={MaterialCommunityIcons}
            statusText="Completed"
            title="Completed Pickups"
            count="25"
          />
          <StatCard
            bgColor="#2f9b63"
            iconName="check-circle"
            iconLib={MaterialCommunityIcons}
            statusText="Completed"
            title="Completed Delivery"
            count="20"
          />
        </View>
  )
}
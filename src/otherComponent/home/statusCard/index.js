import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from "./styles"

export default function StatusCard() {
  const StatCard = ({ bgColor, iconName, iconLib: IconLib, statusText, title, count, gradient }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} style={[styles.card, { backgroundColor: bgColor }]}>
        {/* Background Gradient Effect */}
        <View style={[styles.gradientOverlay, { backgroundColor: gradient }]} />
        
        {/* Content */}
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              {IconLib ? (
                <IconLib name={iconName} size={20} color="#fff" />
              ) : (
                <MaterialCommunityIcons name={iconName} size={20} color="#fff" />
              )}
            </View>
            <View style={[styles.statusBadge, { backgroundColor: `${bgColor}20` }]}>
              <Text style={styles.statusText}>{statusText}</Text>
            </View>
          </View>

          <Text style={styles.cardTitle}>{title}</Text>
          
          <View style={styles.countSection}>
            <Text style={styles.countText}>{count}</Text>
            <View style={styles.arrowCircle}>
              <MaterialCommunityIcons name="arrow-right" size={16} color="#fff" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.grid}>
      <StatCard
        bgColor="#4f8af2"
        gradient="rgba(79, 138, 242, 0.1)"
        iconName="calendar-clock"
        iconLib={MaterialCommunityIcons}
        statusText="Pending"
        title="Customer Pickup"
        count="8"
      />
      <StatCard
        bgColor="#ff6161"
        gradient="rgba(255, 97, 97, 0.1)"
        iconName="truck-delivery"
        iconLib={MaterialCommunityIcons}
        statusText="Pending"
        title="Customer Delivery"
        count="2"
      />
      <StatCard
        bgColor="#8b3df3"
        gradient="rgba(139, 61, 243, 0.1)"
        iconName="truck-check"
        iconLib={MaterialCommunityIcons}
        statusText="Completed"
        title="Completed Pickups"
        count="25"
      />
      <StatCard
        bgColor="#2f9b63"
        gradient="rgba(47, 155, 99, 0.1)"
        iconName="check-circle"
        iconLib={MaterialCommunityIcons}
        statusText="Completed"
        title="Completed Delivery"
        count="20"
      />
    </View>
  );
}
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {styles} from "./styles"

const CustomerPickupCard = () => {
  return (
    <View style={styles.card}>
      {/* Estimated Delivery */}
      <View style={styles.deliveryBox}>
        <Icon name="calendar" size={18} color="#4a4a4a" />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.deliveryLabel}>Estimated Delivery Date & Time:</Text>
          <Text style={styles.deliveryValue}>2025-09-16   11.00 Am - 01.00 Pm</Text>
        </View>
      </View>

      {/* Profile */}
      <View style={styles.profileRow}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Niti Patel</Text>
          <Text style={styles.location}>Maharashtra, India</Text>
        </View>
      </View>

      {/* Pickup Date & Time */}
      <View style={styles.pickupRow}>
        <View style={styles.pickupBox}>
          <Icon name="calendar-month-outline" size={18} color="#4a4a4a" />
          <Text style={styles.pickupText}>2025-09-13</Text>
        </View>
        <View style={styles.pickupBox}>
          <Icon name="clock-outline" size={18} color="#4a4a4a" />
          <Text style={styles.pickupText}>09:00 AM - 11:00 AM</Text>
        </View>
      </View>

      {/* Pickup & Destination */}
      <View style={styles.routeBox}>
        <View style={styles.routeItem}>
          <View style={styles.greenDot} />
          <Text style={styles.routeLabel}>Pickup Point</Text>
          <Text style={styles.routeValue}>Sopanbagh Colony, Chinchwad Nagar</Text>
        </View>

        <View style={styles.routeLine} />

        <View style={styles.routeItem}>
          <View style={styles.redDot} />
          <Text style={styles.routeLabel}>Destination</Text>
          <Text style={styles.routeValue}>Nikmar Society, Aundh Gaon</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.rejectBtn}>
          <Text style={styles.rejectText}>REJECT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn}>
          <Text style={styles.acceptText}>ACCEPT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default CustomerPickupCard;

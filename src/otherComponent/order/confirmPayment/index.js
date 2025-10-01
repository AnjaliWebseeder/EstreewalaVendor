import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Header from "../../../components/header"
import {styles} from "./styles"

export default function ConfirmPayment({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <Header title={"Confirm Payment"} onBack={() => navigation.goBack()} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.amountLabel}>Total Amount</Text>
        <Text style={styles.amountValue}>₹ 35.82</Text>

        <Image
          source={require("../../../assets/images/qrcode.png")} 
          style={styles.qrImage}
        />

        <Text style={styles.scanText}>Scan QR code to pay securely</Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity onPress={() => navigation.navigate("PaymentSuccess")} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
}



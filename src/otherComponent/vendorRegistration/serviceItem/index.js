// otherComponent/vendorRegistration/serviceItem.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function ServiceItem({ item, quantity, onIncrease, onDecrease }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
      <Image source={item.image} style={{ width: 40, height: 40, marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600" }}>{item.name}</Text>
        <Text style={{ color: "#666" }}>Dry Wash</Text>
        <Text style={{ color: "#4b4bff" }}>₹{item.price}.00 each</Text>
      </View>

      {/* Decrement */}
      <TouchableOpacity
        onPress={onDecrease}
        style={{
          width: 28,
          height: 28,
          borderWidth: 1,
          borderColor: "#aaa",
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>-</Text>
      </TouchableOpacity>

      {/* Quantity */}
      <Text style={{ marginHorizontal: 8 }}>{quantity}</Text>

      {/* Increment */}
      <TouchableOpacity
        onPress={onIncrease}
        style={{
          width: 28,
          height: 28,
          borderWidth: 1,
          borderColor: "#aaa",
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}

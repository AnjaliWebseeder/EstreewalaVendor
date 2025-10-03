import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Header from "../../../components/header";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import appColors from "../../../theme/appColors";

const LoginSecurityScreen = ({ navigation }) => {
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
 
    username: "Kristi",
    email: "kristi@gmail.com",
    contactNo: "9876543210",
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false); // fake loader

  // Validate input
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.contactNo && !/^[0-9]{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save changes (UI only)
  const handleProfileUpdate = () => {
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditMode(null);
    }, 1000); // fake delay
  };

  const fields = [
    { label: "Name", key: "username", value: formData.username },
    { label: "Email", key: "email", value: formData.email },
    { label: "Contact", key: "contactNo", value: formData.contactNo },
  ];

  return (
    <SafeAreaView style={[styles.container,{paddingHorizontal:0}]}>
    <View style={styles.container}>
      <Header title={"Login & Security"} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.sectionCard}>
            {fields.map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.fieldContainer,
                  { borderBottomWidth: editMode === item.key ? 0 : 1 },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>{item.label}</Text>

                  {item.editable === false ? (
                    <Text style={styles.fieldValue}>{item.value}</Text> // static, non-editable
                  ) : editMode === item.key ? (
                    <>
                      <TextInput
                        style={[styles.input, focusedField === item.key && styles.inputFocused]}
                        onFocus={() => setFocusedField(item.key)}
                        onBlur={() => setFocusedField(null)}
                        onChangeText={(text) =>
                          setFormData({ ...formData, [item.key]: text })
                        }
                        value={formData[item.key]}
                        autoCapitalize={item.key === "email" ? "none" : "words"}
                        underlineColorAndroid="transparent"
                        keyboardType={item.key === "contactNo" ? "numeric" : "default"}
                      />
                      {errors[item.key] && (
                        <Text style={styles.errorText}>{errors[item.key]}</Text>
                      )}
                    </>
                  ) : (
                    <Text style={styles.fieldValue}>{item.value}</Text>
                  )}
                </View>

                {/* Only show edit button for editable fields */}
                {item.editable !== false && (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      if (editMode === item.key) {
                        setEditMode(null);
                        setErrors({});
                      } else {
                        setEditMode(item.key);
                      }
                    }}
                  >
                    {editMode === item.key ? (
                      <Icon name="close-circle-outline" size={22} color="#FF3B30" />
                    ) : (
                      <Icon name="create-outline" size={22} color={appColors.blue} />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {editMode && (
              <TouchableOpacity style={styles.saveButton} onPress={handleProfileUpdate}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
        </SafeAreaView>
  );
};

export default LoginSecurityScreen;

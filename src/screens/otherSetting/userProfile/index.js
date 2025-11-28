import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  StatusBar
} from "react-native";
import Header from "../../../components/header";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import appColors from "../../../theme/appColors";
import { 
  getVendorDetails, 
  updateVendorName, 
  clearUpdateNameSuccess,
  updateVendorNameLocally,
  clearVendorErrors 
} from "../../../redux/slices/vendorSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginSecurityScreen = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [focusedField, setFocusedField] = useState(false);
  
  const dispatch = useDispatch();
  const {
    vendorData,
    loading,
    updatingName,
    updateNameError,
    updateNameSuccess
  } = useSelector((state) => state.vendor);

  // Load vendor details on component mount
  useEffect(() => {
    dispatch(getVendorDetails());
  }, [dispatch]);

  // Initialize form data from vendor data
  useEffect(() => {
    if (vendorData) {
      setName(vendorData?.name || "");
    }
  }, [vendorData]);

  // Handle update success
  useEffect(() => {
    if (updateNameSuccess) {
      // Alert.alert('Success', 'Name updated successfully!');
      setEditMode(false);
      dispatch(clearUpdateNameSuccess());
    }
  }, [updateNameSuccess, dispatch]);

  // Handle update errors
  useEffect(() => {
    if (updateNameError) {
      // Alert.alert('Update Failed', updateNameError);
      dispatch(clearVendorErrors());
    }
  }, [updateNameError, dispatch]);

  // Validate name
  const validateName = () => {
    if (!name.trim()) {
      setNameError("Name is required");
      return false;
    }
    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  // Handle name update
  const handleNameUpdate = async () => {
    if (!validateName()) return;

    try {
      // Update locally first for immediate UI feedback
      dispatch(updateVendorNameLocally(name.trim()));
      
      // Then make API call
      await dispatch(updateVendorName(name.trim())).unwrap();
    } catch (error) {
      // Revert local changes if API call fails
      if (vendorData?.name) {
        dispatch(updateVendorNameLocally(vendorData.name));
        setName(vendorData.name);
      }
      console.log('Name update error:', error);
    }
  };

  const handleCancelEdit = () => {
    // Reset to original name
    setName(vendorData?.name || "");
    setEditMode(false);
    setNameError("");
  };

  const fields = [
    { 
      label: "Name", 
      key: "name", 
      value: name,
      editable: true 
    },
    { 
      label: "Email", 
      key: "email", 
      value: vendorData?.email || "N/A", 
      editable: false 
    },
    { 
      label: "Contact", 
      key: "contactNo", 
      value: vendorData?.phone || "N/A", 
      editable: false 
    },
  ];

  if (loading && !vendorData) {
    return (
      <SafeAreaView style={[styles.container, { paddingHorizontal: 0 }]}>
        <Header  title={"Login & Security"} onBack={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appColors.blue} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingHorizontal: 0 }]}>
              <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <View style={styles.container}>
        <Header  title={"Personal Information"} onBack={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionCard}>
              {fields.map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.fieldContainer,
                    { borderBottomWidth: editMode && item.editable ? 0 : 1 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fieldLabel}>{item.label}</Text>

                    {!item.editable ? (
                      // Non-editable fields (Email and Contact)
                      <Text style={styles.fieldValue}>{item.value}</Text>
                    ) : editMode ? (
                      // Editable field (Name) in edit mode
                      <>
                        <TextInput
                          style={[
                            styles.input, 
                            focusedField && styles.inputFocused,
                            nameError && styles.inputError
                          ]}
                          onFocus={() => setFocusedField(true)}
                          onBlur={() => setFocusedField(false)}
                          onChangeText={(text) => {
                            setName(text);
                            if (nameError) setNameError("");
                          }}
                          value={name}
                          autoCapitalize="words"
                          underlineColorAndroid="transparent"
                          placeholder="Enter your name"
                          maxLength={50}
                        />
                        {nameError && (
                          <Text style={styles.errorText}>{nameError}</Text>
                        )}
                      </>
                    ) : (
                      // Display mode
                      <Text style={styles.fieldValue}>{item.value}</Text>
                    )}
                  </View>

                  {/* Show edit button only for Name field */}
                  {item.editable && (
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        if (editMode) {
                          handleCancelEdit();
                        } else {
                          setEditMode(true);
                        }
                      }}
                    >
                      {editMode ? (
                        <Icon name="close-circle-outline" size={22} color="#FF3B30" />
                      ) : (
                        <Icon name="create-outline" size={22} color={appColors.blue} />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {/* Save/Cancel buttons */}
              {editMode && (
                <View style={styles.saveButtonContainer}>
                  <TouchableOpacity 
                    style={[styles.saveButton, updatingName && styles.saveButtonDisabled]} 
                    onPress={handleNameUpdate}
                    disabled={updatingName}
                  >
                    {updatingName ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                  </TouchableOpacity>
                  
        
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginSecurityScreen;
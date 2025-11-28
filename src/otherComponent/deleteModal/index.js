import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Animated
} from "react-native";
import { styles } from "./styles";

const DeleteAccountModal = ({ visible, onCancel, onConfirm, isDeleting }) => {
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainerInstagram,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Title */}
          <View style={styles.titleSection}>
            <Text style={styles.modalTitleInstagram}>Delete Account</Text>
          </View>

          {/* Message */}
          <View style={styles.messageSection}>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently lost.
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.actionsContainer}>
            {/* Delete Button */}
            <TouchableOpacity
              style={[styles.actionButton, styles.destructiveButton]}
              onPress={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.destructiveButtonText}>Deleting...</Text>
                </View>
              ) : (
                <Text style={styles.destructiveButtonText}>Delete Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Cancel Button */}
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButtonInstagram]}
              onPress={onCancel}
              disabled={isDeleting}
            >
              <Text style={styles.cancelButtonTextInstagram}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;

// CustomerPickupPaymentScreen.js - Updated with images
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../../../theme/appColors';
import Header from '../../../components/header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from '../../../utils/context/toastContext';
import {
  fetchOrderSummary,
  updateOrderStatus
} from '../../../redux/slices/vendorOrderSlice';
import { getItemImage } from "../../../utils/data/imageMapping"; 

const OrderSummary = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const orderId = route.params?.orderId;
  const pickupDate = route.params?.pickupDate
  const deliveryDate = route.params?.deliveryDate

  const { showToast } = useToast();

  const { orderSummary, loading } = useSelector(state => state.vendorOrders);

  console.log("ORDER SUMMARY IS:", orderSummary)

  // Local state for optimistic updates
  const [optimisticStatus, setOptimisticStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const insets = useSafeAreaInsets();

  // Use optimistic status if available, otherwise use actual status
  const currentStatus = optimisticStatus || orderSummary?.status || '';

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderSummary(orderId));
    }
  }, [dispatch, orderId]);

  // Function to determine category from item data
  const getCategoryForItem = (itemName) => {
    const lowerName = itemName.toLowerCase();
    
    // Women's items
    if (lowerName.includes('saree') || lowerName.includes('dress') || 
        lowerName.includes('blouse') || lowerName.includes('skirt') || 
        lowerName.includes('kurti')) {
      return 'woman';
    }
    
    // Kids items
    if (lowerName.includes('school') || lowerName.includes('uniform')) {
      return 'kids';
    }
    
    // Default to men's for other items
    return 'man';
  };

  // Simplified status handler - just navigate to specific tab
  const handleStatusUpdate = async (newStatus, successMessage) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setOptimisticStatus(newStatus);

    try {
      // Show toast immediately
      showToast(successMessage, 'success');
      
      // Make API call without waiting
      dispatch(
        updateOrderStatus({
          orderId,
          status: newStatus,
          reason: newStatus === 'rejected' ? 'Rejected by vendor' : undefined,
        })
      );

      // Navigate to Orders screen with specific tab after short delay
      setTimeout(() => {
        const targetTab = getTargetTab(newStatus);
        
        // Navigate back to Orders screen with the target tab
         navigation.navigate('Main', { 
          screen: 'Order',
          params: {
            openTab: targetTab
          }
        });
      }, 500); // Short delay for smooth transition
      
    } catch (error) {
      // Revert optimistic update on failure
      setOptimisticStatus(null);
      setIsProcessing(false);
      showToast('Something went wrong', 'error');
    }
  };

  // Helper function to map status to tab
  const getTargetTab = (newStatus) => {
    switch (newStatus) {
      case 'accepted': return 'inProgress';
      case 'completed': return 'completed';
      case 'rejected': return 'rejected';
      default: return 'new';
    }
  };

  // Updated handlers
  const handleReject = () => {
    handleStatusUpdate('rejected', 'Order rejected successfully!');
  };

  const handleAccept = () => {
    handleStatusUpdate('accepted', 'Order accepted successfully!');
  };

  const handleCompleted = () => {
    handleStatusUpdate('completed', 'Order completed successfully!');
  };

  // Rest of your component remains exactly the same...
  const customer = orderSummary?.customer || {};
  const items = orderSummary?.items || [];
  const totalAmount = orderSummary?.totalAmount || 0;
  const timeline = orderSummary || {};
  const instructions = orderSummary?.instructions || '';
  const deliveryAddress = orderSummary?.deliveryAddress || {};
  
  // Determine which buttons to show based on CURRENT status
  const getActionButtons = () => {
    if (isProcessing) {
      return (
        <View style={[styles.actionBar, { paddingBottom: insets.bottom + 10 }]}>
          <View style={[styles.loadingButton, styles.fullWidthButton]}>
            <ActivityIndicator size="small" color={appColors.white} />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        </View>
      );
    }

    switch (currentStatus) {
      case 'pending':
        return (
          <View style={[styles.actionBar, { paddingBottom: insets.bottom + 10 }]}>
            <TouchableOpacity 
              style={[styles.rejectButton, styles.halfWidthButton]}
              onPress={handleReject}
              disabled={isProcessing}
            >
              <Ionicons name="close-circle" size={18} color="#FF0000" />
              <Text style={styles.rejectText}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.acceptButton, styles.halfWidthButton]}
              onPress={handleAccept}
              disabled={isProcessing}
            >
              <Ionicons name="checkmark-circle" size={16} color="#fff" />
              <Text style={styles.payText}>Accept Order</Text>
            </TouchableOpacity>
          </View>
        );

      case 'accepted':
        return (
          <View style={[styles.actionBar, { paddingBottom: insets.bottom + 10 }]}>
            <TouchableOpacity
              style={[styles.completeButton, styles.fullWidthButton]}
              onPress={handleCompleted}
              disabled={isProcessing}
            >
              <Ionicons name="checkmark-done-circle" size={16} color="#fff" />
              <Text style={styles.payText}>Mark as Completed</Text>
            </TouchableOpacity>
          </View>
        );

      case 'completed':
        return (
          <View style={[styles.actionBar, { paddingBottom: insets.bottom + 10 }]}>
            <View style={[styles.statusBadge, styles.fullWidthButton]}>
              <Ionicons name="checkmark-done-circle" size={16} color="#4CAF50" />
              <Text style={styles.statusText}>Order Completed</Text>
            </View>
          </View>
        );

      case 'rejected':
        return (
          <View style={[styles.actionBar, { paddingBottom: insets.bottom + 10 }]}>
            <View style={[styles.statusBadge, styles.fullWidthButton]}>
              <Ionicons name="close-circle" size={16} color="#F44336" />
              <Text style={styles.statusText}>Order Rejected</Text>
            </View>
          </View>
        );

      default:
        return (
          <View style={[styles.actionBar, { paddingBottom: insets.bottom + 10 }]}>
            <TouchableOpacity 
              style={[styles.rejectButton, styles.halfWidthButton]}
              onPress={handleReject}
              disabled={isProcessing}
            >
              <Ionicons name="close-circle" size={18} color="#FF0000" />
              <Text style={styles.rejectText}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.acceptButton, styles.halfWidthButton]}
              onPress={handleAccept}
              disabled={isProcessing}
            >
              <Ionicons name="checkmark-circle" size={16} color="#fff" />
              <Text style={styles.payText}>Accept Order</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  // Get status badge for header
  const getStatusBadge = () => {
    const statusConfig = {
      pending: { color: '#FFA726', text: 'Pending', icon: 'time' },
      accepted: { color: '#2196F3', text: 'In Progress', icon: 'play-circle' },
      completed: { color: '#4CAF50', text: 'Completed', icon: 'checkmark-circle' },
      rejected: { color: '#F44336', text: 'Rejected', icon: 'close-circle' }
    };

    const config = statusConfig[currentStatus] || statusConfig.pending;
    
    return (
      <View style={[styles.statusHeaderBadge, { backgroundColor: config.color }]}>
        <Ionicons name={config.icon} size={12} color="#fff" />
        <Text style={styles.statusHeaderText}>{config.text}</Text>
      </View>
    );
  };

  // Show loading screen
  if (loading && !orderSummary) {
    return (
      <SafeAreaView style={styles.root}>
        <Header title="Order Summary" onBack={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appColors.secondary} />
          <Text style={styles.loadingText}>Loading order details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <Header 
        title="Order Summary" 
        onBack={() => navigation.goBack()}
        rightComponent={getStatusBadge()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Timeline */}
        <View style={styles.deliveryCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="time" size={13} color={appColors.white} />
            </View>
            <Text style={styles.cardTitle}>Delivery Timeline</Text>
          </View>

          <View style={styles.timeline}>
            {/* Pickup */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineMarker}>
                <View style={[styles.timelineDot, styles.dotCompleted]} />
                <View style={styles.timelineConnector} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>Pickup Scheduled</Text>
                <Text style={styles.timelineDate}>{pickupDate}</Text>
                <Text style={styles.timelineAddress}>
                  {deliveryAddress?.landmark || 'Not Available'}
                </Text>
              </View>
            </View>

            {/* Delivery */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineMarker}>
                <View style={[styles.timelineDot, 
                  currentStatus === 'completed' ? styles.dotCompleted : styles.dotCurrent
                ]} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>
                  {currentStatus === 'completed' ? 'Delivered' : 'Estimated Delivery'}
                </Text>
                <Text style={styles.timelineDate}>{deliveryDate}</Text>
                <Text style={styles.timelineAddress}>
                  {deliveryAddress?.address || 'Not Available'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={10} color={appColors.white} />
            </View>
            <Text style={styles.cardTitle}>Customer Details</Text>
          </View>

          <View style={styles.customerInfo}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
              }}
              style={styles.avatar}
            />

            <View style={styles.customerDetails}>
              <Text style={styles.customerName}>
                {customer?.name || 'Unknown'} 
              </Text>
              <Text style={styles.customerLocation}>
                {deliveryAddress?.landmark || 'No address'}
              </Text>
            </View>

            {/* 📞 Call Icon */}
            <TouchableOpacity
              onPress={() => {
                if (customer?.phone) {
                  Linking.openURL(`tel:${customer.phone}`);
                } else {
                  alert("Phone number not available");
                }
              }}
              style={styles.callButton}
            >
              <Ionicons name="call" size={22} color={appColors.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.itemsCard}>
          <View style={[styles.cardHeader, { marginBottom: 0 }]}>
            <View style={styles.iconContainer}>
              <Ionicons name="shirt" size={10} color={appColors.white} />
            </View>
            <Text style={styles.cardTitle}>
              Order Items ({items.length || 0})
            </Text>
          </View>

          {items.map((item, index) => {
            // Get category for the item
            const category = getCategoryForItem(item.item);
            // Get the appropriate image
            const itemImage = getItemImage(item.item, category);
            
            console.log("🖼️ Order Item Image:", {
              name: item.item,
              category: category,
              image: itemImage
            });

            return (
              <View
                key={index}
                style={[
                  styles.itemRow,
                  index !== items.length - 1 && styles.itemBorder,
                ]}
              >
                {/* Dynamic Image */}
                <Image 
                  source={itemImage}
                  style={styles.itemImage}
                  resizeMode="contain"
                />

                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.item}</Text>
                  <Text style={styles.itemService}>{item.service}</Text>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                 
                </View>
              </View>
            );
          })}
        </View>

        {/* Instructions */}
        {instructions && 
          <View style={styles.specialCard}>
            <TouchableOpacity activeOpacity={0.9} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="document-text"
                    size={12}
                    color={appColors.white}
                  />
                </View>
                <Text style={styles.sectionTitle}>Special Instructions</Text>
                <Ionicons
                  name="chevron-forward"
                  size={13}
                  color={appColors.subTitle}
                />
              </View>
            
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>{instructions}</Text>
              </View>
            </TouchableOpacity>
          </View>
        }

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="receipt" size={10} color={appColors.white} />
            </View>
            <Text style={styles.cardTitle}>Order Summary</Text>
          </View>

          <View style={styles.summaryRows}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxes</Text>
              <Text style={styles.summaryValue}>₹0.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>₹0.00</Text>
            </View>
          </View>

          <View style={styles.totalSection}>
            <View>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalNote}>Inclusive of all taxes</Text>
            </View>
            <Text style={styles.totalAmount}>₹{totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Dynamic Action Buttons based on status */}
      {getActionButtons()}
    </SafeAreaView>
  );
};

export default OrderSummary;
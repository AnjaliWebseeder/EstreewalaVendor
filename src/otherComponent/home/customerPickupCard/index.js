import React, { useContext, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  FlatList,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import { VendorContext } from "../../../utils/context/vendorContext";
import { styles } from "./styles";
import appColors from "../../../theme/appColors";
import CustomPickupIcon from "../../../assets/Icons/pickup"
import DeliveryIcon from "../../../assets/Icons/deliveryIcon"
import { useToast } from "../../../utils/context/toastContext";

const CustomerPickupCard = ({ item, showButtons = true }) => {
  const navigation = useNavigation();
  const { acceptOrder, rejectOrder, updateOrderStage, completeOrder, updatePaymentStatus } = useContext(VendorContext);
  const [fadeAnim] = useState(new Animated.Value(1));
  const { showToast } = useToast();

  const handleAccept = (id) => {
   
      acceptOrder(id);
      showToast('Order accepted successfully!', 'success');
      navigation.navigate("Main", { 
        screen: "Order",
        params: { openTab: "inProgress" }
      });
   
  };

  const handleReject = (id) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      rejectOrder(id);
      showToast('Order declined', 'error');
    });
  };

  const handleStageUpdate = (orderId, newStage) => {
    updateOrderStage(orderId, newStage);
    
    let message = '';
    let type = 'info';
    
    switch(newStage) {
      case 'ready':
        message = 'Order marked as ready! ✅';
        type = 'success';
        break;
      default:
        message = 'Status updated';
    }
    
    showToast(message, type);
  };

  const handleMakePayment = (order) => {
    // Navigate to Order Details page with the order data
    navigation.navigate('OrderDetails', { 
      orderId: order.id,
      orderData: order
    });
  };

  const handlePaymentComplete = (orderId) => {
    updatePaymentStatus(orderId, 'completed');
    updateOrderStage(orderId, 'out-for-delivery');
    showToast('Payment received! Order out for delivery 🚚', 'success');
  };

  const getDaysLeftText = (daysLeft) => {
    if (daysLeft === 0) return { text: "Today", color: "#4cc9f0", bg: "#e8f5e8" };
    if (daysLeft === 1) return { text: "Tomorrow", color: '#f8961e', bg: "#fff3cd" };
    return { text: `${daysLeft} days left`, color: "#4361ee", bg: "#e3f2fd" };
  };

  const getStageInfo = (stage) => {
    switch(stage) {
      case 'processing': 
        return { 
          text: 'In Processing', 
          color: "#f8961e", 
          icon: 'progress-clock',
          bg: '#fff3cd'
        };
      case 'ready': 
        return { 
          text: 'Ready for Delivery', 
          color: "#4cc9f0", 
          icon: 'check-circle',
          bg: '#e8f5e8'
        };
      case 'payment-pending':
        return {
          text: 'Payment Pending',
          color: "#FF9800",
          icon: 'cash-clock',
          bg: '#FFF3E0'
        };
      case 'out-for-delivery': 
        return { 
          text: 'Out for Delivery', 
          color: "#4895ef", 
          icon: 'truck-delivery',
          bg: '#e3f2fd'
        };
      default: 
        return { 
          text: 'Processing', 
          color: "#f8961e", 
          icon: 'progress-clock',
          bg: '#fff3cd'
        };
    }
  };

  const daysLeftInfo = getDaysLeftText(item.daysLeft);
  const stageInfo = item.currentStage ? getStageInfo(item.currentStage) : null;

  // Check if payment is pending and order is ready
  const isPaymentPending = item.currentStage === 'ready' && item.paymentStatus === 'pending';

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      {/* Header with Status */}
      <View style={styles.cardHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <Text style={styles.totalAmount}>{item.totalAmount}</Text>
        </View>
        <View style={[styles.daysLeftBadge, { backgroundColor: appColors.blue }]}>
          <Text style={[styles.daysLeftText, { color: appColors.white }]}>
            {daysLeftInfo.text}
          </Text>
        </View>
      </View>

      {/* Status Progress for In-Progress Orders */}
      {stageInfo && (
        <View style={[styles.stageBadge, { backgroundColor: stageInfo.bg }]}>
          <Icon name={stageInfo.icon} size={16} color={stageInfo.color} />
          <Text style={[styles.stageText, { color: stageInfo.color }]}>
            {stageInfo.text}
          </Text>
        </View>
      )}

      {/* Payment Status Badge */}
      {isPaymentPending && (
        <View style={[styles.paymentBadge, { backgroundColor: '#FFF3E0' }]}>
          <Icon name="cash-remove" size={16} color="#FF9800" />
          <Text style={[styles.paymentBadgeText, { color: "#FF9800" }]}>
            Payment Pending - {item.totalAmount}
          </Text>
        </View>
      )}

      {/* Customer Profile */}
      <View style={styles.profileRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.location}>
            <Icon name="map-marker" size={12} color={"#6c757d"} /> {item.location}
          </Text>
          {item.acceptedAt && (
            <Text style={styles.acceptedTime}>
              Accepted: {new Date(item.acceptedAt).toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, styles.dotCompleted]} >
            <View style={styles.innerDot} />
          </View>             
          <View>
            <Text style={styles.timelineLabel}>Pickup</Text>
            <Text style={styles.timelineValue}>{item.pickupDate}</Text>
            <Text style={styles.timelineTime}>{item.pickupTime}</Text>
          </View>  
        </View>
        
        <View style={styles.timelineConnector} />
        
        <View style={styles.timelineItem}>
          <View style={[
            styles.timelineDot, 
            item.status === 'in-progress' ? styles.dotCurrent : styles.dotUpcoming
          ]} >
            <View style={styles.innerDot} />
          </View>
          <View>
            <Text style={styles.timelineLabel}>Delivery</Text>
            <Text style={styles.timelineValue}>
              {item.estimatedDelivery.split('   ')[0]}
            </Text>
            <Text style={styles.timelineTime}>
              {item.estimatedDelivery.split('   ')[1]}
            </Text>
          </View>
        </View>
      </View>

      {/* Address Section */}
      <View style={styles.addressSection}>
        <View style={styles.addressRow}>
          <CustomPickupIcon/>
          <View style={styles.addressText}>
            <Text style={styles.addressLabel}>Pickup From</Text>
            <Text style={styles.addressValue}>{item.pickupPoint}</Text>
          </View>
        </View>

        <View style={styles.addressRow}>
          <DeliveryIcon/>
          <View style={styles.addressText}>
            <Text style={styles.addressLabel}>Deliver To</Text>
            <Text style={styles.addressValue}>{item.destination}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        {showButtons ? (
          // New Order Buttons
          <>
            <TouchableOpacity 
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleReject(item.id)}
            >
              <Icon name="close-circle" size={18} color={"#f72585"} />
              <Text style={styles.rejectButtonText}>Decline</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.acceptButton]}
              onPress={() => handleAccept(item.id)}
            >
              <Text style={styles.acceptButtonText}>Accept Order</Text>
            </TouchableOpacity>
          </>
        ) : (
          // In-Progress Order Actions
          <View style={styles.progressActions}>
            {item.currentStage === 'processing' && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.readyButton]}
                onPress={() => handleStageUpdate(item.id, 'ready')}
              >
                <Icon name="check" size={18} color={appColors.white} />
                <Text style={styles.readyButtonText}>Mark Ready</Text>
              </TouchableOpacity>
            )}
            
            {/* Make Payment Button - Shows when order is ready and payment is pending */}
            {isPaymentPending && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.paymentButton]}
                onPress={() => handleMakePayment(item)}
              >
                <Icon name="cash" size={18} color={appColors.white} />
                <Text style={styles.paymentButtonText}>Make Payment</Text>
              </TouchableOpacity>
            )}
            
            {item.currentStage === 'out-for-delivery' && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.deliveryButton]}
                onPress={() => handleComplete(item.id)}
              >
                <Icon name="checkbox-marked-circle" size={18} color={appColors.white} />
                <Text style={styles.deliveryButtonText}>Mark Delivered</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Animated.View>
  );
};

// Main component that uses FlatList
const CustomerPickupList = ({ data, showButtons = true }) => {
  if (data.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Icon name="package-variant" size={60} color={"#adb5bd"} />
        <Text style={styles.emptyStateTitle}>
          {showButtons ? 'No New Orders' : 'No Orders in Progress'}
        </Text>
        <Text style={styles.emptyStateSubtitle}>
          {showButtons 
            ? 'New customer orders will appear here' 
            : 'Accepted orders will appear here'
          }
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <CustomerPickupCard item={item} showButtons={showButtons} />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default CustomerPickupList;
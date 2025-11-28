import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { VendorContext } from '../../../utils/context/vendorContext';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import CustomPickupIcon from '../../../assets/Icons/pickup';
import DeliveryIcon from '../../../assets/Icons/deliveryIcon';
import { useToast } from '../../../utils/context/toastContext';
import {updateOrderStatus} from '../../../redux/slices/vendorOrderSlice';
import { useDispatch } from 'react-redux';

const CustomerPickupCard = ({
  item,
  showButtons, // true for new pickups, false for accepted orders
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { acceptOrder, rejectOrder, completePayment } =
    useContext(VendorContext);
  const [fadeAnim] = useState(new Animated.Value(1));
  const { showToast } = useToast();
  const [processingPayment, setProcessingPayment] = useState(false);

const handleAccept = async (id) => {
  try {
    // 1. Update UI immediately with animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // 2. Make API call
    const result = await dispatch(
      updateOrderStatus({ orderId: id, status: 'accepted' })
    );

    if (updateOrderStatus.fulfilled.match(result)) {
      // 3. Show success message
      showToast('Order accepted successfully!', 'success');
      
      // 4. Navigate immediately (don't wait for refresh)
      navigation.navigate('Main', {
        screen: 'Order',
        params: { openTab: 'inProgress' },
      });
      
      // 5. Remove from local list via context or let parent handle refresh
      // The order will be automatically removed from pending list
      // because of the Redux state update in updateOrderStatus
      
    } else {
      showToast(result.payload || 'Failed to accept order', 'error');
      // Reset animation if failed
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  } catch (error) {
    showToast('Something went wrong!', 'error');
    console.error('Accept order error:', error);
    // Reset animation if error
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
};

const handleReject = async (id) => {
  try {
    // 1. Update UI immediately with animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // 2. Make API call
    const result = await dispatch(
      updateOrderStatus({ orderId: id, status: 'rejected' })
    );

    if (updateOrderStatus.fulfilled.match(result)) {
      // 3. Show success message
      const apiMsg = result?.message || 'Order rejected successfully!';
      showToast(apiMsg, 'error');
      
      // 4. The order will automatically disappear from UI due to animation
      // No need to refresh or navigate
      
    } else {
      showToast(result.payload || 'Failed to reject order', 'error');
      // Reset animation if failed
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  } catch (error) {
    showToast('Something went wrong while rejecting!', 'error');
    console.error('Reject order error:', error);
    // Reset animation if error
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
};



  const getDaysLeftText = daysLeft => {
    if (daysLeft === undefined || daysLeft === null || isNaN(daysLeft)) {
      return { text: 'Ready', color: '#4cc9f0', bg: '#e8f5e8' };
    }

    if (daysLeft === 0)
      return { text: 'Today', color: '#4cc9f0', bg: '#e8f5e8' };
    if (daysLeft === 1)
      return { text: 'Tomorrow', color: '#f8961e', bg: '#fff3cd' };
    if (daysLeft > 1)
      return { text: `${daysLeft} days left`, color: '#4361ee', bg: '#e3f2fd' };

    return { text: 'Ready', color: '#4cc9f0', bg: '#e8f5e8' };
  };

  const isPaymentPending = item.paymentStatus === 'pending';
  const daysLeftInfo = getDaysLeftText(item.daysLeft);
  const pickupDate = new Date(item.pickupDate);

const formattedPickupDate = pickupDate.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});

const deliveryDate = new Date(item.estimatedDelivery)
const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});


  return (
    <TouchableOpacity
     onPress={() => navigation.navigate('OrderSummary', { orderId: item.id , pickupDate:formattedPickupDate,deliveryDate:formattedDeliveryDate })}
    >
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        {/* Header with Status */}
        <View style={styles.cardHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>Order #{item.id.slice(0, 8).toUpperCase()}</Text>
            <Text style={styles.totalAmount}>{item.totalAmount}</Text>
          </View>
          <View
            style={[styles.daysLeftBadge, { backgroundColor: appColors.blue }]}
          >
            <Text style={[styles.daysLeftText, { color: appColors.white }]}>
              {daysLeftInfo.text}
            </Text>
          </View>
        </View>

        {/* Payment Status Badge - Show for accepted orders */}
        {!showButtons && isPaymentPending && (
          <View style={[styles.paymentBadge, { backgroundColor: '#FFF3E0' }]}>
            <Icon name="cash-remove" size={16} color="#FF9800" />
            <Text style={[styles.paymentBadgeText, { color: '#FF9800' }]}>
              Payment Pending - {item.totalAmount}
            </Text>
          </View>
        )}

        {/* Payment Completed Badge */}
        {!showButtons && item.paymentStatus === 'completed' && (
          <View style={[styles.paymentBadge, { backgroundColor: '#E8F5E8' }]}>
            <Icon name="check-circle" size={16} color="#1CA75A" />
            <Text style={[styles.paymentBadgeText, { color: '#1CA75A' }]}>
              Payment Done
            </Text>
          </View>
        )}

        {/* Customer Profile */}
        <View style={styles.profileRow}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.location}>
              <Icon name="map-marker" size={12} color={'#6c757d'} />{' '}
              {item.location}
            </Text>
            {item.acceptedAt && (
              <Text style={styles.acceptedTime}>
              Accepted: {item.acceptedAt}
              </Text>
            )}
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.dotCompleted]}>
              <View style={styles.innerDot} />
            </View>
            <View>
              <Text style={styles.timelineLabel}>Pickup</Text>
         <Text style={styles.timelineValue}>{formattedPickupDate}</Text>
              <Text style={styles.timelineTime}>{item.pickupTime}</Text>
            </View>
          </View>

          <View style={styles.timelineConnector} />

          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.dotCurrent]}>
              <View style={styles.innerDot} />
            </View>
            <View>
              <Text style={styles.timelineLabel}>Delivery</Text>
              <Text style={styles.timelineValue}>
                {formattedDeliveryDate}
              </Text>
              <Text style={styles.timelineTime}>
                {item.estimatedDeliveryTime}
              </Text>
            </View>
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressRow}>
            <CustomPickupIcon />
            <View style={styles.addressText}>
              <Text style={styles.addressLabel}>Pickup From</Text>
              <Text style={styles.addressValue}>{item.pickupPoint}</Text>
            </View>
          </View>

          <View style={styles.addressRow}>
            <DeliveryIcon />
            <View style={styles.addressText}>
              <Text style={styles.addressLabel}>Deliver To</Text>
              <Text style={styles.addressValue}>{item.destination}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          {showButtons ? (
            // New Order Buttons - Accept/Decline
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => handleReject(item.id)}
              >
                <Icon name="close-circle" size={18} color={'#FF0000'} />
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
            // Accepted Order Actions - Only Payment button
            // <View style={styles.progressActions}>
            //   {isPaymentPending && (
            //     <TouchableOpacity
            //       style={[styles.actionButton, styles.paymentButton, processingPayment && styles.disabledButton]}
            //       onPress={() => handleMakePayment(item)}
            //       disabled={processingPayment}
            //     >
            //       <Text style={styles.paymentButtonText}>
            //         {processingPayment ? 'Processing...' : 'Make Payment'}
            //       </Text>
            //     </TouchableOpacity>
            //   )}
            // </View>
            <></>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main component that uses FlatList
const CustomerPickupList = ({
  data,
  showButtons = true, // true = new pickups, false = accepted orders
  onRefresh, 
  refreshing,
  status = 'new' // Add status prop to identify which tab is active
}) => {  

  // Status-wise empty state messages
  const getEmptyStateConfig = (status) => {
    const configs = {
      new: {
        icon: 'package-variant',
        title: 'No New Orders',
        subtitle: 'New customer orders will appear here',
        iconColor: '#adb5bd'
      },
      inProgress: {
        icon: 'progress-clock',
        title: 'No Orders In Progress',
        subtitle: 'Accepted orders will appear here',
        iconColor: '#ffa726'
      },
      completed: {
        icon: 'check-circle',
        title: 'No Completed Orders',
        subtitle: 'Completed orders will appear here',
        iconColor: '#4caf50'
      },
      rejected: {
        icon: 'close-circle',
        title: 'No Rejected Orders',
        subtitle: 'Rejected orders will appear here',
        iconColor: '#f44336'
      }
    };
    
    return configs[status] || configs.new;
  };

  if (!data || data.length === 0) {
    const emptyConfig = getEmptyStateConfig(status);
    
    return (
      <View style={styles.emptyState}>
        <Icon name={emptyConfig.icon} size={60} color={emptyConfig.iconColor} />
        <Text style={styles.emptyStateTitle}>
          {emptyConfig.title}
        </Text>
        <Text style={styles.emptyStateSubtitle}>
          {emptyConfig.subtitle}
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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default CustomerPickupList;

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { VendorContext } from '../../../utils/context/vendorContext';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import CustomPickupIcon from '../../../assets/Icons/pickup';
import DeliveryIcon from '../../../assets/Icons/deliveryIcon';
import { useToast } from '../../../utils/context/toastContext';
import {
  fetchVendorOrders,
  updateOrderStatus,
} from '../../../redux/slices/vendorOrderSlice';
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

  // const handleAccept = (id) => {
  //   acceptOrder(id);
  //   showToast('Order accepted successfully!', 'success');
  //   // Automatically navigate to In Progress tab
  //   navigation.navigate("Main", {
  //     screen: "Order",
  //     params: { openTab: "inProgress" }
  //   });
  // };

  const handleAccept = async id => {
    try {
      const result = await dispatch(
        updateOrderStatus({ orderId: id, status: 'accepted' }),
      );
      if (updateOrderStatus.fulfilled.match(result)) {
        showToast('Order accepted successfully!', 'success');

        // Refresh pending list (remove accepted one)
        dispatch(fetchVendorOrders('pending'));

        // Optionally navigate to "In Progress" tab
        navigation.navigate('Main', {
          screen: 'Order',
          params: { openTab: 'inProgress' },
        });
      } else {
        showToast(result.payload || 'Failed to accept order', 'error');
      }
    } catch (error) {
      showToast('Something went wrong!', 'error');
      console.error('Accept order error:', error);
    }
  };

  // const handleReject = (id) => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     rejectOrder(id);
  //     showToast('Order declined', 'error');
  //   });
  // };

  const handleReject = async id => {
    try {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const result = await dispatch(
        updateOrderStatus({ orderId: id, status: 'rejected' }),
      );

      if (updateOrderStatus.fulfilled.match(result)) {
        // ✅ Use backend message dynamically
        const apiMsg =
          result?.message || 'Order rejected successfully!';
        showToast(apiMsg, 'error');

        // ✅ Refresh pending list
        dispatch(fetchVendorOrders('pending'));
      } else {
        showToast(result.payload || 'Failed to reject order', 'error');
      }
    } catch (error) {
      showToast('Something went wrong while rejecting!', 'error');
      console.error('Reject order error:', error);
    }
  };

  const handleMakePayment = async order => {
    setProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      completePayment(order.id);
      setProcessingPayment(false);

      // ✅ Directly navigate to ConfirmPayment screen
      navigation.navigate('PaymentSuccess', {
        orderId: order.id,
        orderData: order,
        amount: order.totalAmount,
      });
    }, 1500);
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

  return (
    <TouchableOpacity
     onPress={() => navigation.navigate('OrderSummary', { orderId: item.id })}
    >
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        {/* Header with Status */}
        <View style={styles.cardHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>Order #{item.id}</Text>
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
                Accepted: {new Date(item.acceptedAt).toLocaleDateString()}
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
              <Text style={styles.timelineValue}>{item.pickupDate}</Text>
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
}) => {
  if (data.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Icon name="package-variant" size={60} color={'#adb5bd'} />
        <Text style={styles.emptyStateTitle}>
          {showButtons ? 'No New Orders' : 'No Accepted Orders'}
        </Text>
        <Text style={styles.emptyStateSubtitle}>
          {showButtons
            ? 'New customer orders will appear here'
            : 'Accepted orders will appear here'}
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

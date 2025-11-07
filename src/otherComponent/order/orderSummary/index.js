// CustomerPickupPaymentScreen.js
import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
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
  fetchVendorOrders,
  updateOrderStatus,
} from '../../../redux/slices/vendorOrderSlice';

const OrderSummary = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const orderId = route.params?.orderId;

  const { showToast } = useToast();

  const { orderSummary, loading } = useSelector(state => state.vendorOrders);

  console.log('find orderSummary data ====>>>>', orderSummary);

  const [isCouponApplied, setIsCouponApplied] = useState(true);
  const [couponCode, setCouponCode] = useState('WELCOME10');
  // const [instructions, setInstructions] = useState('Please use mild detergent only.');
  const [selectedCoupon, setSelectedCoupon] = useState('WELCOME10');
  const [orderStatus, setOrderStatus] = useState('pending');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderSummary(orderId));
    }
  }, [dispatch, orderId]);

  const customer = orderSummary?.customer || {};
  const items = orderSummary?.items || [];
  const totalAmount = orderSummary?.totalAmount || 0;
  const timeline = orderSummary || {}; // your API has pickupDateTime, deliveryDateTime at root level
  const instructions = orderSummary?.instructions || '';
  const status = orderSummary?.status || '';
  const deliveryAddress = orderSummary?.deliveryAddress || {};

  // Derived values
  const pickupDate = new Date(timeline?.pickupDateTime).toDateString();
  const deliveryDate = new Date(timeline?.deliveryDateTime).toDateString();
  const pickupTime = new Date(timeline?.pickupDateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const deliveryTime = new Date(timeline?.deliveryDateTime).toLocaleTimeString(
    [],
    { hour: '2-digit', minute: '2-digit' },
  );

  const handleReject = async () => {
    const result = await dispatch(
      updateOrderStatus({
        orderId,
        status: 'rejected',
        reason: 'Rejected by vendor',
      }),
    );
    if (updateOrderStatus.fulfilled.match(result)) {
      showToast(
        result.payload?.message || 'Order rejected successfully!',
        'error',
      );
      dispatch(fetchVendorOrders('pending'));
      navigation.goBack();
    } else {
      showToast(result.payload || 'Failed to reject order', 'error');
    }
  };

  const handleAccept = async () => {
    const result = await dispatch(
      updateOrderStatus({ orderId, status: 'accepted' }),
    );
    if (updateOrderStatus.fulfilled.match(result)) {
      showToast(
        result.payload?.message || 'Order accepted successfully!',
        'success',
      );
      dispatch(fetchVendorOrders('accepted'));
      navigation.goBack();
    } else {
      showToast(result.payload || 'Failed to accept order', 'error');
    }
  };

  // const [items, setItems] = useState([
  //   { id: 1, name: 'Formal Shirt', service: 'Wash & Iron', qty: 2, price: 5, color: '#667eea' },
  //   { id: 2, name: 'T shirt', service: 'Wash & Iron', qty: 1, price: 8, color: '#764ba2' },
  // ]);

  // Constants

  const DELIVERY_FEE = 2.5;
  const TAX_RATE = 0.08;

  // Available coupons
  const availableCoupons = [
    {
      code: 'WELCOME10',
      discount: 0.1,
      description: '10% off on First order',
      minAmount: 0,
      color: '#667eea',
    },
    {
      code: 'SAVE15',
      discount: 0.15,
      description: '15% off on orders above ₹30',
      minAmount: 30,
      color: '#f093fb',
    },
    {
      code: 'FREESHIP',
      discount: 0,
      deliveryFree: true,
      description: 'Free delivery on this order',
      minAmount: 0,
      color: '#4facfe',
    },
    {
      code: 'CLEAN5',
      discount: 0.05,
      description: '5% off on all orders',
      minAmount: 0,
      color: '#43e97b',
    },
  ];

  // Dynamic price calculations
  const pricing = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0);
    const taxes = subtotal * TAX_RATE;

    let discount = 0;
    let deliveryFee = DELIVERY_FEE;

    if (isCouponApplied && couponCode) {
      const coupon = availableCoupons.find(c => c.code === couponCode);
      if (coupon && subtotal >= coupon.minAmount) {
        if (coupon.deliveryFree) {
          deliveryFee = 0;
        }
        discount = subtotal * coupon.discount;
      }
    }

    const total = subtotal + deliveryFee + taxes - discount;

    return {
      subtotal,
      taxes,
      discount,
      deliveryFee,
      total,
    };
  }, [items, isCouponApplied, couponCode]);

  const onReject = () => {
    setOrderStatus('rejected');
  };

  const onPay = () => {
    navigation.navigate('PaymentSuccess', {
      orderDetails: {
        orderId: `#ORD-${Date.now()}`,
        totalAmount: pricing.total.toFixed(2),
        customerName: 'Niti Patel',
        deliveryDate: '2025-09-16',
      },
    });
  };

  // Status-based rendering
  const renderStatusIndicator = () => {
    if (orderStatus === 'rejected') {
      return (
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, styles.rejectedStatus]}>
            <Ionicons name="close-circle" size={20} color="#fff" />
            <Text style={styles.statusText}>Order Decline</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    // <SafeAreaView style={styles.root}>
    //   <StatusBar backgroundColor="transparent" />
    //   <Header title={'Order Summary'} onBack={() => navigation.goBack()} />

    //   <ScrollView
    //     style={styles.scroll}
    //     contentContainerStyle={styles.scrollContent}
    //     showsVerticalScrollIndicator={false}
    //   >
    //     {/* Delivery Timeline */}
    //     <View style={styles.deliveryCard}>
    //       <View style={styles.cardHeader}>
    //         <View style={styles.iconContainer}>
    //           <Ionicons name="time" size={13} color={appColors.white} />
    //         </View>
    //         <Text style={styles.cardTitle}>Delivery Timeline</Text>
    //       </View>

    //       <View style={styles.timeline}>
    //         <View style={styles.timelineItem}>
    //           <View style={styles.timelineMarker}>
    //             <View style={[styles.timelineDot, styles.dotCompleted]} />
    //             <View style={styles.timelineConnector} />
    //           </View>
    //           <View style={styles.timelineContent}>
    //             <Text style={styles.timelineLabel}>Pickup Scheduled</Text>
    //             <Text style={styles.timelineDate}>Sep 13, 2025</Text>
    //             <Text style={styles.timelineTime}>09:00 AM - 11:00 AM</Text>
    //             <Text style={styles.timelineAddress}>
    //               Sopanbagh Colony, Chinchwade Nagar
    //             </Text>
    //           </View>
    //         </View>

    //         <View style={styles.timelineItem}>
    //           <View style={styles.timelineMarker}>
    //             <View style={[styles.timelineDot, styles.dotCurrent]} />
    //           </View>
    //           <View style={styles.timelineContent}>
    //             <Text style={styles.timelineLabel}>Estimated Delivery</Text>
    //             <Text style={styles.timelineDate}>Sep 16, 2025</Text>
    //             <Text style={styles.timelineTime}>11:00 AM - 01:00 PM</Text>
    //             <Text style={styles.timelineAddress}>
    //               Nikmar Society, Aundh Gaon
    //             </Text>
    //           </View>
    //         </View>
    //       </View>
    //     </View>

    //     {/* Customer Info */}
    //     <View style={styles.infoCard}>
    //       <View style={styles.cardHeader}>
    //         <View style={styles.iconContainer}>
    //           <Ionicons name="person" size={10} color={appColors.white} />
    //         </View>
    //         <Text style={styles.cardTitle}>Customer Details</Text>
    //       </View>

    //       <View style={styles.customerInfo}>
    //         <Image
    //           source={{
    //             uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
    //           }}
    //           style={styles.avatar}
    //         />
    //         <View style={styles.customerDetails}>
    //           <Text style={styles.customerName}>Niti Patel</Text>
    //           <Text style={styles.customerLocation}>Maharashtra, India</Text>
    //         </View>
    //       </View>
    //     </View>

    //     {/* Order Items */}
    //     <View style={styles.itemsCard}>
    //       <View style={[styles.cardHeader, { marginBottom: 0 }]}>
    //         <View style={styles.iconContainer}>
    //           <Ionicons name="shirt" size={10} color={appColors.white} />
    //         </View>
    //         <Text style={styles.cardTitle}>Order Items ({items.length})</Text>
    //       </View>

    //       {items.map((item, index) => (
    //         <View
    //           key={item.id}
    //           style={[
    //             styles.itemRow,
    //             index !== items.length - 1 && styles.itemBorder,
    //           ]}
    //         >
    //           <View style={[styles.itemThumb, { backgroundColor: item.color }]}>
    //             <Ionicons name="shirt-outline" size={19} color="#fff" />
    //           </View>

    //           <View style={styles.itemDetails}>
    //             <Text style={styles.itemName}>{item.name}</Text>
    //             <Text style={styles.itemService}>{item.service}</Text>
    //             <Text style={styles.itemPrice}>
    //               ₹{item.price.toFixed(2)} each
    //             </Text>
    //           </View>
    //         </View>
    //       ))}
    //     </View>

    //     {/* Instructions & Coupon */}
    //     <View style={styles.specialCard}>
    //       {/* Instructions Section */}
    //       <TouchableOpacity activeOpacity={0.9} style={styles.section}>
    //         <View style={styles.sectionHeader}>
    //           <View style={styles.sectionIcon}>
    //             <Ionicons
    //               name="document-text"
    //               size={12}
    //               color={appColors.white}
    //             />
    //           </View>
    //           <Text style={styles.sectionTitle}>Special Instructions</Text>
    //           <Ionicons
    //             name="chevron-forward"
    //             size={13}
    //             color={appColors.subTitle}
    //           />
    //         </View>
    //         {instructions ? (
    //           <View style={styles.instructionContainer}>
    //             <Text style={styles.instructionText}>{instructions}</Text>
    //           </View>
    //         ) : (
    //           <Text style={styles.placeholder}>
    //             Tap to add instructions for this order...
    //           </Text>
    //         )}
    //       </TouchableOpacity>
    //     </View>

    //     {/* Order Summary */}
    //     <View style={styles.summaryCard}>
    //       <View style={styles.cardHeader}>
    //         <View style={styles.iconContainer}>
    //           <Ionicons name="receipt" size={10} color={appColors.white} />
    //         </View>
    //         <Text style={styles.cardTitle}>Order Summary</Text>
    //       </View>

    //       <View style={styles.summaryRows}>
    //         <View style={styles.summaryRow}>
    //           <Text style={styles.summaryLabel}>Subtotal</Text>
    //           <Text style={styles.summaryValue}>
    //             ₹{pricing.subtotal.toFixed(2)}
    //           </Text>
    //         </View>

    //         <View style={styles.summaryRow}>
    //           <Text style={styles.summaryLabel}>Delivery Fee</Text>
    //           <Text style={styles.summaryValue}>
    //             ₹{pricing.deliveryFee.toFixed(2)}
    //           </Text>
    //         </View>

    //         <View style={styles.summaryRow}>
    //           <Text style={styles.summaryLabel}>Taxes</Text>
    //           <Text style={styles.summaryValue}>
    //             ₹{pricing.taxes.toFixed(2)}
    //           </Text>
    //         </View>

    //         {isCouponApplied && pricing.discount > 0 && (
    //           <View style={styles.summaryRow}>
    //             <Text style={[styles.summaryLabel, styles.discountText]}>
    //               Discount
    //             </Text>
    //             <Text style={[styles.summaryValue, styles.discountText]}>
    //               -₹{pricing.discount.toFixed(2)}
    //             </Text>
    //           </View>
    //         )}

    //         {isCouponApplied && pricing.deliveryFee === 0 && (
    //           <View style={styles.summaryRow}>
    //             <Text style={[styles.summaryLabel, styles.discountText]}>
    //               Delivery Discount
    //             </Text>
    //             <Text style={[styles.summaryValue, styles.discountText]}>
    //               -₹{DELIVERY_FEE.toFixed(2)}
    //             </Text>
    //           </View>
    //         )}
    //       </View>

    //       <View style={styles.totalSection}>
    //         <View>
    //           <Text style={styles.totalLabel}>Total Amount</Text>
    //           <Text style={styles.totalNote}>Inclusive of all taxes</Text>
    //         </View>
    //         <Text style={styles.totalAmount}>₹{pricing.total.toFixed(2)}</Text>
    //       </View>
    //     </View>
    //   </ScrollView>

    //   {renderStatusIndicator()}

    //   {/* Bottom Action Bar */}
    //   {orderStatus === 'pending' && (
    //     <View style={[styles.actionBar, { paddingBottom: insets.bottom + 10 }]}>
    //       <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
    //         <Ionicons name="close-circle" size={18} color="#FF0000" />
    //         <Text style={styles.rejectText}>Decline</Text>
    //       </TouchableOpacity>

    //       {/* <TouchableOpacity style={styles.payButton} onPress={onPay}>
    //         <View style={styles.payContent}>
    //           <Ionicons name="lock-closed" size={16} color={appColors.white} />
    //           <Text style={styles.payText}>Pay ₹{pricing.total.toFixed(2)}</Text>
    //         </View>
    //       </TouchableOpacity> */}
    //     </View>
    //   )}
    // </SafeAreaView>

    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <Header title="Order Summary" onBack={() => navigation.goBack()} />

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
                <Text style={styles.timelineTime}>{pickupTime}</Text>
                <Text style={styles.timelineAddress}>
                  {deliveryAddress?.landmark || 'Not Available'}
                </Text>
              </View>
            </View>

            {/* Delivery */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineMarker}>
                <View style={[styles.timelineDot, styles.dotCurrent]} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>Estimated Delivery</Text>
                <Text style={styles.timelineDate}>{deliveryDate}</Text>
                <Text style={styles.timelineTime}>{deliveryTime}</Text>
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

          {items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.itemRow,
                index !== items.length - 1 && styles.itemBorder,
              ]}
            >
              <View style={[styles.itemThumb, { backgroundColor: '#8E44AD' }]}>
                <Ionicons name="shirt-outline" size={19} color="#fff" />
              </View>

              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.item}</Text>
                <Text style={styles.itemService}>{item.service}</Text>
                <Text style={styles.itemPrice}>
                  ₹{item.unitPrice.toFixed(2)} each
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Instructions */}
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
            {instructions ? (
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>{instructions}</Text>
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Tap to add instructions for this order...
              </Text>
            )}
          </TouchableOpacity>
        </View>

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

      {/* Bottom Action Bar */}
      {status === 'pending' && (
        <View style={[styles.actionBar, { paddingBottom: insets.bottom + 10 }]}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Ionicons name="close-circle" size={18} color="#FF0000" />
            <Text style={styles.rejectText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.payButton}
            onPress={() => console.log('Proceed to confirm')}
          >
            <View style={styles.payContent}>
              <Ionicons name="checkmark-circle" size={16} color="#fff" />
              <Text style={styles.payText}>
                Confirm ₹{totalAmount.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderSummary;

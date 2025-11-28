import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from "../../../theme/appColors"
import {styles} from "./styles"
const PaymentSuccessScreen = ({ navigation, route }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const orderDetails = route.params?.orderDetails || {
    orderId: '#ORD-2025-001',
    totalAmount: '35.82',
    customerName: 'Niti Patel',
    deliveryDate: '2025-09-16',
  };

  useEffect(() => {
    // Start animations
    Animated.sequence([
      // Success checkmark animation
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      // Fade in text and details
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();

    // Auto navigate after 4 seconds
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.successCircle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LottieView
            source={require("../../../assets/lottie/success.json")}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
          />
        </Animated.View>

        {/* Success Text */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>
            Your order has been confirmed
          </Text>
        </Animated.View>

        {/* Order Details Card */}
        <Animated.View
          style={[
            styles.detailsCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.detailRow}>
            <Ionicons name="receipt-outline" size={20} color={appColors.blue} />
            <Text style={styles.detailLabel}>Order ID:</Text>
            <Text style={styles.detailValue}>{orderDetails.orderId}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={20} color={appColors.blue} />
            <Text style={styles.detailLabel}>Customer:</Text>
            <Text style={styles.detailValue}>{orderDetails.customerName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color={appColors.blue} />
            <Text style={styles.detailLabel}>Delivery:</Text>
            <Text style={styles.detailValue}>{orderDetails.deliveryDate}</Text>
          </View>

          <View style={[styles.detailRow, styles.amountRow]}>
            <Ionicons name="wallet-outline" size={20} color={appColors.blue} />
            <Text style={styles.detailLabel}>Amount Paid:</Text>
            <Text style={styles.amountValue}>₹{orderDetails.totalAmount}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Redirecting to home in a moment...
            </Text>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  { width: progressWidth },
                ]}
              />
            </View>
          </View>
        </Animated.View>

        {/* Next Steps */}
        <Animated.View
          style={[
            styles.nextSteps,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.nextStepsTitle}>What's Next?</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <View style={styles.stepIcon}>
                <Ionicons name="shirt-outline" size={16} color="#fff" />
              </View>
              <Text style={styles.stepText}>We'll process your laundry items</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepIcon}>
                <Ionicons name="notifications-outline" size={16} color="#fff" />
              </View>
              <Text style={styles.stepText}>Get real-time updates on your order</Text>
            </View>
            <View style={styles.stepItem}>
              <View style={styles.stepIcon}>
                <Ionicons name="time-outline" size={16} color="#fff" />
              </View>
              <Text style={styles.stepText}>Expected delivery on {orderDetails.deliveryDate}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};


export default PaymentSuccessScreen;
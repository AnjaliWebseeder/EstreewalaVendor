// SubscriptionPlansScreen.js
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Modal,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { styles } from "./styles"
import appColors from '../../theme/appColors';
import { BackIcon } from '../../assets/Icons/backIcon';
import { VendorContext } from '../../utils/context/vendorContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  getSubscriptionPlans, 
  createSubscription, 
  verifySubscription,
  clearSubscriptionError 
} from "../../redux/slices/subscriptionSlice"

const { height } = Dimensions.get('window');

const SubscriptionPlansScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { 
    plans, 
    loading, 
    creating, 
    verifying, 
    error,
    currentOrder 
  } = useSelector((state) => state.subscription);
  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('monthly');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const { params } = route?.params || {}; 
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(height));
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const { completeSubscription } = useContext(VendorContext);
  const insets = useSafeAreaInsets();

  // Load subscription plans on component mount
  useEffect(() => {
    dispatch(getSubscriptionPlans());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      dispatch(clearSubscriptionError());
    }
  }, [error]);

  // Animation effects
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Transform API plans to UI format
  const transformPlans = () => {
    if (!plans) return [];

    return Object.keys(plans).map(planKey => {
      const plan = plans[planKey];
      const icons = {
        'A': 'iron',
        'B': 'local-laundry-service', 
        'C': 'dry-cleaning',
        'D': 'star',
        'E': 'layers'
      };
      
      const colors = {
        'A': '#4A90E2',
        'B': '#50C878',
        'C': '#FF6B6B',
        'D': '#FFA500',
        'E': '#9B59B6'
      };

      return {
        code: planKey,
        name: plan.name,
        description: `Includes: ${plan.services.join(', ')}`,
        features: plan.services,
        color: colors[planKey] || '#4A90E2',
        icon: icons[planKey] || 'star',
        popular: planKey === 'B' || planKey === 'D',
        apiData: plan
      };
    });
  };

  const durations = [
    { 
      code: 'monthly', 
      label: 'Monthly', 
      days: '30 days', 
      freeDays: null, 
      saving: 0,
      badge: null
    },
    { 
      code: 'quarterly', 
      label: 'Quarterly', 
      days: '105 days', 
      freeDays: '15 days free', 
      saving: 10,
      badge: 'Popular'
    },
    { 
      code: 'half-yearly', 
      label: 'Half Yearly', 
      days: '210 days', 
      freeDays: '30 days free', 
      saving: 15,
      badge: 'Best Value'
    },
    { 
      code: 'yearly', 
      label: 'Yearly', 
      days: '405 days', 
      freeDays: '45 days free', 
      saving: 20,
      badge: 'Smart Saver'
    },
  ];

  // Get selected plan price - FIXED: Use the actual selected plan data
  const getSelectedPlanPrice = () => {
    if (!selectedPlan || !selectedDuration || !plans) return 0;
    
    const plan = plans[selectedPlan];
    if (!plan || !plan.durations || !plan.durations[selectedDuration]) return 0;
    
    return plan.durations[selectedDuration].price;
  };

  const showToast = (text, type = 'info') => {
    setMessage({ text, type });
    setShowMessage(true);
    
    Animated.spring(slideAnim, {
      toValue: height - 180,
      duration: 400,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      hideToast();
    }, 3000);
  };

  const hideToast = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setShowMessage(false);
    });
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.code);
    setSelectedPlanDetails(plan);
    showToast(`${plan.name} selected!`, 'success');
  };

  const handleSubscribe = async () => {
    if (selectedPlan && selectedDuration) {
      try {
        // Create subscription order
        const result = await dispatch(createSubscription({
          planType: selectedPlan,
          duration: selectedDuration
        })).unwrap();

        if (result.success) {
          console.log('✅ Subscription order created:', result);
          setShowPaymentModal(true);
        }
      } catch (error) {
        console.log('❌ Subscription creation failed:', error);
        showToast('Failed to create subscription order', 'error');
      }
    } else {
      showToast('Please select a plan and duration first!', 'warning');
    }
  };

  const initiateRazorpayPayment = async () => {
    const selectedPrice = getSelectedPlanPrice();
    
    if (!selectedPrice || selectedPrice === 0) {
      showToast('Invalid plan price', 'error');
      return;
    }

    try {
      console.log('💰 Razorpay Payment Details:', {
        selectedPrice: selectedPrice,
        plan: selectedPlan,
        duration: selectedDuration
      });

      const options = {
        description: `${selectedPlanDetails?.name} - ${selectedDuration}`,
        image: 'https://your-logo-url.com/logo.png',
        currency: 'INR',
        key: 'rzp_test_RWlnXOheEtSTbA', // Use the Razorpay key from your API response or hardcode it
        amount: selectedPrice * 100, // Convert to paise using selectedPrice
        name: 'Estreewalla',
        order_id: `order_${Date.now()}`, // Generate a temporary order ID
        prefill: {
          email: 'vendor@estreewalla.com',
          contact: '+919876543210',
          name: 'Vendor Name',
        },
        theme: { color: appColors.secondary },
        notes: {
          planType: selectedPlan,
          duration: selectedDuration
        }
      };

      // If we have a currentOrder from API, use its order_id and key
      if (currentOrder) {
        options.order_id = currentOrder.orderId;
        options.key = currentOrder.key;
      }

      console.log('🔧 Razorpay Options:', options);

      const razorpayResponse = await RazorpayCheckout.open(options);
      console.log('✅ Razorpay Response:', razorpayResponse);
      
      // Verify payment
      await handlePaymentVerification(razorpayResponse);
      
    } catch (error) {
      console.log('❌ Razorpay error:', error);
      if (error.description !== 'Payment Cancelled') {
        showToast('Payment failed! Please try again.', 'error');
      } else {
        showToast('Payment cancelled', 'info');
      }
    }
  };

  const handlePaymentVerification = async (razorpayResponse) => {
    try {
      console.log('🔍 Verifying payment...', razorpayResponse);
      
      const verificationData = {
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        planType: selectedPlan,
        duration: selectedDuration
      };

      console.log('📦 Verification Data:', verificationData);

      const result = await dispatch(verifySubscription(verificationData)).unwrap();

      if (result.success) {
        console.log('✅ Payment verified successfully!');
        setShowPaymentModal(false);
        showToast('Subscription activated successfully!', 'success');
        
        // Complete subscription in context
        await completeSubscription();
        
        // Navigate to main screen
        navigation.replace('Main');
      }
    } catch (error) {
      console.log('❌ Payment verification failed:', error);
      showToast('Payment verification failed! Please contact support.', 'error');
    }
  };

  const handleSkip = async () => {
    try {
      await completeSubscription();
      navigation.replace('Main');
    } catch (error) {
      console.log('Error skipping subscription:', error);
      showToast('Error completing subscription', 'error');
    }
  };

  const handleViewDetails = (plan) => {
    setSelectedPlanDetails(plan);
    setShowDetailsModal(true);
  };

  const PlanCard = ({ plan }) => {
    const isSelected = selectedPlan === plan.code;
    const price = plan.apiData?.durations?.[selectedDuration]?.price || 0;
    const durationInfo = durations.find(d => d.code === selectedDuration);

    return (
      <Animated.View 
        style={[
          styles.planCard,
          isSelected && styles.selectedPlanCard,
          plan.popular && styles.popularPlanCard,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        {plan.popular && (
          <View style={styles.popularRibbon}>
            <Text style={styles.popularRibbonText}>🔥 MOST POPULAR</Text>
          </View>
        )}

        <View style={styles.planHeader}>
          <View style={[styles.planIcon, { backgroundColor: plan.color }]}>
            <Icon name={plan.icon} size={24} color="#FFFFFF" />
          </View>
          <View style={styles.planTitle}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planDescription}>{plan.description}</Text>
          </View>
          {isSelected && (
            <View style={styles.selectedIndicator}>
              <Icon name="check-circle" size={24} color={appColors.secondary} />
            </View>
          )}
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceMain}>
            <Text style={styles.price}>₹{price}</Text>
            <Text style={styles.durationLabel}>{durationInfo.label}</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.durationDays}>{durationInfo.days}</Text>
            {durationInfo.freeDays && (
              <Text style={styles.freeDaysText}>+ {durationInfo.freeDays}</Text>
            )}
          </View>
        </View>

        {durationInfo.saving > 0 && (
          <View style={styles.savingBadge}>
            <Text style={styles.savingText}>Save {durationInfo.saving}%</Text>
          </View>
        )}

        <View style={styles.featuresList}>
          {plan.features.map((feature, idx) => (
            <View key={idx} style={styles.featureItem}>
              <Icon name="check" size={14} color={appColors.secondary} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => handleViewDetails(plan)}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.selectButton,
              isSelected && styles.selectedButton
            ]}
            onPress={() => handlePlanSelect(plan)}
          >
            <Text style={[
              styles.selectButtonText,
              isSelected && styles.selectedButtonText
            ]}>
              {isSelected ? 'Selected' : 'Select Plan'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const DurationSelector = () => (
    <View style={styles.durationSection}>
      <Text style={styles.sectionTitle}>Choose Duration</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.durationScrollContent}
      >
        {durations.map((duration) => {
          const isSelected = selectedDuration === duration.code;
          return (
            <TouchableOpacity
              key={duration.code}
              style={[
                styles.durationCard,
                isSelected && styles.selectedDurationCard
              ]}
              onPress={() => setSelectedDuration(duration.code)}
              activeOpacity={0.8}
            >
              {duration.badge && (
                <View style={styles.durationBadge}>
                  <Text style={styles.durationBadgeText}>{duration.badge}</Text>
                </View>
              )}
              
              <Text style={[
                styles.durationLabel,
                isSelected && styles.selectedDurationLabel
              ]}>
                {duration.label}
              </Text>
              
              <Text style={styles.durationDays}>{duration.days}</Text>
              
              {duration.freeDays && (
                <View style={styles.freeDaysTag}>
                  <Text style={styles.freeDaysText}>+{duration.freeDays}</Text>
                </View>
              )}
              
              {duration.saving > 0 && (
                <View style={styles.savingTag}>
                  <Text style={styles.savingTagText}>Save {duration.saving}%</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  // if (loading && !plans) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <View style={styles.loadingContainer}>
  //         <Text>Loading plans...</Text>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  const uiPlans = transformPlans();
  const selectedPrice = getSelectedPlanPrice();

  console.log('💰 Price Debug:', {
    selectedPlan,
    selectedDuration,
    selectedPrice,
    currentOrderAmount: currentOrder?.amount
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleRow}>
            {params && (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <BackIcon size={13}/>
              </TouchableOpacity>
            )}
            <Icon name="diamond" size={24} color="#FFD700" />
            <Text style={styles.headerTitle}>Premium Plans</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Choose the perfect laundry plan for your needs
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => params ? navigation.goBack() : handleSkip()}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Promo Banner */}
      <View style={styles.promoBanner}>
        <View style={styles.promoContent}>
          <Icon name="flash-on" size={20} color="#FFD700" />
          <Text style={styles.promoText}>
            Special Launch Offer • Limited Time
          </Text>
        </View>
        <View style={styles.promoBadge}>
          <Text style={styles.promoBadgeText}>EXCLUSIVE</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: selectedPlan ? 130 : 20}}
      >
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          <View style={styles.plansGrid}>
            {uiPlans.map((plan) => (
              <PlanCard key={plan.code} plan={plan} />
            ))}
          </View>
        </View>

        <DurationSelector />

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqGrid}>
            <View style={styles.faqCard}>
              <Icon name="schedule" size={24} color={appColors.secondary} />
              <Text style={styles.faqQuestion}>When does subscription start?</Text>
              <Text style={styles.faqAnswer}>
                Immediately after payment confirmation with instant access to all features.
              </Text>
            </View>
            
            <View style={[styles.faqCard,{width:"40%"}]}>
              <Icon name="swap-horiz" size={24} color={appColors.secondary} />
              <Text style={styles.faqQuestion}>Can I change plans later?</Text>
              <Text style={styles.faqAnswer}>
                Yes! Upgrade or downgrade anytime. Changes apply to the next billing cycle.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      {selectedPlan && (
        <View style={[styles.footer,{paddingBottom:insets.bottom + 10}]}>
          <View style={styles.footerSummary}>
            <View>
              <Text style={styles.selectedPlanText}>
                {uiPlans.find(p => p.code === selectedPlan)?.name}
              </Text>
              <Text style={styles.selectedPlanDuration}>
                {durations.find(d => d.code === selectedDuration)?.label} • 
                ₹{selectedPrice}
              </Text>
            </View>
            <Text style={styles.finalPrice}>
              ₹{selectedPrice}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.subscribeButton}
            onPress={handleSubscribe}
            disabled={creating}
          >
            <Text style={styles.subscribeButtonText}>
              {creating ? 'Creating...' : 'Subscribe Now'}
            </Text>
            <Icon name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* View Details Modal */}
      <Modal
        visible={showDetailsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlanDetails && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    <View style={[styles.planIcon, { backgroundColor: selectedPlanDetails.color }]}>
                      <Icon name={selectedPlanDetails.icon} size={24} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text style={styles.modalTitle}>{selectedPlanDetails.name}</Text>
                      <Text style={styles.modalDescription}>{selectedPlanDetails.description}</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowDetailsModal(false)}
                  >
                    <Icon name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                  {/* Pricing Table */}
                  <View style={styles.pricingTable}>
                    <Text style={styles.pricingTitle}>Complete Pricing</Text>
                    {durations.map((duration) => (
                      <View key={duration.code} style={styles.pricingRow}>
                        <View style={styles.pricingLeft}>
                          <Text style={styles.pricingDuration}>{duration.label}</Text>
                          <Text style={styles.pricingDays}>{duration.days}</Text>
                          {duration.freeDays && (
                            <Text style={styles.freeText}>+ {duration.freeDays}</Text>
                          )}
                        </View>
                        <View style={styles.pricingRight}>
                          <Text style={styles.pricingAmount}>
                            ₹{selectedPlanDetails.apiData?.durations?.[duration.code]?.price}
                          </Text>
                          {duration.saving > 0 && (
                            <Text style={styles.savingText}>Save {duration.saving}%</Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* Features Section */}
                  <View style={styles.featuresSection}>
                    <Text style={styles.featuresTitle}>What's Included:</Text>
                    {selectedPlanDetails.features.map((feature, index) => (
                      <View key={index} style={styles.modalFeatureItem}>
                        <Icon name="check-circle" size={18} color="#10B981" />
                        <Text style={styles.modalFeatureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Benefits Section */}
                  <View style={styles.benefitsSection}>
                    <Text style={styles.benefitsTitle}>Plan Benefits</Text>
                    <View style={styles.benefitItem}>
                      <Icon name="local-shipping" size={20} color={appColors.secondary} />
                      <Text style={styles.benefitText}>Free pickup and delivery</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Icon name="support-agent" size={20} color={appColors.secondary} />
                      <Text style={styles.benefitText}>24/7 customer support</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Icon name="security" size={20} color={appColors.secondary} />
                      <Text style={styles.benefitText}>Quality guaranteed</Text>
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={() => setShowDetailsModal(false)}
                  >
                    <Text style={styles.secondaryButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={() => {
                      setShowDetailsModal(false);
                      handlePlanSelect(selectedPlanDetails);
                    }}
                  >
                    <Text style={styles.primaryButtonText}>Select This Plan</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Razorpay Payment Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.paymentModalContent]}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Complete Payment</Text>
                <Text style={styles.paymentAmount}>
                  ₹{selectedPrice}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setShowPaymentModal(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.paymentPlanInfo}>
              <Icon name="verified" size={40} color={appColors.secondary} />
              <Text style={styles.paymentPlanName}>{selectedPlanDetails?.name}</Text>
              <Text style={styles.paymentDuration}>
                {durations.find(d => d.code === selectedDuration)?.label} Plan
              </Text>
              <Text style={styles.paymentValidity}>
                {durations.find(d => d.code === selectedDuration)?.days} validity
              </Text>
            </View>

            <View style={styles.paymentFeatures}>
              <View style={styles.paymentFeature}>
                <Icon name="check-circle" size={16} color="#10B981" />
                <Text style={styles.paymentFeatureText}>Instant activation</Text>
              </View>
              <View style={styles.paymentFeature}>
                <Icon name="check-circle" size={16} color="#10B981" />
                <Text style={styles.paymentFeatureText}>Secure payment</Text>
              </View>
              <View style={styles.paymentFeature}>
                <Icon name="check-circle" size={16} color="#10B981" />
                <Text style={styles.paymentFeatureText}>24/7 support</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.razorpayButton}
              onPress={initiateRazorpayPayment}
              disabled={verifying}
            >
              <View style={styles.razorpayButtonContent}>
                <Icon name="payment" size={24} color="#FFFFFF" />
                <Text style={styles.razorpayButtonText}>
                  {verifying ? 'Processing...' : `Pay ₹${selectedPrice}`}
                </Text>
              </View>
              {!verifying && <Icon name="lock" size={16} color="#FFFFFF" />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowPaymentModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel Payment</Text>
            </TouchableOpacity>

            <Text style={styles.securityText}>
              🔒 Your payment is secure and encrypted
            </Text>
          </View>
        </View>
      </Modal>

      {/* Toast Message */}
      {showMessage && (
        <Animated.View 
          style={[
            styles.toast,
            { 
              transform: [{ translateY: slideAnim }],
              backgroundColor: message.type === 'success' ? '#10B981' : 
                            message.type === 'warning' ? '#F59E0B' : 
                            message.type === 'error' ? '#EF4444' : appColors.secondary
            }
          ]}
        >
          <Icon 
            name={
              message.type === 'success' ? 'check-circle' :
              message.type === 'warning' ? 'warning' :
              message.type === 'error' ? 'error' : 'info'
            } 
            size={20} 
            color="#FFFFFF" 
          />
          <Text style={styles.toastText}>{message.text}</Text>
          <TouchableOpacity onPress={hideToast}>
            <Icon name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionPlansScreen;
// SubscriptionPlansScreen.js
import React, { useContext, useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./styles"
import appColors from '../../theme/appColors';
import { setAppLaunched } from '../../utils/context/appLaunchStatus';
import { BackIcon } from '../../assets/Icons/backIcon';
import { VendorContext } from '../../utils/context/vendorContext';

const {  height } = Dimensions.get('window');

// Static Colors
const COLORS = {
  primary: '#2563EB',
  secondary: '#1E40AF',
  white: '#FFFFFF',
  black: '#000000',
  background: '#F8FAFD',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  border: '#E5E7EB',
  cardBackground: '#FFFFFF',
  promo: '#2D3748',
  gold: '#FFD700',
  green: '#48BB78',
  orange: '#ED8936',
  lightBlue: '#F0F7FF',
  lightOrange: '#FEEBC8',
};

const SubscriptionPlansScreen = ({ navigation , route }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('M'); // Default to Monthly
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

  React.useEffect(() => {
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

  const plans = [
    {
      code: 'P',
      name: 'Basic Press',
      description: 'Professional Ironing Service',
      features: ['Professional Ironing', 'Steam Press', 'Wrinkle Removal', 'Same Day Service', 'Free Pickup'],
      color: '#4A90E2',
      icon: 'iron',
      popular: false,
    },
    {
      code: 'W',
      name: 'Wash Pro',
      description: 'Complete Washing Solution',
      features: ['Machine Wash', 'Premium Detergent', 'Fabric Softener', 'Stain Treatment', 'Quick Dry'],
      color: '#50C878',
      icon: 'local-laundry-service',
      popular: true,
    },
    {
      code: 'DC',
      name: 'Dry Clean Elite',
      description: 'Premium Dry Cleaning',
      features: ['Chemical Cleaning', 'Stain Removal', 'Premium Packaging', 'Expert Handling', 'Odor Removal'],
      color: '#FF6B6B',
      icon: 'dry-cleaning',
      popular: false,
    },
    {
      code: 'A+B+C+Others',
      name: 'Ultimate Bundle',
      description: 'All-in-One Package',
      features: ['All Services Included', 'Priority Service', 'Free Pickup & Delivery', 'Dedicated Manager', 'Express Service'],
      color: '#FFA500',
      icon: 'star',
      popular: true,
    },
    {
      code: 'A+B',
      name: 'Wash & Press',
      description: 'Most Popular Combo',
      features: ['Washing + Ironing', 'Quick Service', 'Budget Friendly', 'Quality Assurance', 'Eco-Friendly'],
      color: '#9B59B6',
      icon: 'layers',
      popular: false,
    },
  ];

  const durations = [
    { 
      code: 'M', 
      label: 'Monthly', 
      days: '30 days', 
      freeDays: null, 
      saving: 0,
      badge: null
    },
    { 
      code: 'Q', 
      label: 'Quarterly', 
      days: '90 days', 
      freeDays: '15 days free', 
      saving: 15,
      badge: 'Popular'
    },
    { 
      code: 'HY', 
      label: 'Half Yearly', 
      days: '180 days', 
      freeDays: '30 days free', 
      saving: 25,
      badge: 'Best Value'
    },
    { 
      code: 'Y', 
      label: 'Yearly', 
      days: '365 days', 
      freeDays: '45 days free', 
      saving: 35,
      badge: 'Smart Saver'
    },
  ];

  const prices = {
    'P': { M: 99, Q: 255, HY: 450, Y: 780 },
    'W': { M: 199, Q: 510, HY: 890, Y: 1550 },
    'DC': { M: 299, Q: 765, HY: 1340, Y: 2320 },
    'A+B+C+Others': { M: 499, Q: 1275, HY: 2240, Y: 3880 },
    'A+B': { M: 249, Q: 637, HY: 1120, Y: 1940 },
  };

  const paymentMethods = [
    { id: 1, name: 'Credit Card', icon: 'credit-card', color: appColors.secondary },
    { id: 2, name: 'Debit Card', icon: 'card-membership', color: appColors.secondary },
    { id: 3, name: 'UPI', icon: 'smartphone', color: appColors.secondary },
    { id: 4, name: 'Net Banking', icon: 'account-balance', color: appColors.secondary },
    { id: 5, name: 'Wallet', icon: 'account-balance-wallet', color: appColors.secondary },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.code);
    setSelectedPlanDetails(plan);
    showToast(`${plan.name} selected!`, 'success');
  };

  const handleSubscribe = () => {
    if (selectedPlan && selectedDuration) {
      setShowPaymentModal(true);
       
    } else {
      showToast('Please select a plan and duration first!', 'warning');
    }
  };

const handlePayment = async (paymentMethod) => {
    const amount = prices[selectedPlan][selectedDuration];
    const planName = plans.find(p => p.code === selectedPlan)?.name;
    
    showToast(`Processing ₹${amount} payment via ${paymentMethod.name}...`, 'info');
    
    // Simulate payment processing
    setTimeout(async () => {
      try {
        setShowPaymentModal(false);
        showToast(`Payment successful! ${planName} activated.`, 'success');
        
        // Use the context function instead of direct setAppLaunched
        await completeSubscription();
        
        // Navigate to home after successful payment
        navigation.replace('Main');
      } catch (error) {
        console.log('Error completing subscription:', error);
        showToast('Payment failed! Please try again.', 'error');
      }
    }, 3000);
  };

  const handleSkip = async () => {
    try {
      // Use the context function for consistency
      await completeSubscription();
      navigation.replace('Main');
    } catch (error) {
      console.log('Error skipping subscription:', error);
    }
  };

  const handleViewDetails = (plan) => {
    setSelectedPlanDetails(plan);
    setShowDetailsModal(true);
  };



  const PlanCard = ({ plan }) => {
    const isSelected = selectedPlan === plan.code;
    const price = prices[plan.code]?.[selectedDuration] || 0;
    const durationInfo = durations.find(d => d.code === selectedDuration);
    const monthlyEquivalent = Math.round(price / (durationInfo.days.match(/\d+/)[0] / 30));

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

  const PaymentMethodCard = ({ method }) => (
    <TouchableOpacity
      style={styles.paymentMethodCard}
      onPress={() => handlePayment(method)}
      activeOpacity={0.7}
    >
      <View style={styles.paymentIcon}>
        <Icon name={method.icon} size={18} color={appColors.secondary} />
      </View>
      <Text style={styles.paymentMethodName}>{method.name}</Text>
      <Icon name="chevron-right" size={20} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  backgroundColor="transparent" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
      
          <View style={styles.headerTitleRow}>
         {params &&  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <BackIcon size={13}/>
                  </TouchableOpacity>}
            <Icon name="diamond" size={24} color={COLORS.gold} />
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
          <Icon name="flash-on" size={20} color={COLORS.gold} />
          <Text style={styles.promoText}>
            Special Offer • Ends Dec 31, 2025
          </Text>
        </View>
        <View style={styles.promoBadge}>
          <Text style={styles.promoBadgeText}>LIMITED TIME</Text>
        </View>
      </View>

      {/* Main Content - CORRECTED ORDER */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: selectedPlan ? 130 : 20}}
      >
        {/* PLAN CATEGORIES - NOW AT TOP */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          <View style={styles.plansGrid}>
            {plans.map((plan, index) => (
              <PlanCard key={plan.code} plan={plan} />
            ))}
          </View>
        </View>

        {/* DURATION OPTIONS - NOW BELOW PLANS */}
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
            
            <View style={styles.faqCard}>
              <Icon name="pause" size={24} color={appColors.secondary} />
              <Text style={styles.faqQuestion}>Inactive after 3 months?</Text>
              <Text style={styles.faqAnswer}>
                Accounts are marked inactive after 3 months of no activity. Easy reactivation available.
              </Text>
            </View>
            
            <View style={styles.faqCard}>
              <Icon name="swap-horiz" size={24} color={appColors.secondary} />
              <Text style={styles.faqQuestion}>Can I change plans later?</Text>
              <Text style={styles.faqAnswer}>
                Yes! Upgrade or downgrade anytime. Changes apply to the next billing cycle.
              </Text>
            </View>
            
            <View style={styles.faqCard}>
              <Icon name="support" size={24} color={appColors.secondary} />
              <Text style={styles.faqQuestion}>Need help with subscription?</Text>
              <Text style={styles.faqAnswer}>
                24/7 customer support available for all subscription-related queries.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      {selectedPlan && (
        <View style={styles.footer}>
          <View style={styles.footerSummary}>
            <View>
              <Text style={styles.selectedPlanText}>
                {plans.find(p => p.code === selectedPlan)?.name}
              </Text>
              <Text style={styles.selectedPlanDuration}>
                {durations.find(d => d.code === selectedDuration)?.label} • 
                ₹{prices[selectedPlan][selectedDuration]}
              </Text>
            </View>
            <Text style={styles.finalPrice}>
              ₹{prices[selectedPlan][selectedDuration]}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.subscribeButton}
            onPress={handleSubscribe}
          >
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
            <Icon name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Toast Message */}
      {showMessage && (
        <Animated.View 
          style={[
            styles.toast,
            { 
              transform: [{ translateY: slideAnim }],
              backgroundColor: message.type === 'success' ? COLORS.success : 
                            message.type === 'warning' ? COLORS.warning : 
                            message.type === 'error' ? COLORS.error : appColors.secondary
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

      {/* Plan Details Modal */}
      <Modal
        visible={showDetailsModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlanDetails && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>{selectedPlanDetails.name}</Text>
                    <Text style={styles.modalDescription}>{selectedPlanDetails.description}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowDetailsModal(false)}
                  >
                    <Icon name="close" size={24} color={COLORS.textSecondary} />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                  <View style={styles.pricingTable}>
                    <Text style={styles.pricingTitle}>Complete Pricing</Text>
                    {durations.map((duration) => (
                      <View key={duration.code} style={styles.pricingRow}>
                        <View style={styles.pricingLeft}>
                          <Text style={styles.pricingDuration}>{duration.label}</Text>
                          <Text style={styles.pricingDays}>{duration.days}</Text>
                        </View>
                        <View style={styles.pricingRight}>
                          <Text style={styles.pricingAmount}>
                            ₹{prices[selectedPlanDetails.code][duration.code]}
                          </Text>
                          {duration.freeDays && (
                            <Text style={styles.freeText}>+{duration.freeDays}</Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>

                  <View style={styles.featuresSection}>
                    <Text style={styles.featuresTitle}>What's Included:</Text>
                    {selectedPlanDetails.features.map((feature, index) => (
                      <View key={index} style={styles.modalFeatureItem}>
                        <Icon name="check-circle" size={18} color={COLORS.success} />
                        <Text style={styles.modalFeatureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>

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

      {/* Payment Methods Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Complete Payment</Text>
                <Text style={styles.paymentAmount}>
                  ₹{selectedPlan ? prices[selectedPlan][selectedDuration] : 0}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setShowPaymentModal(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.paymentPlan}>
              {selectedPlanDetails?.name} • {durations.find(d => d.code === selectedDuration)?.label}
            </Text>

            <ScrollView style={styles.paymentMethodsList} showsVerticalScrollIndicator={false}>
              {paymentMethods.map((method) => (
                <PaymentMethodCard key={method.id} method={method} />
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => { 
                setShowPaymentModal(false)
               params ? navigation.goBack() : navigation.replace('Main')
                setAppLaunched();
              }}
            >
              <Text style={styles.cancelButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SubscriptionPlansScreen;
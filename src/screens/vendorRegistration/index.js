// VendorRegistration.js
import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { VendorContext } from '../../utils/context/vendorContext';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../../theme/appColors';
import TitleSubtitle from '../../otherComponent/vendorRegistration/titleSubTitle';
import VendorOwnCard from '../../otherComponent/vendorRegistration/vendorOwnerCard';
import SetPrice from './setPrice';
import FilterCategoryModal from '../../otherComponent/vendorRegistration/filterCategoryModal';
import BusinessDetails from './businessDetail';
import { BackIcon } from '../../assets/Icons/backIcon';
import {
  completeStep1,
  completeStep2,
  completeStep3,
  completeStep4,
  completeStep5,
  getCompletionStatus,
} from '../../redux/slices/vendorOnboardingSlice';
import { useToast } from '../../utils/context/toastContext';
import { getVendorServices } from '../../redux/slices/vendorSlice';

const steps = ['Business', 'Owner', 'Services', 'Pricing', 'Delivery'];

const filters = [
  { key: 'all', label: 'All Items', icon: 'grid-outline' },
  { key: 'mens', label: "Men's Wear", icon: 'man-outline' },
  { key: 'womens', label: "Women's Wear", icon: 'woman-outline' },
  { key: 'kids', label: 'Kids Wear', icon: 'heart-outline' },
];

const VendorRegistration = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { services, servicesMeta } = useSelector(state => state.vendor);

  useEffect(() => {
    dispatch(getVendorServices());
  }, []);

  const {
    // services,
    selectedServiceIds,
    toggleServiceCategory,
    deliveryOption,
    setDeliveryOption,
    owners,
    getAllPricingData,
    completeVendorRegistration,
    formData,
    updateBusinessDetails,
    updateOwners,
    updateServices,
    updatePricing,
    updateDeliveryOption,
  } = useContext(VendorContext);

  const { currentStep: apiCurrentStep, loading } = useSelector(
    state => state.vendorOnboarding,
  );

  useEffect(() => {
    if (services?.length) {
      updateServices(services.map(s => s.id));
    }
  }, [services]);

  const { fromScreen } = route?.params || {};
  const [localCurrentStep, setLocalCurrentStep] = useState(0);
  const [completedStep, setCompletedStep] = useState(0);
  const [localError, setLocalError] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  // const { businessName, selectedLocation, pricingData } = formData;
  const { businessName, selectedLocation, city, pricingData } = formData;

  // Debug logs to track state changes
  useEffect(() => {
    console.log('🔄 Current Step:', localCurrentStep);
    console.log('🏢 Business Data:', {
      businessName,
      selectedLocation: selectedLocation?.address,
    });
    console.log('👥 Owners Count:', owners.length);
    console.log('🔧 Selected Services:', selectedServiceIds);
    console.log(
      '💰 Pricing Data:',
      pricingData ? 'Available' : 'Not Available',
    );
    console.log('🚚 Delivery Option:', deliveryOption);
  }, [
    localCurrentStep,
    businessName,
    selectedLocation,
    owners,
    selectedServiceIds,
    pricingData,
    deliveryOption,
  ]);

  const resolveStepFromLocalData = () => {
    if (!businessName || !selectedLocation || !city) return 0;
    if (!owners || owners.length === 0) return 1;
    if (!selectedServiceIds || selectedServiceIds.length === 0) return 2;
    if (!pricingData) return 3;
    return 4;
  };

  const handleBusinessNameChange = text => {
    updateBusinessDetails(text, selectedLocation, city);
  };

  const handleCityChange = text => {
    updateBusinessDetails(businessName, selectedLocation, text);
  };

  const handleLocationChange = location => {
    updateBusinessDetails(businessName, location, city);
  };

  const handlePricingUpdate = useCallback(
    updatedPricing => {
      console.log('📊 Pricing updated in VendorRegistration:', updatedPricing);
      updatePricing(updatedPricing);
    },
    [updatePricing],
  );

  // Load vendor completion status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await dispatch(getCompletionStatus()).unwrap();

        const apiCompletedStep = res?.completionStep || 0;
        const derivedStep = resolveStepFromLocalData();

        // 🔐 SAFE STEP (no jumping)
        const safeStep = Math.min(
          apiCompletedStep,
          derivedStep,
          steps.length - 1,
        );

        console.log('API step:', apiCompletedStep);
        console.log('Derived step:', derivedStep);
        console.log('Final safe step:', safeStep);

        setCompletedStep(apiCompletedStep);
        setLocalCurrentStep(safeStep);

        if (res?.isComplete) {
          await completeVendorRegistration();
          showToast('Registration already complete!', 'success');
          navigation.replace('Main');
        }
      } catch (err) {
        console.log('Error fetching completion status:', err);
        showToast(err?.message, 'error');
      }
    };

    fetchStatus();
  }, [dispatch]);

  // If Redux updates step externally
  // useEffect(() => {
  //   if (apiCurrentStep !== undefined) {
  //     setLocalCurrentStep(apiCurrentStep);
  //   }
  // }, [apiCurrentStep]);

  const extractCityFromAddress = (address = '') => {
    if (!address) return '';

    const parts = address
      .split(',')
      .map(p => p.trim())
      .filter(Boolean);

    // Indian address pattern:
    // [Area, City, Taluka, District, State, Pincode, Country]

    // 1️⃣ Most reliable: second part
    if (parts.length >= 2) {
      return parts[1];
    }

    // 2️⃣ Fallback: remove unwanted keywords
    const blacklist = ['talhsil', 'tahsil', 'district', 'state', 'india'];
    const clean = parts.find(
      p => !blacklist.some(b => p.toLowerCase().includes(b)),
    );

    return clean || '';
  };

  useEffect(() => {
    if (formData.selectedLocation?.address && !formData.city) {
      const extractedCity = extractCityFromAddress(
        formData.selectedLocation.address,
      );

      if (extractedCity) {
        console.log('🏙 Auto-filled city:', extractedCity);

        updateBusinessDetails(
          formData.businessName,
          formData.selectedLocation,
          extractedCity,
        );
      }
    }
  }, [formData.selectedLocation]);

  // Handle step progression
  const nextStep = async () => {
    setLocalError('');
    console.log('➡️ Next button clicked, current step:', localCurrentStep);

    try {
      // Validation using persisted form data
      let validationFailed = false;

      switch (localCurrentStep) {
        case 0:
          if (!formData.businessName.trim()) {
            setLocalError('Please enter Business Name');
            validationFailed = true;
          } else if (!formData.city?.trim()) {
            setLocalError('Please enter City');
            validationFailed = true;
          } else if (!formData.selectedLocation?.address) {
            setLocalError('Please select your laundry shop address');
            validationFailed = true;
          }
          break;

        case 1:
          if (owners.length === 0) {
            setLocalError('Please add at least one owner');
            validationFailed = true;
          }
          break;

        // Step 2: Services
        case 2:
          if (!services || services.length === 0) {
            setLocalError('No services available for your plan');
            validationFailed = true;
            break;
          }

          // 🔥 Subscription services are valid even if locked
          const serviceNames = services.map(s => s.name);

          if (serviceNames.length === 0) {
            setLocalError('No active services available');
            validationFailed = true;
            break;
          }
          break;

        case 3: {
          const pricing = formData.pricingData?.itemPricing;

          if (!pricing || Object.keys(pricing).length === 0) {
            setLocalError('Please set pricing for services');
            validationFailed = true;
            break;
          }

          // Active (unlocked) services
          const activeServiceNames = services
            .filter(s => !s.locked)
            .map(s => s.name);

          const servicesWithNoPrice = [];

          activeServiceNames.forEach(serviceName => {
            const servicePricing = pricing[serviceName];

            if (!servicePricing) {
              servicesWithNoPrice.push(serviceName);
              return;
            }

            let hasAtLeastOneValidPrice = false;

            Object.values(servicePricing).forEach(items => {
              items.forEach(item => {
                if (
                  item.price !== undefined &&
                  item.price !== null &&
                  item.price !== '' &&
                  Number(item.price) > 0
                ) {
                  hasAtLeastOneValidPrice = true;
                }
              });
            });

            if (!hasAtLeastOneValidPrice) {
              servicesWithNoPrice.push(serviceName);
            }
          });

          if (servicesWithNoPrice.length > 0) {
            showToast(
              `Please set at least one item price for ${servicesWithNoPrice[0]}`,
              'error',
            );
            validationFailed = true;
            break;
          }

          console.log(
            '✅ Pricing validation passed (at least one item per service)',
          );
          break;
        }

        case 4:
          if (!formData.deliveryOption) {
            setLocalError('Please select a delivery option');
            validationFailed = true;
          }
          break;
      }

      if (validationFailed) {
        console.log('❌ Validation failed for step:', localCurrentStep);
        return;
      }

      console.log('✅ Validation passed for step:', localCurrentStep);

      // API calls for each step
      switch (localCurrentStep) {
        case 0:
          await dispatch(
            completeStep1({
              businessName: formData.businessName.trim(),
              city: formData.city.trim(),
              address: formData.selectedLocation?.address,
              location: {
                lat: formData.selectedLocation?.latitude,
                lng: formData.selectedLocation?.longitude,
              },
            }),
          ).unwrap();
          break;

        case 1:
          const ownerData = formData.owners.map(o => ({
            firstName: o.firstName,
            lastName: o.lastName,
            primaryNumber: o.primary,
            whatsappNumber: o.whatsapp || o.primary,
            governmentId: o.governmentId,
          }));
          await dispatch(completeStep2({ owners: ownerData })).unwrap();
          break;

        case 2:
          // const serviceNames = services.filter(s => !s.locked).map(s => s.name);
          const serviceNames = services.map(s => s.name);
          console.log('✅ SERVICES FOR BACKEND (dynamic):', serviceNames);

          await dispatch(completeStep3({ services: serviceNames })).unwrap();
          break;

        case 3: {
          const pricing = formData.pricingData?.itemPricing;

          const filteredPricing = {};

          Object.entries(pricing).forEach(([serviceName, categories]) => {
            const filteredCategories = {};

            Object.entries(categories).forEach(([category, items]) => {
              const validItems = items.filter(
                item =>
                  item.price !== undefined &&
                  item.price !== null &&
                  item.price !== '' &&
                  Number(item.price) > 0,
              );

              if (validItems.length > 0) {
                filteredCategories[category] = validItems;
              }
            });

            if (Object.keys(filteredCategories).length > 0) {
              filteredPricing[serviceName] = filteredCategories;
            }
          });

          const finalPayload = {
            itemPricing: filteredPricing,
          };

          console.log('✅ Submitting FILTERED pricing data:', finalPayload);

          await dispatch(completeStep4(finalPayload)).unwrap();
          break;
        }

        case 4:
          await dispatch(
            completeStep5({ deliveryMethods: [formData.deliveryOption] }),
          ).unwrap();
          break;
      }

      // Move to next step
      if (localCurrentStep < steps.length - 1) {
        const nextStepIndex = localCurrentStep + 1;
        console.log('🔄 Moving to step:', nextStepIndex);
        setLocalCurrentStep(nextStepIndex);
      } else {
        console.log('🎉 All steps completed!');
      }
    } catch (error) {
      console.log('❌ Step progression error:', error);
      setLocalError(error.message || 'Failed to complete step');
      showToast(error.message || 'Failed to complete step', 'error');
    }
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      console.log('🚀 Submitting vendor registration...');
      await dispatch(
        completeStep5({ deliveryMethods: [deliveryOption] }),
      ).unwrap();

      if (fromScreen) {
        navigation.goBack();
      } else {
        navigation.navigate('Main');
        // await completeVendorRegistration();

        // // Let root navigator decide Main
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'VendorRegistration' }],
        // });
      }
    } catch (err) {
      console.log('❌ Submit error:', err);
      setLocalError(err.message || 'Submission failed');
      showToast(err.message || 'Submission failed', 'error');
    }
  };

  // Back button logic
  const prevStep = () => {
    if (localCurrentStep > 0) {
      const prevStepIndex = localCurrentStep - 1;
      console.log('🔙 Moving back to step:', prevStepIndex);
      setLocalCurrentStep(prevStepIndex);
      setLocalError('');
    } else {
      navigation.goBack();
    }
  };

  // Handle delivery option selection
  const handleDeliveryOptionSelect = option => {
    console.log('🚚 Delivery option selected:', option);
    setDeliveryOption(option);
    // Force immediate UI update by updating formData
    updateDeliveryOption(option);
  };

  const renderStepSlider = () => (
    <View style={styles.stepperContainer}>
      <View style={styles.stepsSegmentsContainer}>
        {steps.map((step, i) => {
          const isActive = i === localCurrentStep;
          const isDone = i < localCurrentStep;
          return (
            <View key={i} style={styles.stepWrapper}>
              <View
                style={[
                  styles.stepSegment,
                  isDone && styles.completedSegment,
                  isActive && styles.activeSegment,
                ]}
              />
              <Text
                style={[
                  styles.stepLabel,
                  isActive && styles.activeStepLabel,
                  isDone && styles.completedStepLabel,
                ]}
              >
                {step}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.mainHeader}>
        <View style={styles.headerStyle}>
          {/* Left side */}
          {fromScreen ? (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <BackIcon />
            </TouchableOpacity>
          ) : (
            // 🔥 Placeholder to keep title centered
            <View style={styles.backButtonPlaceholder} />
          )}

          {/* Title */}
          <Text style={styles.titleStyle}>
            {fromScreen ? 'Vendor Details' : 'Vendor Registration'}
          </Text>

          {/* Right side (already exists) */}
          <View style={styles.right} />
        </View>

        {renderStepSlider()}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        key={`step-${localCurrentStep}`} // Force re-render on step change
      >
        {/* Step 0: Business Details */}
        {localCurrentStep === 0 && (
          <BusinessDetails
            businessName={formData.businessName}
            setBusinessName={handleBusinessNameChange}
            city={formData.city}
            setCity={handleCityChange}
            selectedLocation={formData.selectedLocation}
            setSelectedLocation={handleLocationChange}
          />
        )}

        {/* Step 1: Owner Details */}
        {localCurrentStep === 1 && (
          <View style={styles.stepContainer}>
            <TitleSubtitle
              title="Owner Details"
              subtitle="Add owner details."
              titleStyle={styles.largeTitle}
              subtitleStyle={styles.largeSubtitle}
            />
            {formData.owners.map((o, idx) => (
              <VendorOwnCard
                key={o.id || idx}
                owner={o}
                navigation={navigation}
              />
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddOwner')}
            >
              <Icon name="person-add" size={17} color={appColors.white} />
              <Text style={styles.addButtonText}>Add Owner</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Services Provided */}
        {localCurrentStep === 2 && (
          <View style={styles.stepContainer}>
            <TitleSubtitle
              title="Services Provided"
              // subtitle="All laundry services are required for vendor registration."
              subtitle=" Services available based on your subscription plan"
              titleStyle={styles.largeTitle}
              subtitleStyle={styles.largeSubtitle}
            />

            {services?.length > 0 ? (
              <View style={styles.servicesContainer}>
                {services.map(service => {
                  const isSelected = true;
                  const isLocked = service.locked;

                  return (
                    <View
                      key={service.id}
                      style={[
                        styles.serviceCard,
                        isSelected && styles.selectedServiceCard,
                      ]}
                    >
                      <View style={styles.serviceIconContainer}>
                        <Icon
                          name={isLocked ? 'lock-closed' : 'checkmark-circle'}
                          size={18}
                          color={isLocked ? '#9CA3AF' : appColors.success}
                        />
                      </View>

                      <Text style={styles.serviceText}>{service.name}</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.emptyStateText}>
                No services available for your plan
              </Text>
            )}

            {servicesMeta?.readOnly && (
              <Text style={styles.lockedInfo}>{servicesMeta.message}</Text>
            )}
          </View>
        )}

        {/* Step 3: Set Pricing */}
        {localCurrentStep === 3 && (
          <>
            <TitleSubtitle
              title="Set Pricing"
              subtitle="Add prices for each service."
              titleStyle={styles.largeTitle}
              subtitleStyle={styles.largeSubtitle}
              style={styles.mainView}
            />
            <SetPrice
              services={services} // ✅ NEW
              readOnly={servicesMeta?.readOnly}
              onOpenFilter={() => setShowFilterModal(true)}
              selectedFilter={selectedFilter}
              navigation={navigation}
              onPricingUpdate={handlePricingUpdate}
            />
          </>
        )}

        {/* Step 4: Delivery Options */}
        {localCurrentStep === 4 && (
          <View style={styles.stepContainer}>
            <TitleSubtitle
              title="Delivery Options"
              subtitle="Choose delivery method."
              titleStyle={styles.largeTitle}
              subtitleStyle={styles.largeSubtitle}
            />
            <View style={styles.optionsContainer}>
              {['Pickup & Delivery'].map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.optionCard,
                    formData.deliveryOption === opt &&
                      styles.selectedOptionCard,
                  ]}
                  onPress={() => handleDeliveryOptionSelect(opt)}
                >
                  <Icon
                    name={
                      formData.deliveryOption === opt
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={18}
                    color={
                      formData.deliveryOption === opt
                        ? appColors.secondary
                        : appColors.font
                    }
                  />
                  <Text
                    style={[
                      styles.optionText,
                      formData.deliveryOption === opt &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Error Message */}
        {localError ? (
          <Text style={styles.errorStyle}>{localError}</Text>
        ) : null}
      </ScrollView>

      {/* Navigation Buttons */}
      <View
        style={[
          styles.navButtons,
          {
            justifyContent:
              localCurrentStep === 0 ? 'flex-end' : 'space-between',
          },
        ]}
      >
        {localCurrentStep > 0 && (
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={prevStep}
            disabled={loading}
          >
            <Icon
              style={{ paddingLeft: 7, marginTop: 2 }}
              name="chevron-back"
              size={15}
              color={appColors.secondary}
            />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}

        {localCurrentStep < steps.length - 1 ? (
          <TouchableOpacity
            style={[styles.nextButton, loading && styles.disabledButton]}
            onPress={nextStep}
            disabled={loading}
          >
            <Text style={styles.nextButtonText}>
              {loading ? 'Processing...' : 'Next'}
            </Text>
            {!loading && (
              <Icon
                style={styles.buttonStyle}
                name="chevron-forward"
                size={15}
                color={appColors.white}
              />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <FilterCategoryModal
        visible={showFilterModal}
        filters={filters}
        selectedFilter={selectedFilter}
        onClose={() => setShowFilterModal(false)}
        onSelectFilter={key => setSelectedFilter(key)}
      />
    </SafeAreaView>
  );
};

export default VendorRegistration;

import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VendorContext } from '../../../utils/context/vendorContext';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import Header from '../../../components/header';
import SetPrice from '../../vendorRegistration/setPrice';
import FilterCategoryModal from '../../../otherComponent/vendorRegistration/filterCategoryModal';
import { getVendorServices } from '../../../redux/slices/vendorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../../../utils/context/toastContext';
import {
  completeStep1,
  completeStep2,
  completeStep3,
  completeStep4,
  completeStep5,
  getStep1,
  getStep2,
  getStep3,
  getStep4,
  getStep5,
} from '../../../redux/slices/vendorOnboardingSlice';

const VendorDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const { services, servicesMeta } = useSelector(state => state.vendor);

  // console.log("find service in vendor detials screen ====>>>", services)

  const {
    stepData: {
      step1: step1Data,
      step2: step2Data,
      step3: step3Data,
      step4: step4Data,
      step5: step5Data,
    } = {},
    loading,
    error,
  } = useSelector(state => state.vendorOnboarding);

  const { showToast } = useToast();

  useEffect(() => {
    dispatch(getStep1());
    dispatch(getStep2());
    dispatch(getStep3());
    dispatch(getStep4());
    dispatch(getStep5());
  }, []);

  useEffect(() => {
    dispatch(getVendorServices());
  }, []);

  const {
    formData,
    owners,
    updateBusinessDetails,
    updateOwners,
    updatePricing,
    updateDeliveryOption,
    // services,
    selectedServiceIds,
    deliveryOption,
    getAllPricingData,
    updateServices,
  } = useContext(VendorContext);

  useEffect(() => {
    if (services?.length) {
      updateServices(services.map(s => s.id));
    }
  }, [services]);

  // Define steps
  const steps = [
    {
      key: 'business',
      label: 'Business Information',
      icon: 'business-outline',
    },
    { key: 'owners', label: 'Owner Details', icon: 'people-outline' },
    { key: 'services', label: 'Services', icon: 'construct-outline' },
    { key: 'pricing', label: 'Pricing', icon: 'pricetag-outline' },
    { key: 'delivery', label: 'Delivery Settings', icon: 'car-outline' },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const businessName = formData.businessName || '';
  const city = formData.city || '';
  const location = formData.selectedLocation || null;

  const [tempDelivery, setTempDelivery] = useState(
    deliveryOption || 'Pickup & Delivery',
  );
  const [pricingData, setPricingData] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (!step1Data) return;

    updateBusinessDetails(
      step1Data.businessName || '',
      {
        address: step1Data.address,
        latitude: step1Data.location?.lat,
        longitude: step1Data.location?.lng,
      },
      step1Data.city || '',
    );
  }, [step1Data]);

  useEffect(() => {
    if (!step2Data?.owners?.length) return;

    const mappedOwners = step2Data.owners.map((o, index) => ({
      id: `${o.primaryNumber}-${index}`, // ✅ stable id
      firstName: o.firstName || '',
      lastName: o.lastName || '',
      primary: o.primaryNumber || '',
      whatsapp: o.whatsappNumber || o.primaryNumber || '',
      governmentId: o.governmentId
        ? {
            uri: o.governmentId, // ✅ URL → file-like
            name: o.governmentId.split('/').pop(),
            type: 'image/jpeg',
          }
        : null,
    }));

    updateOwners(mappedOwners);
  }, [step2Data]);

  useEffect(() => {
    if (step3Data?.services?.length && services?.length) {
      const ids = services
        .filter(s => step3Data.services.includes(s.name))
        .map(s => s.id);

      updateServices(ids);
    }
  }, [step3Data, services]);

  useEffect(() => {
    if (step4Data?.itemPricing) {
      updatePricing({ itemPricing: step4Data.itemPricing });
    }
  }, [step4Data]);

  useEffect(() => {
    if (step5Data?.deliveryMethods?.length) {
      setTempDelivery(step5Data.deliveryMethods[0]);
      updateDeliveryOption(step5Data.deliveryMethods[0]);
    }
  }, [step5Data]);

  useEffect(() => {
    console.log('✅ owners :', owners);
  }, [owners]);

  const filters = [
    { key: 'all', label: 'All Items', icon: 'grid-outline' },
    { key: 'mens', label: "Men's Wear", icon: 'man-outline' },
    { key: 'womens', label: "Women's Wear", icon: 'woman-outline' },
    { key: 'kids', label: 'Kids Wear', icon: 'heart-outline' },
  ];

  useEffect(() => {
    if (formData.selectedLocation?.address && !formData.city) {
      const extractedCity = extractCityFromAddress(
        formData.selectedLocation.address,
      );

      if (extractedCity) {
        updateBusinessDetails(
          formData.businessName,
          formData.selectedLocation,
          extractedCity,
        );
      }
    }
  }, [formData.selectedLocation]);

  const extractCityFromAddress = (address = '') => {
    if (!address) return '';

    const parts = address
      .split(',')
      .map(p => p.trim())
      .filter(Boolean);

    // Common Indian address pattern:
    // [Area, City, Taluka, District, State, Pincode, Country]

    // 1️⃣ Try second part (most reliable)
    if (parts.length >= 2) {
      return parts[1];
    }

    // 2️⃣ Fallback: remove keywords and return first clean value
    const blacklist = ['talhsil', 'tahsil', 'district', 'state', 'india'];
    const clean = parts.find(
      p => !blacklist.some(b => p.toLowerCase().includes(b)),
    );

    return clean || '';
  };

  const handleBusinessNameChange = text => {
    updateBusinessDetails(text, location, city);
  };

  const handleCityChange = text => {
    updateBusinessDetails(businessName, location, text);
  };

  const handleLocationChange = newLocation => {
    updateBusinessDetails(businessName, newLocation, city);
  };

  const clearLocation = () => {
    updateBusinessDetails(businessName, null, city);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.goBack();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handlePricingUpdate = useCallback(
    updatedPricing => {
      console.log('📊 Pricing updated in VendorRegistration:', updatedPricing);
      updatePricing(updatedPricing);
    },
    [updatePricing],
  );

  const saveBusinessDetails = async () => {
    if (!businessName.trim())
      return showToast('Business name required', 'error');
    if (!city.trim()) return showToast('City required', 'error');
    if (!location?.address) return showToast('Address required', 'error');

    await dispatch(
      completeStep1({
        businessName,
        city,
        address: location.address,
        location: {
          lat: location.latitude,
          lng: location.longitude,
        },
      }),
    ).unwrap();

    updateBusinessDetails(businessName, location, city);
    handleNext();
  };

  const saveOwners = async () => {
    if (!owners.length) {
      showToast('At least one owner required', 'error');
      return;
    }

    await dispatch(
      completeStep2({
        owners: owners.map(o => ({
          firstName: o.firstName,
          lastName: o.lastName,
          primaryNumber: o.primary,
          whatsappNumber: o.whatsapp || o.primary,
          governmentId: o.governmentId,
        })),
      }),
    ).unwrap();

    handleNext();
  };

  const saveServices = async () => {
    const serviceNames = services.filter(s => !s.locked).map(s => s.name);

    await dispatch(completeStep3({ services: serviceNames })).unwrap();
    handleNext();
  };

  const savePricing = async () => {
    const pricing = formData.pricingData?.itemPricing || {};

    // ✅ ALL services from API must be validated
    const requiredServices = services;

    const payload = {};
    const missingServices = [];

    requiredServices.forEach(service => {
      const serviceName = service.name;
      const servicePricing = pricing[serviceName];

      if (!servicePricing) {
        missingServices.push(serviceName);
        return;
      }

      let hasValidItem = false;
      const validCategories = {};

      Object.entries(servicePricing).forEach(([category, items]) => {
        const validItems = items.filter(item => Number(item.price) > 0);

        if (validItems.length > 0) {
          validCategories[category] = validItems;
          hasValidItem = true;
        }
      });

      if (!hasValidItem) {
        missingServices.push(serviceName);
      } else {
        payload[serviceName] = validCategories;
      }
    });

    // ❌ Validation error
    if (missingServices.length > 0) {
      showToast(
        `Please set at least one item price for ${missingServices[0]}`,
        'error',
      );
      return;
    }

    // ❌ Safety net (VERY IMPORTANT)
    if (Object.keys(payload).length === 0) {
      showToast(
        'Please set at least one item price before continuing',
        'error',
      );
      return;
    }

    console.log('✅ PRICING PAYLOAD (validated):', payload);

    await dispatch(
      completeStep4({
        itemPricing: payload,
      }),
    ).unwrap();

    handleNext();
  };

  const saveDeliveryOption = async () => {
    await dispatch(completeStep5({ deliveryMethods: [tempDelivery] })).unwrap();

    updateDeliveryOption(tempDelivery);
    navigation.goBack();
    // handleNext();
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Business Details
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Business Information</Text>
            <Text style={styles.stepDescription}>
              Update your business name and location details
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Business Name *</Text>
              <TextInput
                style={styles.textInput}
                value={businessName}
                onChangeText={handleBusinessNameChange}
                placeholder="Enter your business name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>City *</Text>
              <TextInput
                style={styles.textInput}
                value={city}
                onChangeText={handleCityChange}
                placeholder="Enter city name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Business Address *</Text>
              <TouchableOpacity
                style={styles.locationInput}
                onPress={() => {
                  navigation.navigate('SelectLocation', {
                    onLocationSelect: handleLocationChange,
                    initialLocation: location,
                  });
                }}
              >
                <Text
                  style={[
                    styles.locationText,
                    !location?.address && styles.placeholderText,
                  ]}
                >
                  {location?.address || 'Select business address'}
                </Text>

                <Icon name="chevron-forward" size={18} color={appColors.gray} />
              </TouchableOpacity>

              {location?.address && (
                <TouchableOpacity
                  style={styles.clearLocation}
                  onPress={clearLocation}
                >
                  <Text style={styles.clearLocationText}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );

      case 1: // Owners
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Owner Details</Text>
            <Text style={styles.stepDescription}>
              Manage business owners and their contact information
            </Text>

            <ScrollView
              style={styles.ownersList}
              showsVerticalScrollIndicator={false}
            >
              {owners.length > 0 ? (
                owners.map((owner, index) => (
                  <View key={owner.id || index} style={styles.ownerCard}>
                    <View style={styles.ownerHeader}>
                      <Icon name="person-circle" size={40} color="#4B5563" />
                      <View style={styles.ownerInfo}>
                        <Text style={styles.ownerName}>
                          {owner.firstName} {owner.lastName}
                        </Text>
                        <Text style={styles.ownerPhone}>{owner.primary}</Text>
                        {owner.whatsapp && owner.whatsapp !== owner.primary && (
                          <Text style={styles.ownerWhatsapp}>
                            WhatsApp: {owner.whatsapp}
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        style={styles.editOwnerButton}
                        onPress={() =>
                          navigation.navigate('AddOwner', { owner })
                        }
                      >
                        <Icon
                          name="create-outline"
                          size={18}
                          color={appColors.secondary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Icon name="people-outline" size={48} color="#D1D5DB" />
                  <Text style={styles.emptyStateText}>No owners added yet</Text>
                  <Text style={styles.emptyStateSubtext}>
                    Add at least one owner for your business
                  </Text>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddOwner')}
            >
              <Icon name="add-circle" size={18} color={appColors.secondary} />
              <Text style={styles.addButtonText}>Add New Owner</Text>
            </TouchableOpacity>
          </View>
        );

      case 2: // Services
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Services</Text>
            <Text style={styles.stepDescription}>
              Services available based on your subscription plan
            </Text>

            {services?.length > 0 ? (
              <View style={styles.servicesContainer}>
                {services.map(service => {
                  const isSelected = true;
                  const isLocked = service.locked;

                  return (
                    <View
                      key={service.id}
                      style={[
                        styles.serviceItem,
                        isSelected && styles.selectedServiceItem,
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
        );

      case 3: // Pricing
        return (
          <View style={[styles.stepContent, { paddingHorizontal: 0 }]}>
            <View style={styles.titleContainer}>
              <Text style={styles.stepTitle}>Pricing Overview</Text>
              <Text style={styles.stepDescription}>
                Review and update pricing for your services
              </Text>
            </View>

            <SetPrice
              services={services} // ✅ NEW
              readOnly={servicesMeta?.readOnly}
              onOpenFilter={() => setShowFilterModal(true)}
              selectedFilter={selectedFilter}
              navigation={navigation}
              onPricingUpdate={handlePricingUpdate}
            />
          </View>
        );

      case 4: // Delivery
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Delivery Settings</Text>
            <Text style={styles.stepDescription}>
              Configure how customers receive their laundry services
            </Text>

            <View style={styles.deliveryOptions}>
              {[
                {
                  value: 'Pickup & Delivery',
                  description: 'We pickup from and deliver to customer address',
                  icon: 'car',
                },
              ].map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.deliveryOptionCard,
                    tempDelivery === option.value &&
                      styles.selectedDeliveryCard,
                  ]}
                  onPress={() => setTempDelivery(option.value)}
                >
                  <View style={styles.deliveryOptionHeader}>
                    <Icon
                      name={option.icon}
                      size={19}
                      color={
                        tempDelivery === option.value
                          ? appColors.secondary
                          : '#6B7280'
                      }
                    />
                    <View style={styles.deliveryOptionInfo}>
                      <Text
                        style={[
                          styles.deliveryOptionTitle,
                          tempDelivery === option.value &&
                            styles.selectedDeliveryTitle,
                        ]}
                      >
                        {option.value}
                      </Text>
                      <Text style={styles.deliveryOptionDescription}>
                        {option.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title={'Vendor Details'} onBack={() => navigation.goBack()} />
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentStep + 1) / steps.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Professional Navigation Buttons */}
      <View
        style={[
          styles.navigation,
          { justifyContent: currentStep === 0 ? 'flex-end' : 'space-between' },
        ]}
      >
        {currentStep === 0 ? (
          <></>
        ) : (
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.previousButton,
              currentStep === 0 && styles.disabledButton,
              { paddingVertical: 8 },
            ]}
            onPress={handlePrevious}
            disabled={currentStep === 0}
          >
            <Icon
              name="chevron-back"
              size={18}
              color={currentStep === 0 ? '#9CA3AF' : appColors.secondary}
            />
            <Text style={[styles.previousButtonText]}>Previous</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          // onPress={() => {
          //   if (currentStep === 0) {
          //     saveBusinessDetails();
          //   } else if (currentStep === 4) {
          //     saveDeliveryOption();
          //   } else {
          //     handleNext();
          //   }
          // }}
          onPress={() => {
            if (currentStep === 0) saveBusinessDetails();
            else if (currentStep === 1) saveOwners();
            else if (currentStep === 2) saveServices();
            else if (currentStep === 3) savePricing();
            else if (currentStep === 4) saveDeliveryOption();
          }}
        >
          <Text style={[styles.nextButtonText]}>Save & Finish</Text>
        </TouchableOpacity>
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

export default VendorDetails;

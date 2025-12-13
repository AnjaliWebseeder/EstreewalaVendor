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
import { VendorContext } from "../../../utils/context/vendorContext";
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import Header from '../../../components/header';
import SetPrice from '../../vendorRegistration/setPrice';
import FilterCategoryModal from '../../../otherComponent/vendorRegistration/filterCategoryModal';

const VendorDetails = ({ navigation }) => {
  const {
    formData,
    owners,
    updateBusinessDetails,
    updateOwners,
    updatePricing,
    updateDeliveryOption,
    services,
    selectedServiceIds,
    deliveryOption,
    getAllPricingData,
  } = useContext(VendorContext);

  // Define steps
  const steps = [
    { key: 'business', label: 'Business Information', icon: 'business-outline' },
    { key: 'owners', label: 'Owner Details', icon: 'people-outline' },
    { key: 'services', label: 'Services', icon: 'construct-outline' },
    { key: 'pricing', label: 'Pricing', icon: 'pricetag-outline' },
    { key: 'delivery', label: 'Delivery Settings', icon: 'car-outline' },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [businessName, setBusinessName] = useState(formData.businessName || '');
  const [location, setLocation] = useState(formData.selectedLocation || null);
  const [tempDelivery, setTempDelivery] = useState(deliveryOption || 'Pickup & Delivery');
  const [pricingData, setPricingData] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

const filters = [
  { key: 'all', label: 'All Items', icon: 'grid-outline' },
  { key: 'mens', label: "Men's Wear", icon: 'man-outline' },
  { key: 'womens', label: "Women's Wear", icon: 'woman-outline' },
  { key: 'kids', label: 'Kids Wear', icon: 'heart-outline' },
];

  useEffect(() => {
    const pricing = getAllPricingData();
    setPricingData(pricing?.itemPricing || {});
  }, []);

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

   const handlePricingUpdate = useCallback((updatedPricing) => {
      console.log('📊 Pricing updated in VendorRegistration:', updatedPricing);
      updatePricing(updatedPricing);
    }, [updatePricing]);
  

  const saveBusinessDetails = () => {
    updateBusinessDetails(businessName, location);
    handleNext();
  };

  const saveDeliveryOption = () => {
    updateDeliveryOption(tempDelivery);
    handleNext();
  };

  // Render current step content
  const renderStepContent = () => {
    switch(currentStep) {
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
                onChangeText={setBusinessName}
                placeholder="Enter your business name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Business Address *</Text>
              <TouchableOpacity
                style={styles.locationInput}
                onPress={() => {
                  navigation.navigate('SelectLocation', {
                    onLocationSelect: setLocation,
                    initialLocation: location
                  });
                }}
              >
                <Text style={[
                  styles.locationText,
                  !location?.address && styles.placeholderText
                ]}>
                  {location?.address || 'Select business address'}
                </Text>
                <Icon name="chevron-forward" size={18} color={appColors.gray} />
              </TouchableOpacity>
              {location?.address && (
                <TouchableOpacity 
                  style={styles.clearLocation}
                  onPress={() => setLocation(null)}
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
            
            <ScrollView style={styles.ownersList} showsVerticalScrollIndicator={false}>
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
                        onPress={() => navigation.navigate('AddOwner', { owner })}
                      >
                        <Icon name="create-outline" size={18} color={appColors.secondary} />
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
            
            <View style={styles.servicesContainer}>
              {services.map(service => (
                <View 
                  key={service.id} 
                  style={[
                    styles.serviceItem,
                    selectedServiceIds.includes(service.id) && styles.selectedServiceItem
                  ]}
                >
                  <View style={styles.serviceIconContainer}>
                    <Icon
                      name={selectedServiceIds.includes(service.id) ? 'checkmark-circle' : 'remove-circle-outline'}
                      size={18}
                      color={selectedServiceIds.includes(service.id) ? appColors.success : '#9CA3AF'}
                    />
                  </View>
                  <Text style={styles.serviceText}>{service.name}</Text>
                </View>
              ))}
            </View>

          
          </View>
        );

      case 3: // Pricing
        return (
          <View style={[styles.stepContent,{paddingHorizontal:0}]}>
           <View style={styles.titleContainer}>
             <Text style={styles.stepTitle}>Pricing Overview</Text>
            <Text style={styles.stepDescription}>
              Review and update pricing for your services
            </Text>
           </View>
            
           <SetPrice
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
                  icon: 'car'
                },
               
              ].map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.deliveryOptionCard,
                    tempDelivery === option.value && styles.selectedDeliveryCard
                  ]}
                  onPress={() => setTempDelivery(option.value)}
                >
                  <View style={styles.deliveryOptionHeader}>
                    <Icon
                      name={option.icon}
                      size={19}
                      color={tempDelivery === option.value ? appColors.secondary : '#6B7280'}
                    />
                    <View style={styles.deliveryOptionInfo}>
                      <Text style={[
                        styles.deliveryOptionTitle,
                        tempDelivery === option.value && styles.selectedDeliveryTitle
                      ]}>
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
      <Header  title={"Vendor Details"} onBack={() => navigation.goBack()} />
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${((currentStep + 1) / steps.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Professional Navigation Buttons */}
      <View style={[styles.navigation,{ justifyContent: currentStep === 0 ? 'flex-end' : 'space-between'}]}>
       {currentStep === 0 ? <></> :  <TouchableOpacity 
          style={[
            styles.navButton,
            styles.previousButton,
            currentStep === 0 && styles.disabledButton,
            {paddingVertical:8}
          ]}
          onPress={handlePrevious}
          disabled={currentStep === 0}
        >
          <Icon 
            name="chevron-back" 
            size={18} 
            color={currentStep === 0 ? '#9CA3AF' : appColors.secondary} 
          />
          <Text style={[

            styles.previousButtonText,
          ]}>
            Previous
          </Text>
        </TouchableOpacity>}

        <TouchableOpacity 
          style={[
            styles.navButton,
            styles.nextButton,
          ]}
          onPress={() => {
            if (currentStep === 0) {
              saveBusinessDetails();
            } else if (currentStep === 4) {
              saveDeliveryOption();
            } else {
              handleNext();
            }
          }}
        >
          <Text style={[
            styles.nextButtonText
          ]}>
            Save & Finish
          </Text>
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
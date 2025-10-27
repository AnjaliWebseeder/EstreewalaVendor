// VendorRegistration.js
import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { VendorContext } from "../../utils/context/vendorContext";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import appColors from "../../theme/appColors";
import TitleSubtitle from "../../otherComponent/vendorRegistration/titleSubTitle";
import VendorOwnCard from "../../otherComponent/vendorRegistration/vendorOwnerCard";
import SetPrice from "./setPrice";
import FilterCategoryModal from "../../otherComponent/vendorRegistration/filterCategoryModal";
import BusinessDetails from "./businessDetail";
import { BackIcon } from "../../assets/Icons/backIcon";
import {
  completeStep1,
  completeStep2,
  completeStep3,
  completeStep4,
  completeStep5,
  getCompletionStatus,
} from "../../redux/slices/vendorOnboardingSlice";
import { useToast } from "../../utils/context/toastContext";

const steps = ["Business", "Owner", "Services", "Pricing", "Delivery"];

const filters = [
  { key: "all", label: "All Items", icon: "grid-outline" },
  { key: "mens", label: "Men's Wear", icon: "man-outline" },
  { key: "womens", label: "Women's Wear", icon: "woman-outline" },
  { key: "kids", label: "Kids Wear", icon: "heart-outline" },
];

const VendorRegistration = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const {
    services,
    selectedServiceIds,
    toggleServiceCategory,
    deliveryOption,
    setDeliveryOption,
    owners,
    getAllPricingData // Get the new function from context
  } = useContext(VendorContext);

  const { currentStep: apiCurrentStep, loading } = useSelector(
    (state) => state.vendorOnboarding
  );

  const { fromScreen } = route?.params || {};
  const [businessName, setBusinessName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [localCurrentStep, setLocalCurrentStep] = useState(0);
  const [completedStep, setCompletedStep] = useState(0);
  const [localError, setLocalError] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [pricingData, setPricingData] = useState({}); // Change to object to match API structure
  
  // Load vendor completion status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await dispatch(getCompletionStatus()).unwrap();
        const stepIndex = (res?.completionStep || 0) - 1;
        const safeIndex = Math.max(0, Math.min(stepIndex + 1, steps.length - 1));

        setCompletedStep(stepIndex >= 0 ? stepIndex : 0);
        setLocalCurrentStep(safeIndex);

        if (res?.isComplete) {
          showToast("Registration already complete!", "success");
          navigation.replace("SubscriptionPlans");
        }
      } catch (err) {
        console.log("Error fetching completion status:", err);
        showToast(err?.message, "error");
      }
    };
    fetchStatus();
  }, [dispatch]);

  // If Redux updates step externally
  useEffect(() => {
    if (apiCurrentStep !== undefined) {
      setLocalCurrentStep(apiCurrentStep);
    }
  }, [apiCurrentStep]);

  // Handle pricing updates from SetPrice component - ADD THIS MISSING FUNCTION
  const handlePricingUpdate = useCallback((updatedPricing) => {
    setPricingData(updatedPricing);
    console.log("📊 Updated Pricing Data:", updatedPricing);
  }, []);

  // Handle step progression
  const nextStep = async () => {
    setLocalError("");

    try {
      // Validation
      if (localCurrentStep === 0 && !businessName.trim())
        return setLocalError("Please enter Business Name");
      if (localCurrentStep === 0 && !selectedLocation?.address)
        return setLocalError("Please select your laundry shop address");
      if (localCurrentStep === 1 && owners.length === 0)
        return setLocalError("Please add at least one owner");
      if (localCurrentStep === 2 && selectedServiceIds.length === 0)
        return setLocalError("Please select at least one service");
      
      // Updated validation for step 3 - check object structure
      if (localCurrentStep === 3) {
        if (!pricingData || typeof pricingData !== 'object' || Object.keys(pricingData).length === 0) {
          return setLocalError("Please set prices for at least one item");
        }
        
        const hasValidPricing = Object.keys(pricingData).some(
          service => pricingData[service] && Array.isArray(pricingData[service]) && pricingData[service].length > 0
        );
        
        if (!hasValidPricing) {
          return setLocalError("Please set prices for at least one item");
        }
      }

      let apiSuccess = false;

      const tryDispatch = async (action, payload, msg) => {
        try {
          await dispatch(action(payload)).unwrap();
          apiSuccess = true;
          //  showToast(`${msg} completed successfully!`, "success");
        } catch (err) {
          if (err?.message?.includes("already completed")) {
            showToast(err?.message, "error");
            apiSuccess = true; // gracefully skip
          } else {
            showToast(err?.message || `Failed to complete ${msg}`, "error");
          }
        }
      };

      switch (localCurrentStep) {
        case 0:
          await tryDispatch(
            completeStep1,
            {
              businessName: businessName.trim(),
              address: selectedLocation?.address,
              location: {
                lat: selectedLocation?.latitude,
                lng: selectedLocation?.longitude,
              },
            },
            "Step 1"
          );
          break;

        case 1:
          const ownerData = (owners || []).map((o) => ({
            firstName: o.firstName,
            lastName: o.lastName,
            primaryNumber: o.primary,
            whatsappNumber: o.whatsapp || o.primary,
            governmentId: o.governmentId,
          }));
          await tryDispatch(completeStep2, { owners: ownerData }, "Step 2");
          break;

        case 2:
          const serviceNames = (selectedServiceIds || []).map((id) => {
            const s = services.find((x) => x.id === id);
            return s?.name || id;
          });
          await tryDispatch(completeStep3, { services: serviceNames }, "Step 3");
          break;

        case 3:
          console.log("📦 Sending Pricing Data to API:", pricingData);
          
          // Check if pricingData is valid
          if (!pricingData || Object.keys(pricingData).length === 0) {
            return setLocalError("Please set prices for at least one item");
          }

          // Remove empty service arrays and validate
          const filteredPricingData = {};
          Object.keys(pricingData).forEach(service => {
            if (pricingData[service] && Array.isArray(pricingData[service]) && pricingData[service].length > 0) {
              filteredPricingData[service] = pricingData[service];
            }
          });

          if (Object.keys(filteredPricingData).length === 0) {
            return setLocalError("Please set prices for at least one item");
          }

          console.log("🔄 Filtered Pricing Data:", filteredPricingData);
          
          await tryDispatch(
            completeStep4, 
            { itemPricing: filteredPricingData }, // Pass the object directly
            "Step 4"
          );
          break;

        case 4:
          await tryDispatch(
            completeStep5,
            { deliveryMethods: deliveryOption ? [deliveryOption] : [] },
            "Step 5"
          );
          break;
      }

      if (apiSuccess) {
        const next = localCurrentStep + 1;
        setLocalCurrentStep(next);
        setCompletedStep(Math.max(completedStep, next - 1));
      }
    } catch (err) {
      console.log("Step progression error:", err);
      setLocalError(err.message || "Failed to complete step");
    }
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      await dispatch(completeStep5({ deliveryMethods: [deliveryOption] })).unwrap();
      // Alert.alert("Success", "Vendor registration completed successfully!");
      if (fromScreen) navigation.goBack();
      else navigation.navigate("SubscriptionPlans");
    } catch (err) {
      console.log("Submit error:", err);
      setLocalError(err.message || "Submission failed");
    }
  };

  // Back button logic
  const prevStep = () => {
    if (localCurrentStep > 0) {
      setLocalCurrentStep((prev) => prev - 1);
    } else {
      navigation.goBack();
    }
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
      <View style={styles.mainHeader}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.titleStyle}>
            {fromScreen ? "Vendor Details" : "Vendor Registration"}
          </Text>
          <View style={styles.right} />
        </View>
        {renderStepSlider()}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {localCurrentStep === 0 && (
         <BusinessDetails
  businessName={businessName}
  setBusinessName={setBusinessName}
  selectedLocation={selectedLocation}
  setSelectedLocation={setSelectedLocation}
/>
        )}
        {localCurrentStep === 1 && (
          <View style={styles.stepContainer}>
            <TitleSubtitle
              title="Owner Details"
              subtitle="Add owner details."
              titleStyle={styles.largeTitle}
              subtitleStyle={styles.largeSubtitle}
            />
            {owners.map((o, idx) => (
              <VendorOwnCard key={idx} owner={o} navigation={navigation} />
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("AddOwner")}
            >
              <Icon name="person-add" size={17} color={appColors.white} />
              <Text style={styles.addButtonText}>Add Owner</Text>
            </TouchableOpacity>
          </View>
        )}
        {localCurrentStep === 2 && (
          <View style={styles.stepContainer}>
            <TitleSubtitle
              title="Services Provided"
              subtitle="Select services you offer."
              titleStyle={styles.largeTitle}
              subtitleStyle={styles.largeSubtitle}
            />
            <View style={styles.servicesContainer}>
              {services.map((s) => {
                const selected = selectedServiceIds.includes(s.id);
                return (
                  <TouchableOpacity
                    key={s.id}
                    style={[
                      styles.serviceCard,
                      selected && styles.selectedServiceCard,
                    ]}
                    onPress={() => toggleServiceCategory(s.id)}
                  >
                    <Icon
                      name={
                        selected ? "checkmark-circle" : "ellipse-outline"
                      }
                      size={18}
                      color={appColors.secondary}
                    />
                    <Text style={styles.serviceName}>{s.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
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
              onOpenFilter={() => setShowFilterModal(true)}
              selectedFilter={selectedFilter}
              navigation={navigation}
              onPricingUpdate={handlePricingUpdate} // Pass the callback
            />
          </>
        )}
        {localCurrentStep === 4 && (
          <View style={styles.stepContainer}>
            <TitleSubtitle
              title="Delivery Options"
              subtitle="Choose delivery method."
              titleStyle={styles.largeTitle}
              subtitleStyle={styles.largeSubtitle}
            />
            <View style={styles.optionsContainer}>
              {["Delivery", "Pickup", "Pickup & Delivery"].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.optionCard,
                    deliveryOption === opt && styles.selectedOptionCard,
                  ]}
                  onPress={() => setDeliveryOption(opt)}
                >
                  <Icon
                    name={
                      deliveryOption === opt
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={18}
                    color={
                      deliveryOption === opt
                        ? appColors.secondary
                        : appColors.font
                    }
                  />
                  <Text
                    style={[
                      styles.optionText,
                      deliveryOption === opt && styles.selectedOptionText,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {localError ? <Text style={styles.errorStyle}>{localError}</Text> : null}
      </ScrollView>

      <View
        style={[
          styles.navButtons,
          {
            justifyContent:
              localCurrentStep === 0 ? "flex-end" : "space-between",
          },
        ]}
      >
        {localCurrentStep > 0 && (
          <TouchableOpacity
             style={[
      styles.backButtonContainer,
      // localCurrentStep > completedStep && styles.disabledButtonStyle, // 👈 disable style
    ]}
            onPress={prevStep}
            //  disabled={localCurrentStep > completedStep} 
            
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
              {loading ? "Processing..." : "Next"}
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
              {loading ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <FilterCategoryModal
        visible={showFilterModal}
        filters={filters}
        selectedFilter={selectedFilter}
        onClose={() => setShowFilterModal(false)}
        onSelectFilter={(key) => setSelectedFilter(key)}
      />
    </SafeAreaView>
  );
};

export default VendorRegistration;
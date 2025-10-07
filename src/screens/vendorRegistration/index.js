import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { VendorContext } from "../../utils/context/vendorContext";
import { styles } from "./styles";
import InputField from "../../components/InputField";
import TitleSubtitle from "../../otherComponent/vendorRegistration/titleSubTitle";
import appColors from "../../theme/appColors";
import VendorOwnCard from "../../otherComponent/vendorRegistration/vendorOwnerCard";
import VendorBranchCard from "../../otherComponent/vendorRegistration/vendorBranchCard"
import { BackIcon } from "../../assets/Icons/backIcon";
import SetPrice from "./setPrice";
import FilterCategoryModal from "../../otherComponent/vendorRegistration/filterCategoryModal"
import PaymentSetup from "./paymentSetup";
import { SafeAreaView } from "react-native-safe-area-context";
import { windowHeight } from "../../theme/appConstant";

// Stepper steps
const steps = [
  "Business",
  "Owner",
  "Branch",
  "Services",
  "Pricing",
  "Customer",
  "Payment",
];

const filters = [
    { key: "all", label: "All Items", icon: "grid-outline" },
    { key: "mens", label: "Men's Wear", icon: "man-outline" },
    { key: "womens", label: "Women's Wear", icon: "woman-outline" },
    { key: "kids", label: "Kids Wear", icon: "heart-outline" },
];

const VendorRegistration = ({route}) => {
  const navigation = useNavigation();
  const {
    services,
    selectedServiceIds,
    toggleServiceCategory,
    deliveryOption,
    setDeliveryOption,
    owners,
    branches,
    completeVendorRegistration
  } = useContext(VendorContext);

  const { fromScreen } = route?.params || {};
  const [businessName, setBusinessName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [error, setError] = useState("");

  const nextStep = () => {
    setError("");
    
    // Validation before moving to next step
    if (currentStep === 0 && !businessName.trim()) {
      setError("Please enter Business Name");
      return;
    }
    if (currentStep === 1 && owners.length === 0) {
      setError("Please add at least one owner");
      return;
    }
    if (currentStep === 2 && branches.length === 0) {
      setError("Please add at least one branch");
      return;
    }
    if (currentStep === 3 && selectedServiceIds.length === 0) {
      setError("Please select at least one service");
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting vendor registration...');
      await completeVendorRegistration();
      
      if (fromScreen) {
        navigation.goBack();
      } else {
        navigation.navigate("SubscriptionPlans");
      }
    } catch (error) {
      console.log('Error in vendor registration submit:', error);
    }
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // Enhanced Stepper with labels
  const renderStepSlider = () => {
    return (
      <View style={styles.stepperContainer}>
        <View style={styles.stepsSegmentsContainer}>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <View key={index} style={styles.stepWrapper}>
                <View
                  style={[
                    styles.stepSegment,
                    isCompleted && styles.completedSegment,
                    isActive && styles.activeSegment,
                  ]}
                />
                <Text style={[
                  styles.stepLabel,
                  isActive && styles.activeStepLabel,
                  isCompleted && styles.completedStepLabel
                ]}>
                  {step}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Enhanced Header */}
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
        
        {/* Enhanced Stepper Slider */}
        {renderStepSlider()}
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View>
          
          {/* STEP 1: Business */}
          {currentStep === 0 && (
            <View style={styles.stepContainer}>
              <TitleSubtitle
                title="Business Details"
                subtitle="Help us get to know you better by sharing details about your business."
                titleStyle={styles.largeTitle}
                subtitleStyle={styles.largeSubtitle}
              />
              <InputField
                label="Business Name*"
                value={businessName}
                onChangeText={(text) => {
                  setBusinessName(text);
                  if (error) setError("");
                }}
                placeholder="Enter Business Name"
                inputStyle={styles.largeInput}
                labelStyle={styles.largeLabel}
              />
            </View>
          )}

          {/* STEP 2: Owner */}
          {currentStep === 1 && (
            <View style={styles.stepContainer}>
              <TitleSubtitle
                title="Owner Details"
                subtitle="Add the owner details to help streamline management."
                titleStyle={styles.largeTitle}
                subtitleStyle={styles.largeSubtitle}
              />
              {owners.length > 0 && owners.map((owner, idx) => (
                <VendorOwnCard key={idx} navigation={navigation} owner={owner} />
              ))}
              <TouchableOpacity
                onPress={() => {
                  if (error) setError("");
                  navigation.navigate("AddOwner");
                }}
                style={styles.addButton}
              >
                <Icon name="person-add" size={17} color={appColors.white} />
                <Text style={styles.addButtonText}>Add Owner</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 3: Branch */}
          {currentStep === 2 && (
            <View style={styles.stepContainer}>
              <TitleSubtitle
                title="Branch Details"
                subtitle="Add at least one branch for your business."
                titleStyle={styles.largeTitle}
                subtitleStyle={styles.largeSubtitle}
              />
              {branches.length > 0 && branches.map((branch, idx) => (
                <VendorBranchCard key={idx} navigation={navigation} branch={branch} />
              ))}
              <TouchableOpacity
                onPress={() => {
                  if (error) setError("");
                  navigation.navigate("AddBranch");
                }}
                style={styles.addButton}
              >
                <Icon name="business" size={16} color={appColors.white} />
                <Text style={styles.addButtonText}>Add Branch</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 4: Services */}
          {currentStep === 3 && (
            <View style={styles.stepContainer}>
              <TitleSubtitle
                title="Services Provided"
                subtitle="Select one or more services you offer."
                titleStyle={styles.largeTitle}
                subtitleStyle={styles.largeSubtitle}
              />
              <View style={styles.servicesContainer}>
                {services.map((s) => {
                  const isSelected = selectedServiceIds.includes(s.id);
                  return (
                    <TouchableOpacity
                      key={s.id}
                      style={[
                        styles.serviceCard,
                        isSelected && styles.selectedServiceCard
                      ]}
                      onPress={() => toggleServiceCategory(s.id)}
                    >
                      <Icon
                        name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                        size={18}
                        color={isSelected ? appColors.secondary : appColors.secondary}
                      />
                      <Text style={[
                        styles.serviceName,
                   
                      ]}>
                        {s.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* STEP 5: Pricing */}
          {currentStep === 4 && (
            <>
              <View style={styles.stepContainer}>
                <TitleSubtitle
                  title="Set Pricing"
                  subtitle="Add prices for the services you provide."
                  titleStyle={styles.largeTitle}
                  subtitleStyle={styles.largeSubtitle}
                  style={{marginBottom:1}}
                />
              </View>
              <SetPrice 
                onOpenFilter={() => setShowFilterModal(true)}
                selectedFilter={selectedFilter}
                navigation={navigation} 
              />
            </>
          )}

          {/* STEP 6: Customer Options */}
          {currentStep === 5 && (
            <View style={styles.stepContainer}>
              <TitleSubtitle
                title="Customer Options"
                subtitle="Select how you will serve your customers."
                titleStyle={styles.largeTitle}
                subtitleStyle={styles.largeSubtitle}
              />
              <View style={styles.optionsContainer}>
                {["Delivery", "Pickup", "Pickup & Delivery"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionCard,
                      deliveryOption === option && styles.selectedOptionCard
                    ]}
                    onPress={() => setDeliveryOption(option)}
                  >
                    <Icon
                      name={deliveryOption === option ? "radio-button-on" : "radio-button-off"}
                      size={18}
                      color={deliveryOption === option ? appColors.secondary : appColors.font}
                    />
                    <Text style={[
                      styles.optionText,
                      deliveryOption === option && styles.selectedOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* STEP 7: Payment */}
          {currentStep === 6 && (
            <View style={styles.stepContainer}>
              <TitleSubtitle
                title="Payment Setup"
                subtitle="Complete your registration by setting up payment."
                titleStyle={styles.largeTitle}
                subtitleStyle={styles.largeSubtitle}
              />
              <PaymentSetup />
            </View>
          )}
        </View>

               {error ? (
          <Text style={styles.errorStyle}>{error}</Text>
        ) : null}
      </ScrollView>

      {/* Enhanced Navigation Buttons */}
      <View style={[
        styles.navButtons,
        { justifyContent: currentStep === 0 ? "flex-end" : "space-between" }
      ]}>
        {currentStep > 0 && (
          <TouchableOpacity 
            style={styles.backButtonContainer} 
            onPress={() => prevStep()}
          >
            <Icon style={{paddingLeft:7,marginTop:2}}  name="chevron-back" size={15} color={appColors.secondary} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        {currentStep < steps.length - 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={() => nextStep()}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon style={styles.buttonStyle} name="chevron-forward" size={15} color={appColors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
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
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
import { setAppLaunched } from "../../utils/context/appLaunchStatus";
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
  // Clear previous error
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

  if (currentStep === 6) {
    // You can add payment validation here later if needed
  }

  // If all validations pass
  setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
};

// In VendorRegistration.js
const handleSubmit = async () => {
  try {
    console.log('Submitting vendor registration...');
    
    // Mark vendor registration as completed
    await completeVendorRegistration();
    
    if (fromScreen) {
      navigation.goBack();
    } else {
      // Navigate to SubscriptionPlans
      console.log('Navigating to SubscriptionPlans');
      navigation.navigate("SubscriptionPlans");
    }
  } catch (error) {
    console.log('Error in vendor registration submit:', error);
  }
}

  const prevStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 0));

// Stepper with separate segments
const renderStepSlider = () => {
  return (
    <View style={styles.stepperContainer}>
      <View style={styles.stepsSegmentsContainer}>
        {steps.map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <View
              key={index}
              style={[
                styles.stepSegment,
                isCompleted && styles.completedSegment,
                isActive && styles.activeSegment,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="Vendor Registration" onBack={() => navigation.goBack()} /> */}
      <View style={styles.mainHeader}>
 <View style={styles.headerStyle}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
         <Text style={styles.titleStyle}>{fromScreen ? "Vendor Details" : "Vendor Registration" }</Text>
          <View style={styles.right} />
      </View>
         {/* Stepper Slider */}
      {renderStepSlider()}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {/* STEP 1: Business */}
          {currentStep === 0 && (
         <View style={styles.mainContainerStyle}>
              <TitleSubtitle
                title="Business Details"
                subtitle="Help us get to know you better by sharing details about your business."
              />
              <InputField
                label="Business Name*"
                value={businessName}
                onChangeText={(text) => {
    setBusinessName(text);
    if (error) setError(""); // Clear error as user types
  }}
                placeholder="Enter Business Name"
                rowStyle={{marginBottom:windowHeight(0)}}
              />
               </View>
          )}

          {/* STEP 2: Owner */}
          {currentStep === 1 && (
        <View style={styles.mainContainerStyle}>

     
              <TitleSubtitle
                title="Owner Details"
                subtitle="Add the owner details to help streamline management."
              />
              {owners.length > 0 &&
                owners.map((owner, idx) => (
                  <VendorOwnCard
                    key={idx}
                    navigation={navigation}
                    owner={owner}
                  />
                ))}
              <TouchableOpacity
               onPress={() => {
    if (error) setError(""); // Clear any previous error
    navigation.navigate("AddOwner");
  }}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonTextStyle}>+ Add Owner</Text>
              </TouchableOpacity>
              </View>
          )}

          {/* STEP 3: Branch */}
          {currentStep === 2 && (
            <View style={styles.mainContainerStyle}>
              <TitleSubtitle
                title="Branch Details"
                subtitle="Add at least one branch for your business."
              />
              {branches.length > 0 &&
                branches.map((branch, idx) => (
                  <VendorBranchCard
                    key={idx}
                    navigation={navigation}
                    branch={branch}
                  />
                ))}
             <TouchableOpacity
  onPress={() => {
    if (error) setError("");
    navigation.navigate("AddBranch");
  }}
  style={styles.buttonStyle}
>
                <Text style={styles.buttonTextStyle}>+ Add Branch</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 4: Services */}
          {currentStep === 3 && (
          <View style={styles.mainContainerStyle}>
              <TitleSubtitle
                title="Services Provided"
                subtitle="Select one or more services you offer."
              />
              {services.map((s) => {
                const isSelected = selectedServiceIds.includes(s.id);
                return (
                  <TouchableOpacity
                    key={s.id}
                    style={styles.serviceRow}
                    onPress={() => toggleServiceCategory(s.id)}
                  >
                    <Icon
                      name={
                        isSelected ? "checkbox-outline" : "square-outline"
                      }
                      size={18}
                      color={isSelected ? appColors.primary : "#999"}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.name}>{s.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* STEP 5: Pricing */}
         {currentStep === 4 && (
  <>
  <View style={styles.mainContainerStyle}>
      <TitleSubtitle
      title="Set Pricing"
      subtitle="Add prices for the services you provide."
      style={{marginBottom:10}}
    />
  </View>
    {/* Directly render SetPrice component instead of button */}
    <SetPrice 
      onOpenFilter={() => setShowFilterModal(true)}
            selectedFilter={selectedFilter}
    navigation={navigation} />
  </>
)}


          {/* STEP 6: Customer Options */}
          {currentStep === 5 && (
          <View style={styles.mainContainerStyle}>
              <TitleSubtitle
                title="Customer Options"
                subtitle="Select how you will serve your customers."
              />
              {["Delivery", "Pickup", "Pickup & Delivery"].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.serviceRow}
                  onPress={() => setDeliveryOption(option)}
                >
                  <Icon
                    name={
                      deliveryOption === option
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={18}
                    color={
                      deliveryOption === option
                        ? appColors.primary
                        : "#999"
                    }
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.name}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* STEP 7: Payment */}
          {currentStep === 6 && (
            <View style={styles.mainContainerStyle}>

            
              <TitleSubtitle
                title="Payment Setup"
                subtitle="Complete your registration by setting up payment."
              />
              <PaymentSetup />
</View>
          )}
        </View>

        {error ? (
  <Text style={styles.errorStyle}>
    {error}
  </Text>
) : null}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={[styles.navButtons,{justifyContent: currentStep === 0 ? "flex-end" : "space-between"}]}>
        {currentStep > 0 && (
          <TouchableOpacity style={[styles.buttonmainContainerStyle,{backgroundColor:appColors.white,borderColor:appColors.secondary,borderWidth:1}]} onPress={() => prevStep()}>
            <Text style={[styles.buttonText,{color:appColors.font}]}>Back</Text>
          </TouchableOpacity>
        )}
        {currentStep < steps.length - 1 ? (
          <TouchableOpacity style={styles.buttonmainContainerStyle} onPress={() => nextStep()}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonmainContainerStyle} onPress={(() => handleSubmit())}>
            <Text style={styles.buttonText}>Submit</Text>
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
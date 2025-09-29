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
  } = useContext(VendorContext);

const { fromScreen } = route?.params || {};
  const [businessName, setBusinessName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
    const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
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
                onChangeText={setBusinessName}
                placeholder="Enter Business Name"
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
                onPress={() => navigation.navigate("AddOwner")}
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
                onPress={() => navigation.navigate("AddBranch")}
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
          <TouchableOpacity style={styles.buttonmainContainerStyle} onPress={() => fromScreen ? navigation.goBack() : navigation.navigate("SubscriptionPlans")}>
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
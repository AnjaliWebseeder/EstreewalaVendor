import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { VendorContext } from "../../utils/context/vendorContext";
import { styles } from "./styles";
import Header from "../../components/header";
import InputField from "../../components/InputField";
import TitleSubtitle from "../../otherComponent/vendorRegistration/titleSubTitle";
import appColors from "../../theme/appColors";
import CustomButton from "../../components/button";
import VendorOwnCard from "../../otherComponent/vendorRegistration/vendorOwnerCard";
import VendorBranchCard from "../../otherComponent/vendorRegistration/vendorBranchCard"

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

const VendorRegistration = () => {
  const navigation = useNavigation();
  const {
    services,
    selectedServiceIds,
    toggleServiceCategory,
    deliveryOption,
    setDeliveryOption,
    owners,
    branches,
    isPricingSetForService,
    servicePrices
  } = useContext(VendorContext);

  const [businessName, setBusinessName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 0));

  // Stepper Item Renderer
  const renderItem = ({ item, index }) => {
    const isActive = index === currentStep;
    const isCompleted = index < currentStep;

    return (
      <View style={styles.stepperItem}>
        <View
          style={[
            styles.stepCircle,
            isCompleted && { backgroundColor: "#4CAF50" },
            isActive && styles.isActive,
            
          ]}
        >
          <Text style={[styles.step,{color: isActive ? appColors.white : isCompleted ? appColors.white : appColors.font}]}>{index+1}</Text>
        </View>
        <Text
          style={[
            styles.stepLabel,
            isActive && { color: appColors.secondary, fontWeight: "700" },
          ]}
        >
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Vendor Registration" onBack={() => navigation.goBack()} />

      {/* Stepper */}
      <FlatList
        data={steps}
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.stepperContainer}
        showsHorizontalScrollIndicator={false}
         style={{ flexGrow: 0, height: 80 }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {/* STEP 1: Business */}
          {currentStep === 0 && (
            <>
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
            </>
          )}

          {/* STEP 2: Owner */}
          {currentStep === 1 && (
            <>
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
                )) }
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddOwner")}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonTextStyle}>+ Add Owner</Text>
                </TouchableOpacity>
              
            </>
          )}

          {/* STEP 3: Branch */}
          {currentStep === 2 && (
            <>
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
                  )) }
              <TouchableOpacity
                onPress={() => navigation.navigate("AddBranch")}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonTextStyle}>+ Add Branch</Text>
              </TouchableOpacity>
            </>
          )}

          {/* STEP 4: Services */}
          {currentStep === 3 && (
            <>
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
            </>
          )}

          {/* STEP 5: Pricing */}
         // STEP 5: Pricing
{currentStep === 4 && (
  <>
    <TitleSubtitle
      title="Set Pricing"
      subtitle="Add prices for the services you provide."
    />
    
    {/* Display pricing status and summary */}
    <View style={styles.pricingSummaryContainer}>
      <Text style={styles.pricingSummaryTitle}>Pricing Summary</Text>
      
      {selectedServiceIds.length === 0 ? (
        <Text style={styles.noServicesText}>No services selected. Please go back to Services step.</Text>
      ) : (
        <View style={styles.pricingList}>
          {selectedServiceIds.map(serviceId => {
            const service = services.find(s => s.id === serviceId);
            const isPriced = isPricingSetForService(serviceId);
            const price = servicePrices[serviceId];
            
            return (
              <View key={serviceId} style={styles.pricingItem}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service?.name}</Text>
                  <View style={styles.priceStatus}>
                    {isPriced ? (
                      <View style={styles.pricedStatus}>
                        <Icon name="checkmark-circle" size={16} color={appColors.success} />
                        <Text style={styles.priceText}>₹{price}</Text>
                      </View>
                    ) : (
                      <View style={styles.notPricedStatus}>
                        <Icon name="alert-circle" size={16} color={appColors.warning} />
                        <Text style={styles.notPricedText}>Not priced</Text>
                      </View>
                    )}
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.editPriceButton,
                    isPriced ? styles.editButton : styles.setPriceButton
                  ]}
                  onPress={() => navigation.navigate("SetPrice", { serviceId })}
                >
                  <Text style={styles.editPriceButtonText}>
                    {isPriced ? 'Edit Price' : 'Set Price'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>

    {/* Pricing Statistics */}
    {selectedServiceIds.length > 0 && (
      <View style={styles.pricingStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {selectedServiceIds.filter(id => isPricingSetForService(id)).length}
          </Text>
          <Text style={styles.statLabel}>Priced</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {selectedServiceIds.filter(id => !isPricingSetForService(id)).length}
          </Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {selectedServiceIds.length}
          </Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
    )}

    <TouchableOpacity
      onPress={() => navigation.navigate("SetPrice")}
      style={styles.buttonStyle}
    >
      <Text style={styles.buttonTextStyle}>+ Set Price</Text>
    </TouchableOpacity>
  </>
)}

          {/* STEP 6: Customer Options */}
          {currentStep === 5 && (
            <>
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
            </>
          )}

          {/* STEP 7: Payment */}
          {currentStep === 6 && (
            <>
              <TitleSubtitle
                title="Payment Setup"
                subtitle="Complete your registration by setting up payment."
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("PaymentSetup")}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonTextStyle}>+ Setup Payment</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={[styles.navButtons,{justifyContent: currentStep === 0 ? "flex-end" : "space-between"}]}>
        {currentStep > 0 && (
          // <CustomButton  title="Back" onPress={prevStep} />
          <TouchableOpacity style={styles.buttonmainContainerStyle} onPress={() => prevStep()}>
             <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {currentStep < steps.length - 1 ? (
           <TouchableOpacity style={styles.buttonmainContainerStyle} onPress={() => nextStep()}>
             <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        
        ) : (
           <TouchableOpacity style={styles.buttonmainContainerStyle} onPress={() => {}}>
             <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          
        )}
      </View>
    </View>
  );
};

export default VendorRegistration;

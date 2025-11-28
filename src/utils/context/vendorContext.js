// context/VendorContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppLaunchStatus, setAppLaunched } from "./appLaunchStatus"
import { mockData } from '../data';

export const VendorContext = createContext();

// Create a global token access function with better management
let globalToken = null;
let globalUserDetails = null;
let globalTokenListeners = [];

export const setGlobalAuth = (token, userDetails) => {
  globalToken = token;
  globalUserDetails = userDetails;
  console.log('🔐 Global auth updated:', { token: !!token, userDetails: !!userDetails });
  
  // Notify all listeners about token change
  globalTokenListeners.forEach(listener => listener(token));
};

export const getGlobalToken = () => {
  console.log('🔐 Getting global token:', !!globalToken);
  return globalToken;
};

export const getGlobalUserDetails = () => {
  return globalUserDetails;
};

export const clearGlobalAuth = () => {
  globalToken = null;
  globalUserDetails = null;
  console.log('🔐 Global auth cleared');
  
  // Notify all listeners about token removal
  globalTokenListeners.forEach(listener => listener(null));
};

// Add listener for token changes (useful for axios interceptor)
export const addTokenListener = (listener) => {
  globalTokenListeners.push(listener);
  return () => {
    const index = globalTokenListeners.indexOf(listener);
    if (index > -1) {
      globalTokenListeners.splice(index, 1);
    }
  };
};

export const VendorProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [hasCompletedVendorRegistration, setHasCompletedVendorRegistration] = useState(false);
  const [hasCompletedSubscription, setHasCompletedSubscription] = useState(false);
  
  const initialServices = [
    { id: 1, name: "Dry Wash" },
    { id: 2, name: "Washing" },
    { id: 3, name: "Ironing" },
    { id: 4, name: "Wash & Iron" },
  ];

  // States
  const [owners, setOwners] = useState([]);
  const [branches, setBranches] = useState([]);
  const [location, setLocation] = useState(null);
  const [services] = useState(initialServices);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [priceMap, setPriceMap] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [pricingSet, setPricingSet] = useState(false);
  const [servicePrices, setServicePrices] = useState({});
  const [qrImage, setQrImage] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [formData, setFormData] = useState({
    businessName: '',
    selectedLocation: null,
    owners: [],
    selectedServiceIds: [],
    pricingData: {},
    deliveryOption: 'Pickup & Delivery'
  });

  // Storage functions without dependencies
  const saveFormDataToStorage = useCallback(async (data) => {
    try {
      await AsyncStorage.setItem('vendorFormData', JSON.stringify(data));
      console.log('💾 Form data saved to storage');
    } catch (error) {
      console.log('❌ Error saving form data:', error);
    }
  }, []);

  const loadFormDataFromStorage = useCallback(async () => {
    try {
      const storedFormData = await AsyncStorage.getItem('vendorFormData');
      if (storedFormData) {
        const parsedData = JSON.parse(storedFormData);
        setFormData(parsedData);
        console.log('💾 Form data loaded from storage:', parsedData);
        
        // Sync with individual states
        setOwners(parsedData.owners || []);
        setSelectedServiceIds(parsedData.selectedServiceIds || []);
        setDeliveryOption(parsedData.deliveryOption || 'Pickup & Delivery');
      }
    } catch (error) {
      console.log('❌ Error loading form data:', error);
    }
  }, []);

  const clearFormDataFromStorage = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('vendorFormData');
      console.log('💾 Form data cleared from storage');
    } catch (error) {
      console.log('❌ Error clearing form data:', error);
    }
  }, []);

  // Form update functions with functional updates
  const updateBusinessDetails = useCallback((businessName, selectedLocation) => {
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        businessName,
        selectedLocation
      };
      saveFormDataToStorage(newFormData);
      return newFormData;
    });
  }, [saveFormDataToStorage]);

  const updateOwners = useCallback((owners) => {
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        owners
      };
      saveFormDataToStorage(newFormData);
      return newFormData;
    });
  }, [saveFormDataToStorage]);

  const updateServices = useCallback((selectedServiceIds) => {
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        selectedServiceIds
      };
      saveFormDataToStorage(newFormData);
      return newFormData;
    });
  }, [saveFormDataToStorage]);

  const updatePricing = useCallback((pricingData) => {
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        pricingData
      };
      saveFormDataToStorage(newFormData);
      return newFormData;
    });
  }, [saveFormDataToStorage]);

  const updateDeliveryOption = useCallback((deliveryOption) => {
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        deliveryOption
      };
      saveFormDataToStorage(newFormData);
      return newFormData;
    });
  }, [saveFormDataToStorage]);

  const clearFormData = useCallback(() => {
    const emptyFormData = {
      businessName: '',
      selectedLocation: null,
      owners: [],
      selectedServiceIds: [],
      pricingData: {},
      deliveryOption: 'Pickup & Delivery'
    };
    setFormData(emptyFormData);
    clearFormDataFromStorage();
    // Also clear individual states
    setOwners([]);
    setSelectedServiceIds([]);
    setDeliveryOption('Pickup & Delivery');
  }, [clearFormDataFromStorage]);

  // Sync functions with storage
  const addOwnerWithSync = useCallback((owner) => {
    const newOwners = [...owners, { id: Date.now().toString(), ...owner }];
    setOwners(newOwners);
    updateOwners(newOwners);
  }, [owners, updateOwners]);

  const editOwnerWithSync = useCallback((id, updatedOwner) => {
    const newOwners = owners.map((o) => 
      o.id === id ? { ...o, ...updatedOwner } : o
    );
    setOwners(newOwners);
    updateOwners(newOwners);
  }, [owners, updateOwners]);

  const deleteOwnerWithSync = useCallback((id) => {
    const newOwners = owners.filter((o) => o.id !== id);
    setOwners(newOwners);
    updateOwners(newOwners);
  }, [owners, updateOwners]);

  const toggleServiceCategoryWithSync = useCallback((id) => {
    const newSelectedServiceIds = selectedServiceIds.includes(id) 
      ? selectedServiceIds.filter((x) => x !== id) 
      : [...selectedServiceIds, id];
    setSelectedServiceIds(newSelectedServiceIds);
    updateServices(newSelectedServiceIds);
  }, [selectedServiceIds, updateServices]);

  const setDeliveryOptionWithSync = useCallback((option) => {
    setDeliveryOption(option);
    updateDeliveryOption(option);
  }, [updateDeliveryOption]);

  // FIXED: Load storage data without circular dependencies
  const loadStorageData = useCallback(async () => {
    try {
      console.log('🔄 Loading storage data...');
      
      const [appLaunched, registrationCompleted, subscriptionCompleted, token, userData, storedFormData] = await Promise.all([
        getAppLaunchStatus(),
        AsyncStorage.getItem('vendorRegistrationCompleted'),
        AsyncStorage.getItem('subscriptionCompleted'),
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('userDetails'),
        AsyncStorage.getItem('vendorFormData'),
      ]);

      setIsFirstLaunch(!appLaunched);
      setHasCompletedVendorRegistration(registrationCompleted === 'true');
      setHasCompletedSubscription(subscriptionCompleted === 'true');

      console.log("🔐 Loaded Token:", !!token);
      console.log("👤 Loaded UserData:", !!userData);
      console.log("📝 Loaded FormData:", !!storedFormData);

      if (token) {
        setUserToken(token);
        setGlobalAuth(token, userData ? JSON.parse(userData) : null);
      }
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserDetails(parsedUser);
        if (token) {
          setGlobalAuth(token, parsedUser);
        }
      }

      // Load form data if it exists
      if (storedFormData) {
        const parsedFormData = JSON.parse(storedFormData);
        setFormData(parsedFormData);
        // Sync with individual states
        setOwners(parsedFormData.owners || []);
        setSelectedServiceIds(parsedFormData.selectedServiceIds || []);
        setDeliveryOption(parsedFormData.deliveryOption || 'Pickup & Delivery');
      }
    } catch (error) {
      console.log('❌ Error loading storage data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load data on mount - only once
  useEffect(() => {
    loadStorageData();
  }, []); // Empty dependency array - run only once

  // FIXED: Remove circular dependency useEffects
  // These are no longer needed because the sync functions handle the updates

  const login = async (token, user) => {
    try {
      console.log('🔐 Login process started...', { 
        token: !!token, 
        user: user 
      });
      
      if (!token || !user) {
        throw new Error('Token and user details are required for login');
      }

      // Set AsyncStorage first
      await Promise.all([
        AsyncStorage.setItem('userToken', token),
        AsyncStorage.setItem('userDetails', JSON.stringify(user)),
        AsyncStorage.setItem('vendorRegistrationCompleted', 'false'),
      ]);

      // Then update state and global auth
      setUserToken(token);
      setUserDetails(user);
      setGlobalAuth(token, user);
      
      // Force vendor registration to be false after login
      setHasCompletedVendorRegistration(false);
      
      console.log('✅ Login successful - states updated:', {
        userToken: !!token,
        hasCompletedVendorRegistration: false,
        user: user
      });
      
    } catch (error) {
      console.log('❌ Login error:', error);
      throw error;
    }
  };

  const saveUserDetails = async (user) => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(user));
      setUserDetails(user);
      if (userToken) {
        setGlobalAuth(userToken, user);
      }
    } catch (error) {
      console.log('Error saving user details:', error);
    }
  };
 
  const logout = async () => {
    try {
      console.log('🔐 Logout process started...');
      
      // Clear AsyncStorage
      await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem('userDetails'),
        AsyncStorage.removeItem('userLocation'),
      ]);

      // Clear state
      setUserToken(null);
      setUserDetails(null);
      
      // Clear global auth
      clearGlobalAuth();
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.log('❌ Logout error:', error);
      throw error;
    }
  };

  const completeVendorRegistration = async () => {
    try {
      console.log('Completing vendor registration...');
      await AsyncStorage.setItem('vendorRegistrationCompleted', 'true');
      setHasCompletedVendorRegistration(true);
      // Clear form data after successful registration
      clearFormData();
      console.log('Vendor registration completed and form data cleared');
    } catch (error) {
      console.log('Error completing vendor registration:', error);
      throw error;
    }
  };

  const completeSubscription = async () => {
    try {
      console.log('Completing subscription...');
      await AsyncStorage.setItem('subscriptionCompleted', 'true');
      await setAppLaunched();
      setHasCompletedSubscription(true);
      console.log('Subscription completed and app marked as launched');
    } catch (error) {
      console.log('Error completing subscription:', error);
      throw error;
    }
  };

const getAllPricingData = useCallback(() => {
  const itemPricing = {
    "Dry Wash": { man: [], woman: [], kids: [] },
    "Washing": { man: [], woman: [], kids: [] },
    "Ironing": { man: [], woman: [], kids: [] },
    "Wash & Iron": { man: [], woman: [], kids: [] }
  };

  const selectedServices = services
    .filter(service => selectedServiceIds.includes(service.id))
    .map(service => service.name);

  console.log("✅ Selected Services for Pricing:", selectedServices);

  const categoryItems = {
    man: [
      { name: "Formal Shirt", dataKey: "mens" },
      { name: "T Shirt", dataKey: "mens" },
      // { name: "Casual Shirt", dataKey: "mens" },
      { name: "Jeans", dataKey: "mens" },
      { name: "Trousers", dataKey: "mens" },
      { name: "Suit", dataKey: "mens" },
      { name: "Jacket", dataKey: "mens" },
      { name: "Joggers", dataKey: "mens" }
    ],
    woman: [
      { name: "Saree", dataKey: "womens" },
      { name: "Dress", dataKey: "womens" },
      { name: "Blouse", dataKey: "womens" },
      { name: "Skirt", dataKey: "womens" },
      { name: "Kurti", dataKey: "womens" }
    ],
    kids: [
      { name: "T Shirt", dataKey: "kids" },
      { name: "Joggers", dataKey: "kids" },
      { name: "School Uniform", dataKey: "kids" },
    ]
  };

  // ADD THIS DETAILED DEBUGGING
  console.log("🔍 ====== DEBUGGING T-SHIRT ISSUE ======");
  
  // Check what's actually in mockData
  console.log("🔍 MockData mens items:", mockData.mens.map(item => item.name));
  console.log("🔍 MockData kids items:", mockData.kids.map(item => item.name));
  
  // Check if "T Shirt" exists in mockData
  const tShirtInMens = mockData.mens.find(item => item.name === "T Shirt");
  const tShirtInKids = mockData.kids.find(item => item.name === "T Shirt");
  console.log("🔍 'T Shirt' in mens:", tShirtInMens);
  console.log("🔍 'T Shirt' in kids:", tShirtInKids);

  let tShirtFoundCount = 0;
  let totalProcessed = 0;

  selectedServices.forEach(serviceName => {
    if (itemPricing[serviceName]) {
      Object.keys(categoryItems).forEach(category => {
        categoryItems[category].forEach(itemConfig => {
          totalProcessed++;
          const categoryData = mockData[itemConfig.dataKey];
          
          if (categoryData) {
            // SPECIFIC CHECK FOR T-SHIRT
            if (itemConfig.name === "T Shirt") {
              console.log(`🔍 Looking for "T Shirt" in ${itemConfig.dataKey}:`, {
                categoryDataExists: !!categoryData,
                itemsInCategory: categoryData.map(item => item.name),
                exactMatch: categoryData.find(item => item.name === "T Shirt"),
                allMatches: categoryData.filter(item => item.name.includes("T") && item.name.includes("Shirt"))
              });
            }
            
            const foundItem = categoryData.find(item => item.name === itemConfig.name);
            
            if (foundItem) {
              if (itemConfig.name === "T Shirt") {
                tShirtFoundCount++;
                console.log(`✅ FOUND "T Shirt" in ${itemConfig.dataKey} for service ${serviceName}`);
              }
              
              const service = services.find(s => s.name === serviceName);
              const currentPrice = getItemPrice(service.id, foundItem.id, foundItem.price);
              const priceValue = Math.max(0, Math.round(parseFloat(currentPrice) || 0));
              
              itemPricing[serviceName][category].push({
                item: itemConfig.name,
                price: priceValue
              });
            } else {
              if (itemConfig.name === "T Shirt") {
                console.log(`❌ "T Shirt" NOT FOUND in ${itemConfig.dataKey} for service ${serviceName}`);
                console.log(`   Available items:`, categoryData.map(item => `"${item.name}"`));
              }
            }
          } else {
            console.log(`❌ Category data not found for: ${itemConfig.dataKey}`);
          }
        });
      });
    }
  });

  console.log(`🔍 DEBUG SUMMARY: T-Shirt found ${tShirtFoundCount} times, Total processed: ${totalProcessed}`);

  // Log final counts
  Object.keys(itemPricing).forEach(serviceName => {
    if (selectedServices.includes(serviceName)) {
      console.log(`📊 ${serviceName}:`, {
        man: itemPricing[serviceName].man.length,
        woman: itemPricing[serviceName].woman.length,
        kids: itemPricing[serviceName].kids.length,
        manItems: itemPricing[serviceName].man.map(item => item.item),
        kidsItems: itemPricing[serviceName].kids.map(item => item.item)
      });
    }
  });

  Object.keys(itemPricing).forEach(serviceName => {
    if (!selectedServices.includes(serviceName)) {
      delete itemPricing[serviceName];
    }
  });

  console.log("✅ Final Pricing Data for API:", { itemPricing });
  const pricingData = { itemPricing };
  updatePricing(pricingData);
  return pricingData;
}, [priceMap, services, selectedServiceIds, updatePricing, getItemPrice]);


   const [newPickups, setNewPickups] = useState([
    {
      id: "1",
      estimatedDelivery: "2025-09-16   11.00 Am - 01.00 Pm",
      avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      name: "Niti Patel",
      location: "Maharashtra, India",
      pickupDate: "2025-09-13",
      pickupTime: "09:00 AM - 11:00 AM",
      pickupPoint: "Sopanbagh Colony, Chinchwad Nagar",
      destination: "Nikmar Society, Aundh Gaon",
      status: "new",
      items: [
        { name: "Shirts", quantity: 5, service: "Wash & Iron" },
        { name: "Jeans", quantity: 2, service: "Wash" },
        { name: "Bed Sheets", quantity: 1, service: "Dry Wash" }
      ],
      totalAmount: "₹850",
      daysLeft: 2
    },
    {
      id: "2",
      estimatedDelivery: "2025-09-17   02.00 Pm - 04.00 Pm",
      avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      name: "Rajesh Kumar",
      location: "Pune, India",
      pickupDate: "2025-09-14",
      pickupTime: "10:00 AM - 12:00 PM",
      pickupPoint: "MG Road, Shivajinagar",
      destination: "Koregaon Park, Lane 5",
      status: "new",
      items: [
        { name: "T-shirts", quantity: 8, service: "Wash & Iron" },
        { name: "Towels", quantity: 4, service: "Wash" }
      ],
      totalAmount: "₹650",
      daysLeft: 1
    },
  ]);

 const [acceptedOrders, setAcceptedOrders] = useState([
    {
      id: "3",
      estimatedDelivery: "2025-09-15   03.00 Pm - 05.00 Pm",
      avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      name: "Priya Sharma",
      location: "Mumbai, India",
      pickupDate: "2025-09-12",
      pickupTime: "02:00 PM - 04:00 PM",
      pickupPoint: "Bandra West, Carter Road",
      destination: "Andheri East, Business Park",
      status: "accepted",
      items: [
        { name: "Sarees", quantity: 3, service: "Dry Wash" },
        { name: "Kurtas", quantity: 6, service: "Wash & Iron" }
      ],
      totalAmount: "₹1200",
      acceptedAt: new Date().toISOString(),
      paymentStatus: "pending",
      daysLeft: 0
    }
  ]);



  // Accept order function
  const acceptOrder = (orderId) => {
    const orderToAccept = newPickups.find(order => order.id === orderId);
    if (orderToAccept) {
      setNewPickups(prev => prev.filter(order => order.id !== orderId));
      setAcceptedOrders(prev => [...prev, {
        ...orderToAccept,
        status: "accepted",
        acceptedAt: new Date().toISOString(),
        paymentStatus: "pending"
      }]);
    }
  };

  const rejectOrder = (orderId) => {
    setNewPickups(prev => prev.filter(order => order.id !== orderId));
  };

  const completePayment = (orderId) => {
    setAcceptedOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, paymentStatus: "completed" }
          : order
      )
    );
  };

  const completeOrder = (orderId) => {
    setAcceptedOrders(prev => prev.filter(order => order.id !== orderId));
  };

  // Other existing functions...
  const setPricingComplete = (prices) => {
    setServicePrices(prices);
    setPricingSet(true);
  };

  const isPricingSetForService = (serviceId) => {
    return servicePrices[serviceId] !== undefined && servicePrices[serviceId] !== null;
  };

  const getServicePrice = (serviceId) => {
    return servicePrices[serviceId] || null;
  };

  const getPricingSummary = () => {
    const pricedServices = selectedServiceIds.filter(id => isPricingSetForService(id));
    return {
      totalServices: selectedServiceIds.length,
      pricedServices: pricedServices.length,
      pendingServices: selectedServiceIds.length - pricedServices.length,
    };
  };

  const clearPricing = () => {
    setServicePrices({});
    setPricingSet(false);
  };

  const updateServicePrice = (serviceId, priceData) => {
    setServicePrices(prev => ({
      ...prev,
      [serviceId]: priceData
    }));
  };

  // Delivery Option
  const [deliveryOption, setDeliveryOption] = useState("Delivery");

  // Original functions (kept for compatibility)
  const addOwner = (owner) =>
    setOwners((prev) => [...prev, { id: Date.now().toString(), ...owner }]);

  const editOwner = (id, updatedOwner) => {
    setOwners((prev) => prev.map((o) => (o.id === id ? { ...o, ...updatedOwner } : o)));
  };

  const deleteOwner = (id) => {
    setOwners((prev) => prev.filter((o) => o.id !== id));
  };

  // Branch Functions
  const addBranch = (branch) =>
    setBranches((prev) => [...prev, { id: Date.now().toString(), ...branch }]);

  const editBranch = (id, updatedBranch) => {
    setBranches((prev) => prev.map((b) => (b.id === id ? { ...b, ...updatedBranch } : b)));
  };

  const deleteBranch = (id) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  // Services
  const toggleServiceCategory = (id) =>
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

const setItemPrice = useCallback((serviceId, itemId, price) => {
  const key = `${serviceId}_${itemId}`;
  setPriceMap(prev => ({ ...prev, [key]: price }));
}, []);

const getItemPrice = useCallback((serviceId, itemId, defaultPrice = 0) => {
  const key = `${serviceId}_${itemId}`;
  return priceMap[key] !== undefined ? priceMap[key] : defaultPrice;
}, [priceMap]);



  const addCoupon = (coupon) => setCoupons((p) => [...p, coupon]);

  const saveLocation = async (location) => {
    try {
      if (!location?.address) {
        console.log("⚠️ No address found in location object:", location);
        return;
      }

      let cityName = location.city;
      if (!cityName && location.address) {
        const parts = location.address.split(',').map(p => p.trim());
        cityName = parts[parts.length - 3] || '';
      }

      const shortAddress = getShortAddress(location.address, cityName);
      const cleanedLocation = {
        ...location,
        city: cityName || location.city || '',
        address: shortAddress || location.address,
      };

      await AsyncStorage.setItem('userLocation', JSON.stringify(cleanedLocation));
      console.log("📍 Saved Cleaned Location:", cleanedLocation);
      setUserLocation(cleanedLocation);
    } catch (error) {
      console.log('❌ Save location error:', error);
    }
  };

  const getShortAddress = (fullAddress, cityName) => {
    if (!fullAddress) return '';

    const addressParts = fullAddress
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    const street = addressParts.find(
      (part) =>
        !/taluka|district|india/i.test(part) &&
        !part.toLowerCase().includes(cityName?.toLowerCase() || '')
    );

    if (!street && cityName) return cityName;
    if (street && !cityName) return street;
    if (!street && !cityName) return '';

    return `${street}, ${cityName}`.trim();
  };

  return (
    <VendorContext.Provider
      value={{
        // Auth & User
        userToken,
        userDetails,
        saveUserDetails,
        isFirstLaunch,
        hasCompletedVendorRegistration,
        login,
        logout,
        completeVendorRegistration,
        isLoading,
        
        // Owners & Branches
        owners,
        addOwner: addOwnerWithSync, // Use sync version
        editOwner: editOwnerWithSync, // Use sync version
        deleteOwner: deleteOwnerWithSync, // Use sync version
        branches,
        addBranch,
        editBranch,
        deleteBranch,
        
        // Location
        location,
        setLocation,
        
        // Services & Pricing
        services,
        selectedServiceIds,
        toggleServiceCategory: toggleServiceCategoryWithSync, // Use sync version
        priceMap,
        setItemPrice,
        coupons,
        addCoupon,
        
        // Delivery
        deliveryOption,
        setDeliveryOption: setDeliveryOptionWithSync, // Use sync version
        
        // Pricing Management
        pricingSet,
        servicePrices,
        setPricingComplete,
        isPricingSetForService,
        getServicePrice,
        getPricingSummary,
        clearPricing,
        updateServicePrice,
        
        // QR & Location
        qrImage,
        setQrImage,
        
        // Orders
        newPickups,
        acceptedOrders,
        acceptOrder,
        rejectOrder,
        completeOrder,
        completePayment,
        
        // User Location
        saveLocation,
        setUserLocation,
        userLocation,
        
        // Subscription
        hasCompletedSubscription,
        completeSubscription,
        
        // Pricing Data
        getAllPricingData,
        reloadAuth: loadStorageData,
        
        // Form Data Persistence
        formData,
        updateBusinessDetails,
        updateOwners,
        updateServices,
        updatePricing,
        updateDeliveryOption,
        clearFormData,
        getItemPrice,
        
        // Storage Functions
        saveFormDataToStorage,
        loadFormDataFromStorage,
        clearFormDataFromStorage,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
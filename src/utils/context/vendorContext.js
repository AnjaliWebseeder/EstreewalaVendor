import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppLaunchStatus, setAppLaunched } from "./appLaunchStatus"
import { mockData } from '../data';

export const VendorContext = createContext();

// Create a global token access function
let globalToken = null;
let globalUserDetails = null;

export const setGlobalAuth = (token, userDetails) => {
  globalToken = token;
  globalUserDetails = userDetails;
  console.log('🔐 Global auth updated:', { token: !!token, userDetails: !!userDetails });
};

export const getGlobalToken = () => {
  return globalToken;
};

export const getGlobalUserDetails = () => {
  return globalUserDetails;
};

export const clearGlobalAuth = () => {
  globalToken = null;
  globalUserDetails = null;
  console.log('🔐 Global auth cleared');
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

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const appLaunched = await getAppLaunchStatus();
        setIsFirstLaunch(!appLaunched);

        const registrationCompleted = await AsyncStorage.getItem('vendorRegistrationCompleted');
        setHasCompletedVendorRegistration(registrationCompleted === 'true');

        const subscriptionCompleted = await AsyncStorage.getItem('subscriptionCompleted');
        setHasCompletedSubscription(subscriptionCompleted === 'true');

        // ✅ Load token and user separately
        const token = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userDetails');
        console.log("TOKEN IS", token);
        console.log("USERDATA IS", userData);

        if (token) {
          setUserToken(token);
          setGlobalAuth(token, userData ? JSON.parse(userData) : null); // Set global auth
        }
        if (userData) setUserDetails(JSON.parse(userData));
      } catch (error) {
        console.log('Error loading storage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const login = async (token, user) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userDetails', JSON.stringify(user));
      setUserToken(token);
      setUserDetails(user);
      setGlobalAuth(token, user); // Update global auth
    } catch (error) {
      console.log('Error saving auth:', error);
    }
  };

  const saveUserDetails = async (user) => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(user));
      setUserDetails(user);
      setGlobalAuth(userToken, user); // Update global auth with current token
    } catch (error) {
      console.log('Error saving user details:', error);
    }
  };
 
  const logout = async () => {
    try {
      console.log('Logging out...');
      await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem('userDetails'),
        AsyncStorage.removeItem('userLocation'),
      ]);
      setUserToken(null);
      setUserDetails(null);
      clearGlobalAuth(); // Clear global auth
      console.log('Logout successful - app launch status preserved');
    } catch (error) {
      console.log('Logout error:', error);
      throw error;
    }
  };

  const completeVendorRegistration = async () => {
    try {
      console.log('Completing vendor registration...');
      await AsyncStorage.setItem('vendorRegistrationCompleted', 'true');
      setHasCompletedVendorRegistration(true);
      console.log('Vendor registration completed');
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

  // ... rest of your existing functions remain the same ...
  // CORRECTED getAllPricingData function - matches API structure exactly
  const getAllPricingData = useCallback(() => {
    // Initialize the structure exactly as API expects
    const itemPricing = {
      "Dry Wash": { man: [], woman: [], kids: [] },
      "Washing": { man: [], woman: [], kids: [] },
      "Ironing": { man: [], woman: [], kids: [] },
      "Wash & Iron": { man: [], woman: [], kids: [] }
    };

    // Get selected services
    const selectedServices = services
      .filter(service => selectedServiceIds.includes(service.id))
      .map(service => service.name);

    console.log("✅ Selected Services for Pricing:", selectedServices);

    // Define which items belong to which category
    const categoryItems = {
      man: [
        { name: "Formal Shirt", dataKey: "mens" },
        { name: "T Shirt", dataKey: "kids" }, // T Shirt is in kids category
        { name: "Jeans", dataKey: "mens" },
        { name: "Trousers", dataKey: "mens" },
        { name: "Suit", dataKey: "mens" },
        { name: "Jacket", dataKey: "mens" },
        { name: "Joggers", dataKey: "kids" }
      ],
      woman: [
        { name: "Saree", dataKey: "womens" },
        { name: "Dress", dataKey: "womens" },
        { name: "Blouse", dataKey: "womens" },
        { name: "Skirt", dataKey: "womens" },
        { name: "Kurti", dataKey: "womens" }
      ],
      kids: [
        { name: "School Uniform", dataKey: "kids" },
        { name: "T Shirt", dataKey: "kids" },
        { name: "Joggers", dataKey: "kids" }
      ]
    };

    // For each selected service, populate the pricing structure
    selectedServices.forEach(serviceName => {
      // Only process services that are in our itemPricing structure
      if (itemPricing[serviceName]) {
        Object.keys(categoryItems).forEach(category => {
          categoryItems[category].forEach(itemConfig => {
            // Find the item in mockData
            const categoryData = mockData[itemConfig.dataKey];
            if (categoryData) {
              const foundItem = categoryData.find(item => item.name === itemConfig.name);
              
              if (foundItem) {
                const currentPrice = priceMap[foundItem.id] !== undefined ? priceMap[foundItem.id] : foundItem.price;
                const priceValue = Math.max(1, Math.round(parseFloat(currentPrice) || 0));
                
                // Add to the appropriate service and category
                itemPricing[serviceName][category].push({
                  item: itemConfig.name,
                  price: priceValue
                });
              }
            }
          });
        });
      }
    });

    // Remove services that weren't selected by user
    Object.keys(itemPricing).forEach(serviceName => {
      if (!selectedServices.includes(serviceName)) {
        delete itemPricing[serviceName];
      } else {
        // Also remove empty categories within selected services
        Object.keys(itemPricing[serviceName]).forEach(category => {
          if (itemPricing[serviceName][category].length === 0) {
            // Keep the category but you can delete if you want empty arrays removed
            // delete itemPricing[serviceName][category];
          }
        });
      }
    });

    console.log("✅ Final Pricing Data for API:", { itemPricing });
    return { itemPricing }; // Return as object with itemPricing key
  }, [priceMap, services, selectedServiceIds]);


  // New pickups - orders waiting for acceptance
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

  // Accepted orders - ready for payment
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

  // Accept order - move from newPickups to acceptedOrders
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

  // Complete payment on accepted orders
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

  // Owner Functions
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

  const setItemPrice = (itemId, price) =>
    setPriceMap((p) => ({ ...p, [itemId]: price }));

  const addCoupon = (coupon) => setCoupons((p) => [...p, coupon]);

  const saveLocation = async (location) => {
    try {
      if (!location?.address) {
        console.log("⚠️ No address found in location object:", location);
        return;
      }

      // Extract city if not present
      let cityName = location.city;
      if (!cityName && location.address) {
        const parts = location.address.split(',').map(p => p.trim());
        cityName = parts[parts.length - 3] || ''; // fallback city
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
        userToken,
        userDetails,
        saveUserDetails,
        isFirstLaunch,
        hasCompletedVendorRegistration,
        login,
        logout,
        completeVendorRegistration,
        isLoading,
        owners,
        addOwner,
        editOwner,
        deleteOwner,
        branches,
        addBranch,
        editBranch,
        deleteBranch,
        location,
        setLocation,
        services,
        selectedServiceIds,
        toggleServiceCategory,
        priceMap,
        setItemPrice,
        coupons,
        addCoupon,
        deliveryOption,
        setDeliveryOption,
        pricingSet,
        servicePrices,
        setPricingComplete,
        isPricingSetForService,
        getServicePrice,
        getPricingSummary,
        clearPricing,
        updateServicePrice,
        qrImage,
        setQrImage,
        newPickups,
        acceptedOrders,
        acceptOrder,
        rejectOrder,
        completeOrder,
        completePayment,
        saveLocation,
        setUserLocation,
        userLocation,
        hasCompletedSubscription,
        completeSubscription,
        getAllPricingData
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
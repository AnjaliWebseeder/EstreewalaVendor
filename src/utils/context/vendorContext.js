import React, { createContext, useState,useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAppLaunchStatus , setAppLaunched} from "../context/appLaunchStatus"
import { mockData } from '../data';
export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 const [isFirstLaunch, setIsFirstLaunch] = useState(true); // Default to true
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



useEffect(() => {
    const loadStorageData = async () => {
      try {
        // Check if app is launched for the first time
        const appLaunched = await getAppLaunchStatus();
        console.log('App launched status:', appLaunched);
        setIsFirstLaunch(!appLaunched);

        // Check if vendor registration was completed
        const registrationCompleted = await AsyncStorage.getItem('vendorRegistrationCompleted');
        console.log('Vendor registration status:', registrationCompleted);
        setHasCompletedVendorRegistration(registrationCompleted === 'true');

        // Check if subscription was completed
        const subscriptionCompleted = await AsyncStorage.getItem('subscriptionCompleted');
        console.log('Subscription status:', subscriptionCompleted);
        setHasCompletedSubscription(subscriptionCompleted === 'true');

        const token = await AsyncStorage.getItem('userToken');
        console.log('User token:', !!token);
        setUserToken(token);
      } catch (error) {
        console.log('Error loading storage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  };


  // FIXED LOGOUT - Clear specific data only
 const logout = async () => {
    try {
      console.log('Logging out...');
      // ONLY remove user-specific data, keep app launch status
      await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem('userLocation'),
        // DON'T remove: appLaunched, vendorRegistrationCompleted, subscriptionCompleted
      ]);
      setUserToken(null);
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
      await setAppLaunched(); // Mark app as launched after subscription
      setHasCompletedSubscription(true);
      console.log('Subscription completed and app marked as launched');
    } catch (error) {
      console.log('Error completing subscription:', error);
      throw error;
    }
  };

// In VendorContext.js - update getAllPricingData function
const getAllPricingData = useCallback(() => {
  const itemPricing = {
    "Dry Wash": [],
    "Washing": [],
    "Ironing": [],
    "Wash & Iron": []
  };
  
  // Get selected services
  const selectedServices = services.filter(service => 
    selectedServiceIds.includes(service.id)
  ).map(service => service.name);

  // For each selected service, add items with their prices
  selectedServices.forEach(serviceName => {
    Object.keys(mockData).forEach(category => {
      mockData[category].forEach(item => {
        const currentPrice = priceMap[item.id] !== undefined ? priceMap[item.id] : item.price;
        const priceValue = Math.max(1, Math.round(parseFloat(currentPrice) || 0));
        
        // Add item to the corresponding service array
        if (itemPricing[serviceName]) {
          itemPricing[serviceName].push({
            item: item.name,
            price: priceValue
          });
        }
      });
    });
  });
  
  console.log("✅ Final Pricing Data Structure:", itemPricing);
  return itemPricing;
}, [priceMap, services, selectedServiceIds]);
  
  // New pickups - orders waiting for acceptance
  const [newPickups, setNewPickups] = useState([
    {
      id: "1",
      estimatedDelivery: "2025-09-16   11.00 Am - 01.00 Pm",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
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
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
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
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
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
        acceptedOrders, // Changed from inProgressOrders to acceptedOrders
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
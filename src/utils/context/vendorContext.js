import React, { createContext, useState } from 'react';

export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const initialServices = [
    { id: 1, name: "Dry Wash" },
    { id: 2, name: "Wash" },
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

  return (
    <VendorContext.Provider
      value={{
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
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
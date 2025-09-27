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
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
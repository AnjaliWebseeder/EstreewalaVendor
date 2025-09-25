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

  // ✅ New: Delivery Options (radio)
  const [deliveryOption, setDeliveryOption] = useState("Delivery"); 
  // default = Delivery (you can leave it null if you want nothing pre-selected)

  // Functions

  const addBranch = (branch) => setBranches((prev) => [...prev, branch]);

  const toggleServiceCategory = (id) =>
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const setItemPrice = (itemId, price) =>
    setPriceMap((p) => ({ ...p, [itemId]: price }));

  const addCoupon = (coupon) => setCoupons((p) => [...p, coupon]);


  const addOwner = (owner) => setOwners((prev) => [...prev, { id: Date.now().toString(), ...owner }]);

const editOwner = (id, updatedOwner) => {
  setOwners((prev) => prev.map((o) => (o.id === id ? { ...o, ...updatedOwner } : o)));
};

const deleteOwner = (id) => {
  setOwners((prev) => prev.filter((o) => o.id !== id));
};

  return (
    <VendorContext.Provider
      value={{
        owners,
        addOwner,
        editOwner,
        deleteOwner,
        branches,
        addBranch,
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
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

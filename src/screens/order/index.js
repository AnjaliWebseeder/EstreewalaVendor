import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  AppState,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomerPickupList from '../../otherComponent/home/customerPickupCard';
import appColors from '../../theme/appColors';
import { VendorContext } from '../../utils/context/vendorContext';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import Header from '../../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorOrders, optimisticallyUpdateOrderStatus } from '../../redux/slices/vendorOrderSlice';
import { useIsFocused } from '@react-navigation/native';

export default function Orders({ navigation, route }) {
  const { acceptOrder, rejectOrder, socket, isSocketConnected } = useContext(VendorContext);
  const dispatch = useDispatch();
  
  const { 
    pendingOrders, 
    acceptedOrders, 
    completedOrders, 
    rejectedOrders, 
    loading 
  } = useSelector(state => state.vendorOrders);

  const [activeTab, setActiveTab] = useState('new');
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const isFocused = useIsFocused();

  // ✅ Socket event handlers
  useEffect(() => {
    if (socket && isSocketConnected) {
      console.log('🎯 Setting up socket listeners for vendor orders');

      // New order received
      socket.on('new-order', (data) => {
        console.log('🆕 New order received via socket:', data);
        handleNewOrder(data);
      });

      // Order cancelled by customer
      socket.on('order-cancelled', (data) => {
        console.log('❌ Order cancelled via socket:', data);
        handleOrderCancelled(data);
      });

      // Order status changed (for self-update confirmation)
      socket.on('order-status-changed', (data) => {
        console.log('📦 Order status changed via socket:', data);
        handleOrderStatusChanged(data);
      });

      // Cleanup on unmount
      return () => {
        console.log('🧹 Cleaning up socket listeners');
        socket.off('new-order');
        socket.off('order-cancelled');
        socket.off('order-status-changed');
      };
    }
  }, [socket, isSocketConnected]);

  // ✅ Handle new order from socket
  const handleNewOrder = useCallback((data) => {
    const { orderId, customerName, items, totalAmount, pickupDateTime, deliveryAddress, contactDetails } = data;
    
    // Transform socket data to match your existing order structure
    const newOrder = {
      id: orderId,
      customer: {
        name: customerName,
        phone: contactDetails?.phone || ''
      },
      items: items,
      totalAmount: totalAmount,
      pickupDate: pickupDateTime ? new Date(pickupDateTime).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      pickupTime: '09:00 AM - 11:00 AM', // Default or calculate from pickupDateTime
      deliveryAddress: {
        address: deliveryAddress?.address || '',
        house: deliveryAddress?.house || '',
        landmark: deliveryAddress?.landmark || '',
        coordinates: deliveryAddress?.coordinates
      },
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      deliveryDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], // 2 days later
      deliveryTime: '11:00 AM - 01:00 PM' // Default
    };

    // Optimistically add to pending orders
    dispatch(optimisticallyUpdateOrderStatus({
      orderId: orderId,
      newStatus: 'pending',
      orderData: newOrder
    }));

    // Optional: Show notification or alert
    console.log('✅ New order added via socket:', orderId);
  }, [dispatch]);

  // ✅ Handle order cancelled from socket
  const handleOrderCancelled = useCallback((data) => {
    const { orderId, customerName, totalAmount, cancellationReason } = data;
    
    // Optimistically move to rejected orders
    dispatch(optimisticallyUpdateOrderStatus({
      orderId: orderId,
      newStatus: 'rejected', // Using rejected for cancelled orders
      orderData: {
        id: orderId,
        customer: { name: customerName },
        totalAmount: totalAmount,
        status: 'rejected',
        cancellationReason: cancellationReason,
        updatedAt: new Date().toISOString()
      }
    }));

    console.log('✅ Order marked as cancelled via socket:', orderId);
  }, [dispatch]);

  // ✅ Handle order status changed from socket (self-update confirmation)
  const handleOrderStatusChanged = useCallback((data) => {
    const { orderId, status, reason } = data;
    
    // Find the current order to preserve its data
    const allOrders = [...pendingOrders, ...acceptedOrders, ...completedOrders, ...rejectedOrders];
    const existingOrder = allOrders.find(order => order.id === orderId);
    
    if (existingOrder) {
      // Optimistically update the order status
      dispatch(optimisticallyUpdateOrderStatus({
        orderId: orderId,
        newStatus: status,
        orderData: {
          ...existingOrder,
          status: status,
          ...(reason && { rejectionReason: reason })
        }
      }));

      console.log('✅ Order status updated via socket:', { orderId, status });
    } else {
      console.log('⚠️ Order not found for status update:', orderId);
      // Refresh orders if order not found
      fetchAllOrders();
    }
  }, [dispatch, pendingOrders, acceptedOrders, completedOrders, rejectedOrders]);

  // ✅ Set active tab from params (optional)
  useEffect(() => {
    if (route.params?.openTab) {
      setActiveTab(route.params.openTab);
    }
  }, [route.params?.openTab]);

  // ✅ Optimized fetch function with caching
  const fetchAllOrders = useCallback(async () => {
    try {
      console.log('🔄 Fetching all orders...');
      await Promise.all([
        dispatch(fetchVendorOrders('pending')),
        dispatch(fetchVendorOrders('accepted')),
        dispatch(fetchVendorOrders('completed')),
        dispatch(fetchVendorOrders('rejected'))
      ]);
    } catch (error) {
      console.log('Error fetching orders:', error);
    } finally {
      setInitialLoad(false);
    }
  }, [dispatch]);

  // ✅ Fetch on mount only once
  useEffect(() => {
    if (initialLoad) {
      fetchAllOrders();
    }
  }, [initialLoad, fetchAllOrders]);

  // ✅ Fetch when screen comes into focus (with debounce)
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        fetchAllOrders();
      }, 300); // Small delay to prevent rapid refetches
      
      return () => clearTimeout(timer);
    }, [fetchAllOrders])
  );

  // ✅ Manual refresh function
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAllOrders();
    setTimeout(() => setRefreshing(false), 1000);
  }, [fetchAllOrders]);

  // ✅ Optimized tab change handler
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    // No API call on tab change - data is already loaded
  }, []);

  // ✅ Optimized data transformation with memoization
  const transformOrderData = useCallback((order) => {
    const acceptedAt = new Date(order.createdAt);
    const isAcceptedValid = !isNaN(acceptedAt);
    
    let daysLeft = '—';
    if (order?.deliveryDate) {
      const [year, month, day] = order.deliveryDate.split('-').map(Number);
      const deliveryDate = new Date(year, month - 1, day);
      const today = new Date();
      const timeDiff = deliveryDate - today;
      daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    return {
      id: order.id,
      totalAmount: `₹${order.totalAmount}`,
      name: order.customer?.name,
      location: order.deliveryAddress?.address || '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      pickupDate: order?.pickupDate,
      pickupTime: order?.pickupTime,
      estimatedDelivery: order?.deliveryDate,
      estimatedDeliveryTime: order?.deliveryTime,
      pickupPoint: 'Customer Location',
      destination: order.deliveryAddress?.landmark,
      daysLeft: daysLeft,
      paymentStatus: order.paymentStatus || 'pending',
      status: order.status,
      acceptedAt: isAcceptedValid
        ? `${acceptedAt.toLocaleDateString('en-GB')} ${acceptedAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`
        : '—',
      // Include socket-specific data if available
      cancellationReason: order.cancellationReason,
      rejectionReason: order.rejectionReason
    };
  }, []);

  // ✅ Memoized data for each tab
  const newPickups = useMemo(() => 
    pendingOrders?.map(transformOrderData) || [], 
    [pendingOrders, transformOrderData]
  );

  const inProgress = useMemo(() => 
    acceptedOrders?.map(transformOrderData) || [], 
    [acceptedOrders, transformOrderData]
  );

  const completed = useMemo(() => 
    completedOrders?.map(transformOrderData) || [], 
    [completedOrders, transformOrderData]
  );

  const rejected = useMemo(() => 
    rejectedOrders?.map(transformOrderData) || [], 
    [rejectedOrders, transformOrderData]
  );

  // ✅ Memoized tab content renderer
  const renderTabContent = useCallback(() => {
    const tabConfig = {
      new: { data: newPickups, showButtons: true, status: 'new' },
      inProgress: { data: inProgress, showButtons: false, status: 'inProgress' },
      completed: { data: completed, showButtons: false, status: 'completed' },
      rejected: { data: rejected, showButtons: false, status: 'rejected' }
    };

    const config = tabConfig[activeTab] || tabConfig.new;

    return (
      <CustomerPickupList
        data={config.data}
        showButtons={config.showButtons}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        status={config.status}
      />
    );
  }, [activeTab, newPickups, inProgress, completed, rejected, handleRefresh, refreshing]);

  // ✅ Memoized tab buttons to prevent re-renders
  const TabButton = useCallback(({ tab, label, data }) => (
    <TouchableOpacity
      style={[styles.tab, activeTab === tab && styles.activeTab]}
      onPress={() => handleTabChange(tab)}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {label}
      </Text>
      {data?.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{data.length}</Text>
        </View>
      )}
      {activeTab === tab && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  ), [activeTab, handleTabChange]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="transparent" />
      <Header 
        title={'Orders'} 
        onBack={() => navigation.goBack()}
        showRefresh={true}
        onRefresh={handleRefresh}
      />
      
      <ScrollView 
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[appColors.primary]}
            tintColor={appColors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Four Tabs: New Pickups, In Progress, Completed, Rejected */}
        <View style={styles.tabContainer}>
          <TabButton tab="new" label="New Pickups" data={newPickups} />
          <TabButton tab="inProgress" label="In Progress" data={inProgress} />
          <TabButton tab="completed" label="Completed" data={completed} />
          <TabButton tab="rejected" label="Rejected" data={rejected} />
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>
          {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomerPickupList from '../../otherComponent/home/customerPickupCard';
import appColors from '../../theme/appColors';
import { VendorContext } from '../../utils/context/vendorContext';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import Header from '../../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorOrders } from '../../redux/slices/vendorOrderSlice';

export default function Orders({ navigation }) {
  const {
    // newPickups,
    // acceptedOrders, // Changed from inProgressOrders
    acceptOrder,
    rejectOrder,
  } = useContext(VendorContext);

  const dispatch = useDispatch();
  const { pendingOrders, acceptedOrders, loading } = useSelector(
    state => state.vendorOrders,
  );

  const [activeTab, setActiveTab] = useState('new');

  const route = useRoute();

  useEffect(() => {
    if (route.params?.openTab) {
      setActiveTab(route.params.openTab);
    }
  }, [route.params?.openTab]);

  // ✅ Fetch both statuses once on mount
  useEffect(() => {
    dispatch(fetchVendorOrders('pending'));
    dispatch(fetchVendorOrders('accepted'));
  }, [dispatch]);

  const newPickups = useMemo(() => {
    return pendingOrders?.map(order => ({
      id: order.id,
      totalAmount: `₹${order.totalAmount}`,
      name: order.customer?.name || 'Unknown',
      location: order.customer?.phone || '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      pickupDate: new Date(order.pickupDateTime).toLocaleDateString(),
      pickupTime: new Date(order.pickupDateTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      estimatedDelivery: `${new Date(
        order.deliveryDateTime,
      ).toLocaleDateString()} ${new Date(
        order.deliveryDateTime,
      ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      pickupPoint: 'Customer Location',
      destination: order.instructions || 'N/A',
      daysLeft: Math.ceil(
        (new Date(order.deliveryDateTime) - new Date()) / (1000 * 60 * 60 * 24),
      ),
      paymentStatus: 'pending',
      status: order.status,
      acceptedAt: order.createdAt,
    }));
  }, [pendingOrders]);

  const inProgress = useMemo(() => {
    return acceptedOrders?.map(order => ({
      id: order.id,
      totalAmount: `₹${order.totalAmount}`,
      name: order.customer?.name || 'Unknown',
      location: order.customer?.phone || '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      pickupDate: new Date(order.pickupDateTime).toLocaleDateString(),
      pickupTime: new Date(order.pickupDateTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      estimatedDelivery: `${new Date(
        order.deliveryDateTime,
      ).toLocaleDateString()} ${new Date(
        order.deliveryDateTime,
      ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      pickupPoint: 'Customer Location',
      destination: order.instructions || 'N/A',
      daysLeft: Math.ceil(
        (new Date(order.deliveryDateTime) - new Date()) / (1000 * 60 * 60 * 24),
      ),
      paymentStatus: 'pending',
      status: order.status,
      acceptedAt: order.createdAt,
    }));
  }, [acceptedOrders]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'new':
        return (
          <CustomerPickupList
            data={newPickups}
            showButtons={true} // Shows Accept/Decline buttons
          />
        );
      case 'inProgress':
        return (
          <CustomerPickupList
            data={inProgress}
            showButtons={false} // Shows Make Payment button
          />
        );
      default:
        return <CustomerPickupList data={newPickups} showButtons={true} />;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="transparent" />
      <Header title={'Orders'} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {/* Two Tabs: New Pickups and In Progress */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'new' && styles.activeTab]}
            onPress={() => setActiveTab('new')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'new' && styles.activeTabText,
              ]}
            >
              New Pickups
            </Text>
            {newPickups?.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{newPickups?.length}</Text>
              </View>
            )}
            {activeTab === 'new' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'inProgress' && styles.activeTab]}
            onPress={() => setActiveTab('inProgress')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'inProgress' && styles.activeTabText,
              ]}
            >
              In Progress
            </Text>
            {acceptedOrders.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{acceptedOrders.length}</Text>
              </View>
            )}
            {activeTab === 'inProgress' && (
              <View style={styles.activeIndicator} />
            )}
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>{renderTabContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../../theme/appColors';
import Header from '../../otherComponent/home/header';
import StatusCard from '../../otherComponent/home/statusCard';
import { windowHeight } from '../../theme/appConstant';
import CustomerPickup from '../../otherComponent/home/customerPickupCard';
import Title from '../../components/title';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorOrders } from '../../redux/slices/vendorOrderSlice';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { pendingOrders, loading } = useSelector(state => state.vendorOrders);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchVendorOrders('pending'));
  }, [dispatch]);

  // Optimized refresh function
  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchVendorOrders('pending'));
    setRefreshing(false);
  };

const newPickups = useMemo(() => {
  return pendingOrders?.map(order => {
    const acceptedAt = new Date(order.createdAt);
    const isAcceptedValid = !isNaN(acceptedAt);
    let daysLeft = '—';

    if (order?.deliveryDate) {
      // Split YYYY-MM-DD and create Date in local timezone
      const [year, month, day] = order.deliveryDate.split('-').map(Number);
      const deliveryDate = new Date(year, month - 1, day); // month is 0-indexed
      const today = new Date();
      const timeDiff = deliveryDate - today;
      daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    return {
      id: order.id,
      totalAmount: `₹${order.totalAmount}`,
      name: order.customer?.name ,
      location: order.deliveryAddress?.address || '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',

      pickupDate: order?.pickupDate,
      pickupTime: order?.pickupTime,

      estimatedDelivery: order?.deliveryDate,
      estimatedDeliveryTime: order?.deliveryTime,

      pickupPoint: 'Customer Location',
      destination: order.deliveryAddress?.landmark || 'N/A',
      daysLeft: daysLeft,

      paymentStatus: 'pending',
      status: order.status,

      acceptedAt: isAcceptedValid
        ? `${acceptedAt.toLocaleDateString('en-GB')} ${acceptedAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`
        : '—',
    };
  });
}, [pendingOrders]);


  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView 
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
       <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.headerStyle}>
          <Header navigation={navigation} />
        </View>
        <View style={styles.container}>
          <StatusCard />
          <Title children={'New Customer Pickup'} />
          <CustomerPickup 
            data={newPickups} 
            showButtons={true} 
            onRefresh={handleRefresh}
            refreshing={refreshing}
            status="new"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: appColors.background },
  headerStyle: {
    headerStyle: {
      backgroundColor: appColors.secondary,
      paddingBottom: windowHeight(25),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      overflow: 'hidden',
    },
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: appColors.background,
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 80,
  },
});

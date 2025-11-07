import React, { useContext, useEffect, useMemo } from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../../theme/appColors';
import Header from '../../otherComponent/home/header';
import StatusCard from '../../otherComponent/home/statusCard';
import { windowHeight } from '../../theme/appConstant';
import CustomerPickup from '../../otherComponent/home/customerPickupCard';
import Title from '../../components/title';
import { VendorContext } from '../../utils/context/vendorContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorOrders } from '../../redux/slices/vendorOrderSlice';

export default function Home({ navigation }) {
  //  const { newPickups } = useContext(VendorContext);
  const dispatch = useDispatch();
  const { pendingOrders, loading } = useSelector(state => state.vendorOrders);

  useEffect(() => {
    dispatch(fetchVendorOrders('pending'));
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
      ).toLocaleDateString()}   ${new Date(
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

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.headerStyle}>
          <Header navigation={navigation} />
        </View>
        <View style={styles.container}>
          <StatusCard />
          <Title children={'New Customer Pickup'} />
          <CustomerPickup data={newPickups} showButtons={true} />
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

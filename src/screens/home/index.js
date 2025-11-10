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
  return pendingOrders?.map(order => {
    const pickupDate = new Date(order.pickupDateTime);
    const deliveryDate = new Date(order.deliveryDateTime);
    const acceptedAt = new Date(order.createdAt);

    const isPickupValid = !isNaN(pickupDate);
    const isDeliveryValid = !isNaN(deliveryDate);
    const isAcceptedValid = !isNaN(acceptedAt);

    return {
      id: order.id,
      totalAmount: `₹${order.totalAmount}`,
      name: order.customer?.name || 'Unknown',
      location: order.deliveryAddress?.address || '',
      avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',

      pickupDate: isPickupValid
        ? pickupDate.toLocaleDateString('en-GB') // DD/MM/YYYY
        : '—',

      pickupTime: isPickupValid
        ? pickupDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '—',

      estimatedDelivery: isDeliveryValid
        ? `${deliveryDate.toLocaleDateString('en-GB')} ${deliveryDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`
        : '—',

      pickupPoint: 'Customer Location',
      destination: order.instructions || 'N/A',

      daysLeft: isDeliveryValid
        ? Math.ceil((deliveryDate - new Date()) / (1000 * 60 * 60 * 24))
        : 0,

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

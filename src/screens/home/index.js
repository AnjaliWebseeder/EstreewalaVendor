import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../../theme/appColors';
import Header from "../../otherComponent/home/header"
import StatusCard from '../../otherComponent/home/statusCard';
import { windowHeight } from '../../theme/appConstant';
import CustomerPickup from "../../otherComponent/home/customerPickupCard"
import Title from "../../components/title"
import {VendorContext} from "../../utils/context/vendorContext"

export default function Home({navigation}) {
   const { newPickups } = useContext(VendorContext);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <StatusBar barStyle="dark-content" backgroundColor={appColors.secondary} />
    <View style={styles.headerStyle}>
        <Header navigation={navigation}/>
    </View>
         <View style={styles.container}>
      <StatusCard/>   
      <Title children={"New Customer Pickup"}/>
        <CustomerPickup 
            data={newPickups} 
            showButtons={true}
          />
      </View> 
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: appColors.background },
  headerStyle:{
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
  contentContainerStyle:{
    paddingBottom:80
  }
 
 
})
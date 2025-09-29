import React from 'react';
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
import TitleSubtitle from '../../otherComponent/vendorRegistration/titleSubTitle';
import Title from "../../components/title"

export default function Home() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>

      
      <StatusBar barStyle="dark-content" backgroundColor={appColors.secondary} />
   
    <View style={styles.headerStyle}>
        <Header/>
    </View>
         <View style={styles.container}>
      <StatusCard/>   
      <Title children={"New Customer Pickup"}/>
        <CustomerPickup/>
      </View> 
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: appColors.white },
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
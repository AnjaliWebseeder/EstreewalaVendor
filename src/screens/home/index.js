import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../../theme/appColors';
import Header from "../../otherComponent/home/header"
import StatusCard from '../../otherComponent/home/statusCard';


export default function Home() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={appColors.white} />
      <View style={styles.container}>
        {/* Header row: Location + icons */}
       <Header/>
       <StatusCard/>   
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: appColors.background },
  container: {
    paddingHorizontal: 18,
    paddingTop: 12,
    backgroundColor: appColors.background,
    flex: 1,
  },
 
 
})
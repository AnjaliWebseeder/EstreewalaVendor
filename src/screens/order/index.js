import React, { useContext, useEffect, useState , } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomerPickupList from '../../otherComponent/home/customerPickupCard';
import appColors from '../../theme/appColors';
import { VendorContext } from '../../utils/context/vendorContext';
import { useRoute } from '@react-navigation/native';
import {styles} from "./styles"
import Header from "../../components/header"


export default function Orders({ navigation }) {
  const { newPickups, inProgressOrders } = useContext(VendorContext);
  const [activeTab, setActiveTab] = useState('new');

  const route = useRoute();

useEffect(() => {
  if (route.params?.openTab) {
    setActiveTab(route.params.openTab);
  }
}, [route.params?.openTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'new':
        return <CustomerPickupList data={newPickups} showButtons={true} />;
      case 'inProgress':
        return <CustomerPickupList data={inProgressOrders} showButtons={false} />;
      default:
        return <CustomerPickupList data={newPickups} showButtons={true} />;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={appColors.primary} />
      <Header title={"Orders"} onBack={() => navigation.goBack()}/>
     <ScrollView contentContainerStyle={styles.contentContainerStyle}>
       {/* Custom Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'new' && styles.activeTab
          ]}
          onPress={() => setActiveTab('new')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'new' && styles.activeTabText
          ]}>
            New Pickups
          </Text>
          {newPickups.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{newPickups.length}</Text>
            </View>
          )}
          {activeTab === 'new' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'inProgress' && styles.activeTab
          ]}
          onPress={() => setActiveTab('inProgress')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'inProgress' && styles.activeTabText
          ]}>
            In Progress
          </Text>
          {inProgressOrders.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{inProgressOrders.length}</Text>
            </View>
          )}
          {activeTab === 'inProgress' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
     </ScrollView>
    </SafeAreaView>
  );
}


import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import Header from "../../../components/header";
import appColors from '../../../theme/appColors';
import { windowHeight } from '../../../theme/appConstant';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutUs = ({ navigation }) => {
  return (
   <SafeAreaView style={styles.container}>
     <View style={styles.container}>
         <Header
        title="About Us"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>      
        {/* Introduction Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who We Are</Text>
          <Text style={styles.sectionText}>
            We're a passionate team dedicated to bringing you the best shopping experience. 
            Founded in 2023, we've grown from a small startup to one of the most trusted 
            e-commerce platforms, serving millions of happy customers.
          </Text>
        </View>
        
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10M+</Text>
              <Text style={styles.statLabel}>Happy Customers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500K+</Text>
              <Text style={styles.statLabel}>Products</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>150+</Text>
              <Text style={styles.statLabel}>Brands</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>
        </View>
        
        {/* Values Section */}
        <View style={[styles.section,{marginTop:windowHeight(4)}]}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          
          <View style={styles.valuesGrid}>
            <View style={styles.valueCard}>
              <View style={[styles.valueIcon, {backgroundColor: '#FFE8E8'}]}>
                <Icon name="favorite" size={24} color="#FF6B6B" />
              </View>
              <Text style={styles.valueTitle}>Customer First</Text>
              <Text style={styles.valueText}>
                Your satisfaction is our top priority in every decision we make.
              </Text>
            </View>
            
            <View style={styles.valueCard}>
              <View style={[styles.valueIcon, {backgroundColor: '#E8F5E9'}]}>
                <Icon name="eco" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.valueTitle}>Sustainability</Text>
              <Text style={styles.valueText}>
                Committed to eco-friendly practices and reducing our carbon footprint.
              </Text>
            </View>
            
            <View style={styles.valueCard}>
              <View style={[styles.valueIcon, {backgroundColor: '#E3F2FD'}]}>
                <Icon name="rocket-launch" size={24} color="#2196F3" />
              </View>
              <Text style={styles.valueTitle}>Innovation</Text>
              <Text style={styles.valueText}>
                Constantly evolving to bring you the best shopping technology.
              </Text>
            </View>
            
            <View style={styles.valueCard}>
              <View style={[styles.valueIcon, {backgroundColor: '#FFF8E1'}]}>
                <Icon name="star" size={24} color="#FFC107" />
              </View>
              <Text style={styles.valueTitle}>Quality</Text>
              <Text style={styles.valueText}>
                Curating only the best products from trusted brands.
              </Text>
            </View>
          </View>
        </View>
            
        {/* CTA Section */}
        <View style={styles.ctaContainer}>
          <Icon name="shopping-cart" size={40} color={appColors.white} style={styles.ctaIcon} />
          <Text style={styles.ctaTitle}>Join Our Growing Community</Text>
          <Text style={styles.ctaText}>
            Start shopping today for the best experience with exclusive deals.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
   </SafeAreaView>
  );
};

export default AboutUs;
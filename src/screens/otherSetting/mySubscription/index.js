// MySubscriptions.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMySubscriptions } from '../../../redux/slices/subscriptionSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from "./styles"
import Header from "../../../components/header";

const MySubscriptions = ({navigation}) => {
  const dispatch = useDispatch();
  const { mySubscriptions, loading, error } = useSelector(state => state.subscription);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      await dispatch(getMySubscriptions()).unwrap();
    } catch (error) {
    //   Alert.alert('Error', error || 'Failed to load subscriptions');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSubscriptions();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#00C851';
      case 'expired': return '#FF4444';
      case 'cancelled': return '#FF8800';
      default: return '#666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'checkmark-circle';
      case 'expired': return 'close-circle';
      case 'cancelled': return 'pause-circle';
      default: return 'help-circle';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading && !refreshing && mySubscriptions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Icon name="refresh" size={24} color="#007AFF" />
        <Text style={styles.loadingText}>Loading your subscriptions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
           <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Header */}
       <Header
              title="My Subscription"
              onBack={() => navigation.goBack()}
            />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {error && (
          <View style={styles.errorContainer}>
            <Icon name="warning" size={24} color="#FF4444" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadSubscriptions}>
              <Icon name="refresh" size={16} color="white" />
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {mySubscriptions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon name="card-outline" size={64} color="#CCD0D5" />
            </View>
            <Text style={styles.emptyTitle}>No Active Subscriptions</Text>
            <Text style={styles.emptySubtitle}>
              You don't have any active subscriptions yet
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Icon name="rocket" size={18} color="white" />
              <Text style={styles.exploreButtonText}>Explore Plans</Text>
            </TouchableOpacity>
          </View>
        ) : (
          mySubscriptions.map((subscription, index) => (
            <SubscriptionCard
              key={subscription._id}
              subscription={subscription}
              statusColor={getStatusColor(subscription.status)}
              statusIcon={getStatusIcon(subscription.status)}
              formatDate={formatDate}
              calculateDaysLeft={calculateDaysLeft}
              isFirst={index === 0}
            />
          ))
        )}

      </ScrollView>
    </View>
  );
};

const SubscriptionCard = ({ 
  subscription, 
  statusColor, 
  statusIcon, 
  formatDate, 
  calculateDaysLeft,
  isFirst 
}) => {
  const daysLeft = calculateDaysLeft(subscription.endDate);

  return (
    <View style={[styles.card, isFirst && styles.firstCard]}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.vendorInfo}>
          <View style={styles.vendorTextContainer}>
            <Text style={styles.vendorName}>
              {subscription.vendorId.businessName}
            </Text>
            <View style={styles.statusRow}>
              <Icon name={statusIcon} size={16} color={statusColor} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{subscription.proratedPrice}</Text>
          <Text style={styles.duration}>/{subscription.duration}</Text>
        </View>
      </View>

      {/* Services */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionLabel}>Services Included</Text>
        <View style={styles.servicesContainer}>
          {subscription.services.map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Icon name="checkmark" size={14} color="#00C851" />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineLabel}>Start Date</Text>
            <Text style={styles.timelineValue}>
              {formatDate(subscription.startDate)}
            </Text>
          </View>
        </View>
        <View style={styles.timelineDivider} />
        <View style={styles.timelineItem}>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineLabel}>End Date</Text>
            <Text style={styles.timelineValue}>
              {formatDate(subscription.endDate)}
            </Text>
          </View>
        </View>
        <View style={styles.timelineDivider} />
        <View style={styles.timelineItem}>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineLabel}>Days Left</Text>
            <View style={styles.daysLeftContainer}>
              <Text style={[styles.timelineValue, daysLeft < 7 && styles.warningText]}>
                {daysLeft} days
              </Text>
              {daysLeft < 7 && <Icon name="warning" size={14} color="#FF4444" style={styles.warningIcon} />}
            </View>
          </View>
        </View>
      </View>

    </View>
  );
};

export default MySubscriptions;
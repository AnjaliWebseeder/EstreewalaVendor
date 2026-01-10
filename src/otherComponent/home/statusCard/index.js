import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'; // For smooth gradient overlay
import { styles } from './styles';
import axiosInstance from '../../../api/axiosConfig';
import { DASHBOARD_DATA } from '../../../api/index';

export default function StatusCard() {
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    pending: 0,
    accepted: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(DASHBOARD_DATA);

        if (data.success && data.analytics) {
          setAnalytics(data.analytics);
        } else {
          setAnalytics({ totalOrders: 0, pending: 0, accepted: 0, completed: 0 });
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setAnalytics({ totalOrders: 0, pending: 0, accepted: 0, completed: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const StatCard = ({ colors, iconName, statusText, title, count }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientOverlay}
      />
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={iconName} size={22} color="#fff" />
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${colors[0]}30` }]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>

        <Text style={styles.cardTitle}>{title}</Text>

        <View style={styles.countSection}>
          <Text style={styles.countText}>{count}</Text>
          <View style={styles.arrowCircle}>
            <MaterialCommunityIcons name="arrow-right" size={16} color="#fff" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading)
    return <ActivityIndicator size="large" color="#4f8af2" style={{ marginTop: 20 }} />;

  return (
    <View style={styles.grid}>
      <StatCard
        colors={['#4f8af2', '#a0c4ff']}
        iconName="format-list-bulleted"
        statusText="Total"
        title="Total Orders"
        count={analytics.totalOrders}
      />
      <StatCard
        colors={['#ff7f7f', '#ffc1c1']}
        iconName="calendar-clock"
        statusText="Pending"
        title="Pending Orders"
        count={analytics.pending}
      />
      <StatCard
        colors={['#ffa500', '#ffde7d']}
        iconName="truck-delivery"
        statusText="Accepted"
        title="Accepted Orders"
        count={analytics.accepted}
      />
      <StatCard
        colors={['#8b3df3', '#cda4ff']}
        iconName="truck-check"
        statusText="Completed"
        title="Completed Orders"
        count={analytics.completed}
      />
    </View>
  );
}

import { View, Text, FlatList, StatusBar, ActivityIndicator, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../../components/header";
import appColors from "../../../theme/appColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationRead } from "../../../redux/slices/notificationSlice";

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();

  const vendorNotification =
    useSelector(state => state?.vendorNotification) || {};

  const {
    notifications = [],
    loading = false,
    unreadCount = 0,
  } = vendorNotification;


  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  const handlePress = (item) => {
    if (!item.read) {
      dispatch(markNotificationRead(item.id));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handlePress(item)}
      style={[
        styles.card,
        !item.read && styles.unreadCard,
      ]}
    >
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: item.read ? "#BDBDBD" : "#4F8AF2" },
        ]}
      >
        <Icon
          name={item.icon || "notifications"}
          size={20}
          color={appColors.white}
        />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            !item.read && styles.unreadTitle,
          ]}
          numberOfLines={2}
        >
          {item.title || item.message}
        </Text>

        <Text style={styles.time}>
          {item.time || new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Header
        title={`Notifications ${unreadCount ? `(${unreadCount})` : ""}`}
        onBack={() => navigation.goBack()}
      />

      {loading ? (
        <ActivityIndicator size="large" color={appColors.primary} style={{ marginTop: 40 }} />
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="notifications-off-outline" size={60} color="#999" />
          <Text style={styles.emptyText}>No notifications found</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Notification;

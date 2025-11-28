import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Animated,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import { styles } from './styles';
import { mockData } from '../../../utils/data';
import { VendorContext } from '../../../utils/context/vendorContext';
import Icon from 'react-native-vector-icons/Ionicons';
import appColors from '../../../theme/appColors';
import FilterIcon from '../../../assets/Icons/filter';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SetPrice({
  onOpenFilter,
  selectedFilter,
  onPricingUpdate,
}) {
  const [editingItemId, setEditingItemId] = useState(null);
  const [priceInput, setPriceInput] = useState('');
  const [activeServiceId, setActiveServiceId] = useState(null);
  const {
    services,
    selectedServiceIds,
    priceMap,
    setItemPrice,
    getAllPricingData,
    getItemPrice, // Add this new function
  } = useContext(VendorContext);

  // Animation
  const [fadeAnim] = useState(new Animated.Value(0));

  // Initialize active service
  useEffect(() => {
    if (selectedServiceIds.length > 0) {
      setActiveServiceId(selectedServiceIds[0]);
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Notify parent when pricing changes
  useEffect(() => {
    if (onPricingUpdate && activeServiceId) {
      const pricingData = getAllPricingData();
      onPricingUpdate(pricingData);
    }
  }, [priceMap, activeServiceId]);

  const filters = [
    { key: 'all', label: 'All Items', icon: 'grid-outline' },
    { key: 'mens', label: "Men's Wear", icon: 'man-outline' },
    { key: 'womens', label: "Women's Wear", icon: 'woman-outline' },
    { key: 'kids', label: 'Kids Wear', icon: 'heart-outline' },
  ];

  const getAllItems = () => {
    let allItems = [];
    Object.keys(mockData).forEach(category => {
      const categoryItems = mockData[category].map(item => ({
        ...item,
        category: category === 'mens' ? 'man' : category === 'womens' ? 'woman' : 'kids',
      }));
      allItems = [...allItems, ...categoryItems];
    });
    return allItems;
  };

  const getFilteredItems = () => {
    if (selectedFilter === 'all') return getAllItems();

    const filterMap = {
      mens: 'mens',
      womens: 'womens',
      kids: 'kids',
    };

    const dataKey = filterMap[selectedFilter];
    if (mockData[dataKey]) {
      return mockData[dataKey].map(item => ({
        ...item,
        category: selectedFilter === 'mens' ? 'man' : selectedFilter === 'womens' ? 'woman' : 'kids',
      }));
    }
    return [];
  };

  const startEditing = (item) => {
    Keyboard.dismiss();
    setEditingItemId(item.id);
    // Get service-specific price
    const currentPrice = getItemPrice(activeServiceId, item.id, item.price);
    setPriceInput(currentPrice.toString());
  };

  const savePrice = () => {
    if (editingItemId && priceInput && activeServiceId) {
      const priceValue = parseFloat(priceInput);
      if (!isNaN(priceValue) && priceValue >= 0) {
        // Save service-specific price
        setItemPrice(activeServiceId, editingItemId, priceValue);
        setEditingItemId(null);
        setPriceInput('');
      } else {
        Alert.alert('❌ Invalid Price', 'Please enter a valid price');
      }
    }
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    setPriceInput('');
  };

  const PriceCard = useCallback(
    ({ item }) => {
      // Get service-specific price
      const price = getItemPrice(activeServiceId, item.id, item.price);
      const isEditing = editingItemId === item.id;
      const isCustomPrice = getItemPrice(activeServiceId, item.id) !== undefined;

      return (
        <Animated.View
          style={[
            styles.priceCard,
            { opacity: fadeAnim, transform: [{ scale: fadeAnim }] },
          ]}
        >
          <View style={styles.itemHeader}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.itemCategory}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </Text>
                <Text style={styles.basePrice}>Base: ₹{item.price}</Text>
              </View>
            </View>

            {!isEditing ? (
              <View style={styles.priceActions}>
                <Text
                  style={[
                    styles.currentPrice,
                    isCustomPrice && styles.customPrice,
                  ]}
                >
                  ₹{price}
                  {isCustomPrice && (
                    <Text style={styles.priceChangeIndicator}> *</Text>
                  )}
                </Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => startEditing(item)}
                  >
                    <Icon
                      name="pencil-outline"
                      size={14}
                      color={appColors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.editingContainer}>
                <TextInput
                  style={styles.priceInput}
                  value={priceInput}
                  onChangeText={setPriceInput}
                  keyboardType="numeric"
                  placeholder="Enter price"
                  autoFocus
                />
                <View style={styles.editActions}>
                  <TouchableOpacity
                    style={styles.saveEditButton}
                    onPress={savePrice}
                  >
                    <Icon
                      name="checkmark"
                      size={16}
                      color={appColors.secondary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelEditButton}
                    onPress={cancelEditing}
                  >
                    <Icon name="close" size={16} color={appColors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Animated.View>
      );
    },
    [editingItemId, priceInput, priceMap, fadeAnim, activeServiceId, getItemPrice],
  );

  const filteredItems = getFilteredItems();

  const renderPriceCard = useCallback(
    ({ item }) => <PriceCard item={item} />,
    [PriceCard],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Service Tabs */}
          <View style={styles.serviceTabsContainer}>
            <FlatList
              data={services.filter(s => selectedServiceIds.includes(s.id))}
              horizontal
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 14 }}
              renderItem={({ item: service }) => (
                <TouchableOpacity
                  onPress={() => setActiveServiceId(service.id)}
                  style={[
                    styles.serviceTab,
                    activeServiceId === service.id && styles.serviceTabActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.serviceTabText,
                      activeServiceId === service.id && styles.serviceTabTextActive,
                    ]}
                  >
                    {service.name}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.noServicesText}>No services selected</Text>
              }
            />
          </View>

          {/* Current Service Info */}
          {activeServiceId && (
            <View style={styles.currentServiceInfo}>
              <Text style={styles.currentServiceText}>
                Setting prices for: <Text style={styles.serviceName}>
                  {services.find(s => s.id === activeServiceId)?.name}
                </Text>
              </Text>
            </View>
          )}

          {/* Filter Header */}
          <View style={styles.containerStyle}>
            <Text style={styles.summaryValue}>
              {filters.find(f => f.key === selectedFilter)?.label}
            </Text>
            <TouchableOpacity onPress={onOpenFilter} style={styles.filter}>
              <FilterIcon />
            </TouchableOpacity>
          </View>

          {/* Price List */}
          <FlatList
            data={filteredItems}
            keyExtractor={item => item.id}
            renderItem={renderPriceCard}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Icon
                  name="pricetags-outline"
                  size={64}
                  color={appColors.lightGray}
                />
                <Text style={styles.emptyText}>
                  No items found for this filter
                </Text>
                <Text style={styles.emptySubtext}>
                  Try selecting a different category
                </Text>
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
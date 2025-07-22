import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  Animated,
} from 'react-native';
import { ArrowLeft, Search, Plus, Heart, Check } from 'lucide-react-native';
import { router } from 'expo-router';

interface GroceryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  unit?: string;
  isFavorite?: boolean;
  isRecent?: boolean;
}

const allGroceryItems: GroceryItem[] = [
  // Fruits
  {
    id: '1',
    name: 'Organic Bananas',
    price: 2.99,
    image: 'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fruits',
    brand: 'Organic Valley',
    unit: 'per bunch',
    isFavorite: true,
    isRecent: true,
  },
  {
    id: '2',
    name: 'Fresh Strawberries',
    price: 4.99,
    image: 'https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fruits',
    brand: 'Driscoll\'s',
    unit: '1 lb container',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Avocados',
    price: 5.99,
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fruits',
    brand: 'Hass',
    unit: 'bag of 4',
    isRecent: true,
  },
  {
    id: '4',
    name: 'Red Apples',
    price: 3.49,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fruits',
    brand: 'Gala',
    unit: '3 lb bag',
  },
  {
    id: '5',
    name: 'Fresh Oranges',
    price: 4.29,
    image: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fruits',
    brand: 'Navel',
    unit: '4 lb bag',
    isFavorite: true,
  },
  
  // Dairy
  {
    id: '6',
    name: 'Whole Milk',
    price: 4.49,
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dairy',
    brand: 'Organic Valley',
    unit: '1 gallon',
    isRecent: true,
  },
  {
    id: '7',
    name: 'Greek Yogurt',
    price: 5.99,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dairy',
    brand: 'Chobani',
    unit: '32 oz container',
    isFavorite: true,
  },
  {
    id: '8',
    name: 'Sharp Cheddar Cheese',
    price: 6.99,
    image: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dairy',
    brand: 'Tillamook',
    unit: '8 oz block',
  },
  {
    id: '9',
    name: 'Organic Eggs',
    price: 4.99,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dairy',
    brand: 'Vital Farms',
    unit: 'dozen',
    isRecent: true,
  },
  
  // Bakery
  {
    id: '10',
    name: 'Artisan Sourdough Bread',
    price: 3.99,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bakery',
    brand: 'Local Bakery',
    unit: '1 loaf',
    isFavorite: true,
  },
  {
    id: '11',
    name: 'Croissants',
    price: 5.49,
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bakery',
    brand: 'French Bakery',
    unit: 'pack of 6',
  },
  {
    id: '12',
    name: 'Bagels',
    price: 4.29,
    image: 'https://images.pexels.com/photos/2434549/pexels-photo-2434549.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bakery',
    brand: 'Everything',
    unit: 'pack of 6',
    isRecent: true,
  },
  
  // Vegetables
  {
    id: '13',
    name: 'Organic Spinach',
    price: 3.99,
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vegetables',
    brand: 'Organic',
    unit: '5 oz container',
    isFavorite: true,
  },
  {
    id: '14',
    name: 'Bell Peppers',
    price: 4.99,
    image: 'https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vegetables',
    brand: 'Mixed Colors',
    unit: '3 pack',
  },
  {
    id: '15',
    name: 'Broccoli Crowns',
    price: 2.99,
    image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vegetables',
    brand: 'Fresh',
    unit: '1 lb',
    isRecent: true,
  },
  {
    id: '16',
    name: 'Cherry Tomatoes',
    price: 3.49,
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vegetables',
    brand: 'Organic',
    unit: '1 pint container',
    isFavorite: true,
  },
  
  // Meat & Seafood
  {
    id: '17',
    name: 'Organic Chicken Breast',
    price: 12.99,
    image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Meat & Seafood',
    brand: 'Free Range',
    unit: '2 lb package',
  },
  {
    id: '18',
    name: 'Atlantic Salmon',
    price: 15.99,
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Meat & Seafood',
    brand: 'Wild Caught',
    unit: '1 lb fillet',
    isFavorite: true,
  },
  
  // Pantry
  {
    id: '19',
    name: 'Olive Oil',
    price: 8.99,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pantry',
    brand: 'Extra Virgin',
    unit: '500ml bottle',
    isRecent: true,
  },
  {
    id: '20',
    name: 'Pasta',
    price: 2.49,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pantry',
    brand: 'Barilla',
    unit: '1 lb box',
  },
];

const tabs = ['All', 'Recent', 'Favorite'];

export default function AddItemScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckAnimation, setShowCheckAnimation] = useState(false);
  const [animationScale] = useState(new Animated.Value(0));
  const [animationOpacity] = useState(new Animated.Value(0));

  const getFilteredItems = () => {
    let filteredItems = allGroceryItems;

    // Filter by tab
    if (activeTab === 'Recent') {
      filteredItems = filteredItems.filter(item => item.isRecent);
    } else if (activeTab === 'Favorite') {
      filteredItems = filteredItems.filter(item => item.isFavorite);
    }

    // Filter by search query
    if (searchQuery) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredItems;
  };

  const toggleFavorite = (itemId: string) => {
    // In a real app, this would update the backend
    const itemIndex = allGroceryItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      allGroceryItems[itemIndex].isFavorite = !allGroceryItems[itemIndex].isFavorite;
    }
  };

  const addToCart = (item: GroceryItem) => {
    // Show the checkbox animation
    setShowCheckAnimation(true);
    
    // Reset animation values
    animationScale.setValue(0);
    animationOpacity.setValue(0);
    
    // Start the animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.spring(animationScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(animationOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(800),
      Animated.timing(animationOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowCheckAnimation(false);
    });
    
    // Add item to cart via global function
    if ((global as any).addItemToCart) {
      (global as any).addItemToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      });
    }
  };

  const renderItem = ({ item }: { item: GroceryItem }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemUnit}>{item.unit}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart
            size={20}
            color={item.isFavorite ? '#EF4444' : '#9CA3AF'}
            fill={item.isFavorite ? '#EF4444' : 'transparent'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(item)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Items</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Items List */}
      <FlatList
        data={getFilteredItems()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.itemsList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
      
      {/* Checkbox Animation Overlay */}
      {showCheckAnimation && (
        <View style={styles.animationOverlay}>
          <Animated.View
            style={[
              styles.checkboxContainer,
              {
                transform: [{ scale: animationScale }],
                opacity: animationOpacity,
              },
            ]}
          >
            <View style={styles.checkboxCircle}>
              <Check size={60} color="#FFFFFF" strokeWidth={4} />
            </View>
            <Text style={styles.addedText}>Added to Cart!</Text>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#22C55E',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  itemsList: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemDetails: {
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  itemBrand: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  itemUnit: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: '#22C55E',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  checkboxContainer: {
    alignItems: 'center',
  },
  checkboxCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  addedText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
});
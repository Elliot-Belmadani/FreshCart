import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Animated,
} from 'react-native';
import { Plus, Minus, Check, Package, Clock, CircleCheck as CheckCircle, Truck } from 'lucide-react-native';
import { router } from 'expo-router';

interface GroceryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

export default function OrderScreen() {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [showCheckoutAnimation, setShowCheckoutAnimation] = useState(false);
  const [showDeliveryWidget, setShowDeliveryWidget] = useState(false);
  const [animationScale] = useState(new Animated.Value(0));
  const [animationOpacity] = useState(new Animated.Value(0));

  const updateQuantity = (id: string, change: number) => {
    setGroceryItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const addItemToCart = (newItem: Omit<GroceryItem, 'quantity'>) => {
    setGroceryItems(items => {
      const existingItem = items.find(item => item.id === newItem.id);
      if (existingItem) {
        return items.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...items, { ...newItem, quantity: 1 }];
      }
    });
  };

  const addNewItem = () => {
    router.push({
      pathname: '/add-item',
      params: { onAddItem: 'addItemToCart' }
    });
  };

  const getTotalPrice = () => {
    return groceryItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return groceryItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (groceryItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checkout.');
      return;
    }
    
    // Show checkout animation
    setShowCheckoutAnimation(true);
    
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
      Animated.delay(1000),
      Animated.timing(animationOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowCheckoutAnimation(false);
      setShowDeliveryWidget(true);
    });
  };

  // Make addItemToCart available globally for the add-item screen
  React.useEffect(() => {
    (global as any).addItemToCart = addItemToCart;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Order</Text>
        <TouchableOpacity style={styles.addButton} onPress={addNewItem}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Grocery List */}
      {showDeliveryWidget && (
        <View style={styles.deliveryWidget}>
          <View style={styles.deliveryRoute}>
            <View style={styles.locationPoint}>
              <Text style={styles.locationIcon}>🏪</Text>
              <Text style={styles.locationLabel}>Store</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.driverPoint}>
              <Text style={styles.driverIcon}>🚗</Text>
              <Text style={styles.driverLabel}>John</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.locationPoint}>
              <Text style={styles.locationIcon}>🏠</Text>
              <Text style={styles.locationLabel}>Home</Text>
            </View>
          </View>
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryTime}>Est. 30-45 min</Text>
            <Text style={styles.deliveryPrice}>${getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>
      )}

      <ScrollView style={styles.groceryList} showsVerticalScrollIndicator={false} contentContainerStyle={styles.groceryListContent}>
        {groceryItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtitle}>Add items to get started</Text>
          </View>
        ) : (
          groceryItems.map((item) => (
            <View key={item.id} style={styles.groceryItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, -1)}
                >
                  <Minus size={18} color="#6B7280" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, 1)}
                >
                  <Plus size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      
      {/* Checkout Animation Overlay */}
      {showCheckoutAnimation && (
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
            <Text style={styles.addedText}>Order Placed!</Text>
          </Animated.View>
        </View>
      )}

      {/* Checkout Button */}
      {groceryItems.length > 0 && (
        !showDeliveryWidget && (
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>
            Proceed to Checkout ({getTotalItems()} items) • ${getTotalPrice().toFixed(2)}
          </Text>
        </TouchableOpacity>
        )
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
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#22C55E',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groceryList: {
    flex: 1,
  },
  groceryListContent: {
    padding: 20,
    flexGrow: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  groceryItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  itemCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginHorizontal: 12,
  },
  checkoutButton: {
    backgroundColor: '#22C55E',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    padding: 18,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  deliveryWidget: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  deliveryRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  locationPoint: {
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  driverPoint: {
    alignItems: 'center',
  },
  driverIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  driverLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C55E',
  },
  routeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#22C55E',
    marginHorizontal: 8,
    marginTop: 12,
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  deliveryPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
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
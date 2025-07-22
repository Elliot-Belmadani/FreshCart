import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { ShoppingCart, Truck } from 'lucide-react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const handleBuyerPress = () => {
    router.replace('/(tabs)');
  };

  const handleDelivererPress = () => {
    router.replace('/(deliverer-tabs)');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🛒</Text>
          </View>
          <Text style={styles.appName}>FreshCart</Text>
          <Text style={styles.tagline}>Fresh groceries delivered to your door</Text>
        </View>

        {/* Role Selection */}
        <View style={styles.roleContainer}>
          <Text style={styles.roleTitle}>How would you like to use FreshCart?</Text>
          
          {/* Buyer Option */}
          <TouchableOpacity style={styles.roleCard} onPress={handleBuyerPress}>
            <View style={styles.roleIconContainer}>
              <ShoppingCart size={40} color="#22C55E" />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleCardTitle}>I want to shop</Text>
              <Text style={styles.roleCardDescription}>
                Browse and order fresh groceries for delivery
              </Text>
            </View>
            <View style={styles.roleArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>

          {/* Deliverer Option */}
          <TouchableOpacity style={styles.roleCard} onPress={handleDelivererPress}>
            <View style={styles.roleIconContainer}>
              <Truck size={40} color="#3B82F6" />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleCardTitle}>I want to deliver</Text>
              <Text style={styles.roleCardDescription}>
                Earn money by delivering groceries to customers
              </Text>
            </View>
            <View style={styles.roleArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoIcon: {
    fontSize: 50,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 32,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  roleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  roleCardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  roleArrow: {
    marginLeft: 12,
  },
  arrowText: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  footer: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18
  },
});
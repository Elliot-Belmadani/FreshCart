import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { MapPin, Phone, MessageCircle, Navigation, Clock, DollarSign } from 'lucide-react-native';

export default function CurrentDeliveryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Current Delivery</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Active Delivery Card */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryHeader}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderNumber}>Order #12345</Text>
              <Text style={styles.customerName}>Sarah Johnson</Text>
            </View>
            <View style={styles.earningsContainer}>
              <DollarSign size={16} color="#22C55E" />
              <Text style={styles.earnings}>$8.50</Text>
            </View>
          </View>

          {/* Delivery Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressStep}>
              <View style={[styles.progressDot, styles.progressDotCompleted]} />
              <Text style={styles.progressLabel}>Picked Up</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <View style={[styles.progressDot, styles.progressDotActive]} />
              <Text style={styles.progressLabel}>En Route</Text>
            </View>
            <View style={styles.progressLine} />
            <View style={styles.progressStep}>
              <View style={styles.progressDot} />
              <Text style={styles.progressLabel}>Delivered</Text>
            </View>
          </View>

          {/* Customer Address */}
          <View style={styles.addressContainer}>
            <MapPin size={20} color="#6B7280" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Delivery Address</Text>
              <Text style={styles.address}>123 Oak Street, Apt 4B</Text>
              <Text style={styles.address}>San Francisco, CA 94102</Text>
            </View>
          </View>

          {/* Delivery Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Delivery Instructions</Text>
            <Text style={styles.instructions}>
              Please leave at the front door. Ring doorbell twice. Thank you!
            </Text>
          </View>

          {/* Order Items */}
          <View style={styles.itemsContainer}>
            <Text style={styles.itemsTitle}>Order Items (5 items)</Text>
            <View style={styles.itemsList}>
              <View style={styles.orderItem}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                  style={styles.itemImage}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>Organic Bananas</Text>
                  <Text style={styles.itemQuantity}>2x $2.99</Text>
                </View>
              </View>
              <View style={styles.orderItem}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                  style={styles.itemImage}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>Whole Milk</Text>
                  <Text style={styles.itemQuantity}>1x $4.49</Text>
                </View>
              </View>
              <Text style={styles.moreItems}>+ 3 more items</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.navigationButton}>
            <Navigation size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Navigate</Text>
          </TouchableOpacity>
          
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Phone size={20} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <MessageCircle size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Timer */}
        <View style={styles.timerCard}>
          <Clock size={24} color="#F59E0B" />
          <View style={styles.timerInfo}>
            <Text style={styles.timerTitle}>Estimated Delivery</Text>
            <Text style={styles.timerTime}>15 minutes remaining</Text>
          </View>
        </View>

        {/* Complete Delivery Button */}
        <TouchableOpacity style={styles.completeButton}>
          <Text style={styles.completeButtonText}>Mark as Delivered</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
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
  content: {
    flex: 1,
    padding: 20,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  earningsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  earnings: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  progressDotCompleted: {
    backgroundColor: '#22C55E',
  },
  progressDotActive: {
    backgroundColor: '#3B82F6',
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addressInfo: {
    marginLeft: 12,
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  itemsContainer: {
    marginBottom: 20,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  itemsList: {
    gap: 8,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#6B7280',
  },
  moreItems: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navigationButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    backgroundColor: '#FFFFFF',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timerCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  timerInfo: {
    marginLeft: 12,
  },
  timerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 2,
  },
  timerTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F59E0B',
  },
  completeButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Package, Clock, CircleCheck as CheckCircle, Truck } from 'lucide-react-native';

const deliverySteps = [
  {
    id: 1,
    title: 'Order Confirmed',
    description: 'Your order has been received and confirmed',
    time: '2:30 PM',
    completed: true,
  },
  {
    id: 2,
    title: 'Shopping Started',
    description: 'Personal shopper is selecting your items',
    time: '2:45 PM',
    completed: true,
  },
  {
    id: 3,
    title: 'On the Way',
    description: 'Your order is being delivered',
    time: '3:15 PM',
    completed: false,
    current: true,
  },
  {
    id: 4,
    title: 'Delivered',
    description: 'Order delivered to your doorstep',
    time: 'Est. 4:00 PM',
    completed: false,
  },
];

export default function DeliverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Delivery Status</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Truck size={32} color="#22C55E" />
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>Order #12345</Text>
              <Text style={styles.statusSubtitle}>Expected delivery: 30-45 min</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '60%' }]} />
          </View>
        </View>

        {/* Delivery Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>Delivery Timeline</Text>
          {deliverySteps.map((step, index) => (
            <View key={step.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineIcon,
                    step.completed && styles.timelineIconCompleted,
                    step.current && styles.timelineIconCurrent,
                  ]}
                >
                  {step.completed ? (
                    <CheckCircle size={20} color="#FFFFFF" />
                  ) : step.current ? (
                    <Clock size={20} color="#FFFFFF" />
                  ) : (
                    <Package size={20} color="#9CA3AF" />
                  )}
                </View>
                {index < deliverySteps.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      step.completed && styles.timelineLineCompleted,
                    ]}
                  />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.timelineStepTitle,
                    (step.completed || step.current) && styles.timelineStepTitleActive,
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={styles.timelineStepDescription}>
                  {step.description}
                </Text>
                <Text style={styles.timelineStepTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Driver Info */}
        <View style={styles.driverCard}>
          <Text style={styles.driverTitle}>Your Delivery Driver</Text>
          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitials}>JD</Text>
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>John Doe</Text>
              <Text style={styles.driverRating}>⭐ 4.9 • 1,234 deliveries</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Driver</Text>
          </TouchableOpacity>
        </View>
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
  statusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusInfo: {
    marginLeft: 12,
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progress: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
  timelineContainer: {
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
  timelineTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineIconCompleted: {
    backgroundColor: '#22C55E',
  },
  timelineIconCurrent: {
    backgroundColor: '#3B82F6',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  timelineLineCompleted: {
    backgroundColor: '#22C55E',
  },
  timelineContent: {
    flex: 1,
    paddingTop: 8,
  },
  timelineStepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  timelineStepTitleActive: {
    color: '#111827',
  },
  timelineStepDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  timelineStepTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  driverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  driverTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverInitials: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  driverRating: {
    fontSize: 14,
    color: '#6B7280',
  },
  contactButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 12,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
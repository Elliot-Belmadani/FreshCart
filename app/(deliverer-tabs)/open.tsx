import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { MapPin, Clock, DollarSign, Package } from 'lucide-react-native';

interface DeliveryJob {
  id: string;
  orderNumber: string;
  customerName: string;
  address: string;
  distance: string;
  estimatedTime: string;
  earnings: number;
  items: number;
  pickupLocation: string;
  customerImage?: string;
}

const availableJobs: DeliveryJob[] = [
  {
    id: '1',
    orderNumber: '#12346',
    customerName: 'Michael Chen',
    address: '456 Pine Street, San Francisco, CA',
    distance: '1.2 miles',
    estimatedTime: '25 min',
    earnings: 12.75,
    items: 8,
    pickupLocation: 'Whole Foods Market',
  },
  {
    id: '2',
    orderNumber: '#12347',
    customerName: 'Emma Rodriguez',
    address: '789 Market Street, San Francisco, CA',
    distance: '0.8 miles',
    estimatedTime: '18 min',
    earnings: 9.50,
    items: 5,
    pickupLocation: 'Safeway',
  },
  {
    id: '3',
    orderNumber: '#12348',
    customerName: 'David Kim',
    address: '321 Valencia Street, San Francisco, CA',
    distance: '2.1 miles',
    estimatedTime: '35 min',
    earnings: 15.25,
    items: 12,
    pickupLocation: 'Target',
  },
  {
    id: '4',
    orderNumber: '#12349',
    customerName: 'Lisa Thompson',
    address: '654 Mission Street, San Francisco, CA',
    distance: '1.5 miles',
    estimatedTime: '28 min',
    earnings: 11.00,
    items: 7,
    pickupLocation: 'Trader Joe\'s',
  },
  {
    id: '5',
    orderNumber: '#12350',
    customerName: 'James Wilson',
    address: '987 Castro Street, San Francisco, CA',
    distance: '3.2 miles',
    estimatedTime: '45 min',
    earnings: 18.50,
    items: 15,
    pickupLocation: 'Whole Foods Market',
  },
];

export default function OpenDeliveriesScreen() {
  const [acceptedJobs, setAcceptedJobs] = useState<string[]>([]);

  const acceptJob = (jobId: string) => {
    setAcceptedJobs(prev => [...prev, jobId]);
    // In a real app, this would make an API call
  };

  const renderJobCard = (job: DeliveryJob) => {
    const isAccepted = acceptedJobs.includes(job.id);
    
    return (
      <View key={job.id} style={[styles.jobCard, isAccepted && styles.acceptedJobCard]}>
        <View style={styles.jobHeader}>
          <View style={styles.jobInfo}>
            <Text style={styles.orderNumber}>{job.orderNumber}</Text>
            <Text style={styles.customerName}>{job.customerName}</Text>
          </View>
          <View style={styles.earningsContainer}>
            <DollarSign size={16} color="#22C55E" />
            <Text style={styles.earnings}>${job.earnings.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <View style={styles.locationDot} />
            <Text style={styles.pickupLocation}>{job.pickupLocation}</Text>
          </View>
          <View style={styles.locationLine} />
          <View style={styles.locationRow}>
            <MapPin size={16} color="#EF4444" />
            <Text style={styles.deliveryAddress}>{job.address}</Text>
          </View>
        </View>

        <View style={styles.jobDetails}>
          <View style={styles.detailItem}>
            <Package size={16} color="#6B7280" />
            <Text style={styles.detailText}>{job.items} items</Text>
          </View>
          <View style={styles.detailItem}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.detailText}>{job.distance}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.detailText}>{job.estimatedTime}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.acceptButton, isAccepted && styles.acceptedButton]}
          onPress={() => acceptJob(job.id)}
          disabled={isAccepted}
        >
          <Text style={[styles.acceptButtonText, isAccepted && styles.acceptedButtonText]}>
            {isAccepted ? 'Accepted' : 'Accept Delivery'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Open Deliveries</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{availableJobs.length} available</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Earnings Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Potential Earnings</Text>
          <Text style={styles.summaryAmount}>
            ${availableJobs.reduce((total, job) => total + job.earnings, 0).toFixed(2)}
          </Text>
          <Text style={styles.summarySubtext}>
            From {availableJobs.length} available deliveries
          </Text>
        </View>

        {/* Job Listings */}
        <View style={styles.jobsList}>
          {availableJobs.map(renderJobCard)}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Delivery Tips</Text>
          <Text style={styles.tipsText}>
            • Accept deliveries close to your location for better efficiency
          </Text>
          <Text style={styles.tipsText}>
            • Higher item counts usually mean better tips
          </Text>
          <Text style={styles.tipsText}>
            • Peak hours (11am-2pm, 5pm-8pm) have more opportunities
          </Text>
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
  statsContainer: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#22C55E',
    marginBottom: 4,
  },
  summarySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  jobsList: {
    marginBottom: 20,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  acceptedJobCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  jobInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 18,
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
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 12,
  },
  locationLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 4,
    marginBottom: 8,
  },
  pickupLocation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  acceptButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 12,
  },
  acceptedButton: {
    backgroundColor: '#22C55E',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  acceptedButtonText: {
    color: '#FFFFFF',
  },
  tipsCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    marginBottom: 4,
  },
});
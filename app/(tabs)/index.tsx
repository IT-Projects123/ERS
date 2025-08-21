import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { TriangleAlert as AlertTriangle, Users, TrendingUp, Clock, Shield, Plus, FileText } from 'lucide-react-native';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const { user } = useAuth();

  const AdminDashboard = () => (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Admin Dashboard</Text>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.redCard]}>
          <AlertTriangle size={24} color="#FFFFFF" />
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>
        <View style={[styles.statCard, styles.blueCard]}>
          <Users size={24} color="#FFFFFF" />
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        <View style={[styles.statCard, styles.greenCard]}>
          <Shield size={24} color="#FFFFFF" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Responders</Text>
        </View>
        <View style={[styles.statCard, styles.orangeCard]}>
          <Clock size={24} color="#FFFFFF" />
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(tabs)/users')}
        >
          <Users size={20} color="#DC2626" />
          <Text style={styles.actionText}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(tabs)/all-reports')}
        >
          <FileText size={20} color="#DC2626" />
          <Text style={styles.actionText}>View All Reports</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const ResponderDashboard = () => (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Responder Dashboard</Text>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.blueCard]}>
          <AlertTriangle size={24} color="#FFFFFF" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Active Cases</Text>
        </View>
        <View style={[styles.statCard, styles.greenCard]}>
          <TrendingUp size={24} color="#FFFFFF" />
          <Text style={styles.statNumber}>38</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
        <View style={[styles.statCard, styles.orangeCard]}>
          <Clock size={24} color="#FFFFFF" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(tabs)/incidents')}
        >
          <AlertTriangle size={20} color="#2563EB" />
          <Text style={styles.actionText}>View Incidents</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const UserDashboard = () => (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Welcome to ERS</Text>
      <Text style={styles.subtitle}>Emergency Response System</Text>
      
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.emergencyButton]}
          onPress={() => router.push('/(tabs)/report')}
        >
          <AlertTriangle size={24} color="#FFFFFF" />
          <Text style={[styles.actionText, styles.emergencyText]}>Report Emergency</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(tabs)/my-reports')}
        >
          <Clock size={20} color="#DC2626" />
          <Text style={styles.actionText}>My Reports</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Emergency Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            • Stay calm and assess the situation
          </Text>
          <Text style={styles.tipText}>
            • Provide accurate location information
          </Text>
          <Text style={styles.tipText}>
            • Follow responder instructions
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Shield size={32} color="#DC2626" />
        <Text style={styles.welcomeText}>Welcome, {user?.name || 'User'}</Text>
      </View>
      
      {user?.role === 'admin' && <AdminDashboard />}
      {user?.role === 'responder' && <ResponderDashboard />}
      {user?.role === 'user' && <UserDashboard />}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  redCard: {
    backgroundColor: '#DC2626',
  },
  blueCard: {
    backgroundColor: '#2563EB',
  },
  greenCard: {
    backgroundColor: '#059669',
  },
  orangeCard: {
    backgroundColor: '#D97706',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 12,
  },
  emergencyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 24,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
});
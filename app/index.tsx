import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Shield, TriangleAlert as AlertTriangle, Users, Phone } from 'lucide-react-native';

export default function HomeScreen() {
  const handleAnonymousReport = () => {
    Alert.alert(
      'Anonymous Report',
      'You are about to report an emergency anonymously. Emergency responders will be notified immediately.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => router.push('/(tabs)/report'),
        },
      ]
    );
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Call',
      'This would dial your local emergency number (911, 999, etc.)',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Shield size={80} color="#DC2626" />
          <Text style={styles.title}>ERS</Text>
          <Text style={styles.subtitle}>Emergency Response System</Text>
          <Text style={styles.description}>
            Connecting communities with emergency responders for faster, more efficient emergency response.
          </Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.emergencyButton]}
            onPress={handleAnonymousReport}
          >
            <AlertTriangle size={32} color="#FFFFFF" />
            <Text style={styles.emergencyButtonText}>Report Emergency</Text>
            <Text style={styles.emergencyButtonSubtext}>Anonymous & Fast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.callButton]}
            onPress={handleEmergencyCall}
          >
            <Phone size={24} color="#FFFFFF" />
            <Text style={styles.callButtonText}>Emergency Call</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.authSection}>
          <Text style={styles.authTitle}>Have an Account?</Text>
          
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.signupSection}>
            <Text style={styles.signupText}>New user? </Text>
            <Link href="/(auth)/signup">
              <Text style={styles.signupLink}>Create Account</Text>
            </Link>
          </View>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>How ERS Works</Text>
          
          <View style={styles.featureItem}>
            <AlertTriangle size={24} color="#DC2626" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Report Incidents</Text>
              <Text style={styles.featureDescription}>
                Quickly report emergencies with location and details
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Users size={24} color="#2563EB" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Direct Response</Text>
              <Text style={styles.featureDescription}>
                Reports go directly to appropriate emergency responders
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Shield size={24} color="#059669" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Track Progress</Text>
              <Text style={styles.featureDescription}>
                Monitor the status of your emergency reports in real-time
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            In case of life-threatening emergency, call your local emergency number immediately
          </Text>
          <Text style={styles.footerSubtext}>
            ERS v1.0.0 - Emergency Response System
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#DC2626',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  quickActions: {
    marginBottom: 40,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 32,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  emergencyButtonSubtext: {
    color: '#FCA5A5',
    fontSize: 14,
    marginTop: 4,
  },
  callButton: {
    backgroundColor: '#1F2937',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  authSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  authTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DC2626',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
  signupSection: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signupLink: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
  },
  features: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureItem: {
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
  featureText: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
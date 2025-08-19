import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Settings, User, Shield, Bell, LogOut, Info, Lock } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/');
          },
        },
      ]
    );
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This feature will be available soon.');
  };

  const handleNotificationSettings = () => {
    Alert.alert('Notifications', 'This feature will be available soon.');
  };

  const handleAbout = () => {
    Alert.alert(
      'About ERS',
      'Emergency Response System v1.0.0\n\nA comprehensive mobile application for emergency reporting and response coordination.',
      [{ text: 'OK' }]
    );
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return '#DC2626';
      case 'responder':
        return '#2563EB';
      default:
        return '#6B7280';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role === 'admin' || role === 'responder') {
      return <Shield size={20} color={getRoleColor(role)} />;
    }
    return <User size={20} color={getRoleColor(role)} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Settings size={24} color="#DC2626" />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {user && (
          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <View style={styles.profileInfo}>
                {getRoleIcon(user.role)}
                <View style={styles.profileText}>
                  <Text style={styles.profileName}>{user.name}</Text>
                  <Text style={styles.profileEmail}>{user.email}</Text>
                  <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                    <Text style={styles.roleText}>{user.role.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {user && (
            <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
              <Lock size={20} color="#6B7280" />
              <Text style={styles.settingText}>Change Password</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.settingItem} onPress={handleNotificationSettings}>
            <Bell size={20} color="#6B7280" />
            <Text style={styles.settingText}>Notifications</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
            <Info size={20} color="#6B7280" />
            <Text style={styles.settingText}>About ERS</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {user && (
          <View style={styles.section}>
            <TouchableOpacity style={[styles.settingItem, styles.logoutItem]} onPress={handleLogout}>
              <LogOut size={20} color="#DC2626" />
              <Text style={[styles.settingText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {!user && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Authentication</Text>
            <TouchableOpacity 
              style={styles.authButton}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.authButton, styles.signupButton]}
              onPress={() => router.push('/(auth)/signup')}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Emergency Response System
          </Text>
          <Text style={styles.versionText}>
            Version 1.0.0
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 16,
    flex: 1,
  },
  settingArrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  logoutItem: {
    borderTopWidth: 1,
    borderTopColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    color: '#DC2626',
  },
  authButton: {
    backgroundColor: '#DC2626',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  signupButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
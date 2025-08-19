import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MapPin, TriangleAlert as AlertTriangle, Clock, User } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useIncidents } from '@/contexts/IncidentContext';

const INCIDENT_TYPES = [
  { id: 'fire', label: 'Fire Emergency', color: '#DC2626' },
  { id: 'medical', label: 'Medical Emergency', color: '#2563EB' },
  { id: 'police', label: 'Police Emergency', color: '#1F2937' },
  { id: 'accident', label: 'Traffic Accident', color: '#D97706' },
  { id: 'natural', label: 'Natural Disaster', color: '#059669' },
  { id: 'other', label: 'Other Emergency', color: '#6B7280' },
];

const RESPONDER_TYPES = [
  { id: 'fire-dept', label: 'Fire Department' },
  { id: 'police', label: 'Police Department' },
  { id: 'medical', label: 'Medical Services' },
  { id: 'emergency', label: 'Emergency Services' },
];

export default function ReportScreen() {
  const { user } = useAuth();
  const { createIncident } = useIncidents();
  
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    responderType: '',
    severity: 'medium',
    isAnonymous: !user,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.type || !formData.description || !formData.location || !formData.responderType) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const incident = {
        ...formData,
        userId: user?.id || null,
        status: 'reported',
        createdAt: new Date().toISOString(),
        id: Date.now().toString(),
      };

      await createIncident(incident);
      
      Alert.alert(
        'Success',
        'Your emergency report has been submitted successfully. Emergency responders have been notified.',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                type: '',
                description: '',
                location: '',
                responderType: '',
                severity: 'medium',
                isAnonymous: !user,
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <AlertTriangle size={24} color="#DC2626" />
          <Text style={styles.headerTitle}>Report Emergency</Text>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Emergency Type</Text>
            <View style={styles.typeGrid}>
              {INCIDENT_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeCard,
                    { borderColor: type.color },
                    formData.type === type.id && { backgroundColor: type.color }
                  ]}
                  onPress={() => handleInputChange('type', type.id)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      formData.type === type.id && styles.typeTextSelected
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Select Responder</Text>
            <View style={styles.responderGrid}>
              {RESPONDER_TYPES.map((responder) => (
                <TouchableOpacity
                  key={responder.id}
                  style={[
                    styles.responderCard,
                    formData.responderType === responder.id && styles.responderCardSelected
                  ]}
                  onPress={() => handleInputChange('responderType', responder.id)}
                >
                  <Text
                    style={[
                      styles.responderText,
                      formData.responderType === responder.id && styles.responderTextSelected
                    ]}
                  >
                    {responder.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Severity Level</Text>
            <View style={styles.severityContainer}>
              {['low', 'medium', 'high', 'critical'].map((severity) => (
                <TouchableOpacity
                  key={severity}
                  style={[
                    styles.severityButton,
                    formData.severity === severity && styles.severityButtonSelected
                  ]}
                  onPress={() => handleInputChange('severity', severity)}
                >
                  <Text
                    style={[
                      styles.severityText,
                      formData.severity === severity && styles.severityTextSelected
                    ]}
                  >
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="Enter emergency location"
                value={formData.location}
                onChangeText={(value) => handleInputChange('location', value)}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="Describe the emergency situation in detail..."
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                multiline
                numberOfLines={4}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {!user && (
              <View style={styles.anonymousNote}>
                <User size={20} color="#6B7280" />
                <Text style={styles.anonymousText}>
                  Reporting anonymously - Consider creating an account to track your reports
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <AlertTriangle size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>
                {loading ? 'Submitting Report...' : 'Submit Emergency Report'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardView: {
    flex: 1,
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
  scrollContent: {
    paddingBottom: 40,
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    marginTop: 20,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  typeCard: {
    width: '48%',
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  typeTextSelected: {
    color: '#FFFFFF',
  },
  responderGrid: {
    marginBottom: 8,
  },
  responderCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  responderCardSelected: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  responderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  responderTextSelected: {
    color: '#FFFFFF',
  },
  severityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  severityButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 2,
  },
  severityButtonSelected: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  severityTextSelected: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  textArea: {
    padding: 16,
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  anonymousNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  anonymousText: {
    fontSize: 12,
    color: '#92400E',
    marginLeft: 8,
    flex: 1,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
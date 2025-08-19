import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TriangleAlert as AlertTriangle, Clock, CircleCheck as CheckCircle, Circle as XCircle, Plus } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

const MOCK_USER_REPORTS = [
  {
    id: '1',
    type: 'medical',
    description: 'Elderly person fell and needs assistance',
    location: 'Oak Street Park, near bench area',
    status: 'resolved',
    severity: 'medium',
    createdAt: '2024-01-14T14:30:00Z',
    responderType: 'medical',
    updatedAt: '2024-01-14T15:45:00Z',
  },
  {
    id: '2',
    type: 'accident',
    description: 'Fender bender at intersection',
    location: 'Main St & 2nd Ave intersection',
    status: 'in-progress',
    severity: 'low',
    createdAt: '2024-01-15T08:15:00Z',
    responderType: 'police',
    updatedAt: '2024-01-15T08:30:00Z',
  },
  {
    id: '3',
    type: 'fire',
    description: 'Small grass fire spreading near residential area',
    location: 'Hillside Drive, behind shopping center',
    status: 'reported',
    severity: 'high',
    createdAt: '2024-01-15T12:00:00Z',
    responderType: 'fire-dept',
    updatedAt: '2024-01-15T12:00:00Z',
  },
];

export default function MyReportsScreen() {
  const { user } = useAuth();
  const [reports] = useState(MOCK_USER_REPORTS);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reported':
        return <Clock size={16} color="#F59E0B" />;
      case 'in-progress':
        return <AlertTriangle size={16} color="#DC2626" />;
      case 'resolved':
        return <CheckCircle size={16} color="#059669" />;
      case 'rejected':
        return <XCircle size={16} color="#6B7280" />;
      default:
        return <Clock size={16} color="#F59E0B" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported':
        return '#F59E0B';
      case 'in-progress':
        return '#DC2626';
      case 'resolved':
        return '#059669';
      case 'rejected':
        return '#6B7280';
      default:
        return '#F59E0B';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return '#059669';
      case 'medium':
        return '#F59E0B';
      case 'high':
        return '#DC2626';
      case 'critical':
        return '#7C2D12';
      default:
        return '#F59E0B';
    }
  };

  const getTypeLabel = (type: string) => {
    const types = {
      fire: 'Fire Emergency',
      medical: 'Medical Emergency',
      police: 'Police Emergency',
      accident: 'Traffic Accident',
      natural: 'Natural Disaster',
      other: 'Other Emergency',
    };
    return types[type as keyof typeof types] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'reported':
        return 'Your report has been submitted and is waiting to be assigned to a responder.';
      case 'in-progress':
        return 'Emergency responders are currently handling your report.';
      case 'resolved':
        return 'Your emergency has been resolved. Thank you for your report.';
      case 'rejected':
        return 'Your report was reviewed but could not be processed.';
      default:
        return 'Status unknown';
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.accessDenied}>
          <AlertTriangle size={48} color="#DC2626" />
          <Text style={styles.accessDeniedText}>Login Required</Text>
          <Text style={styles.accessDeniedSubtext}>
            Please log in to view your reports
          </Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.loginButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AlertTriangle size={24} color="#DC2626" />
        <Text style={styles.headerTitle}>My Reports</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/report')}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{reports.length}</Text>
            <Text style={styles.statLabel}>Total Reports</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {reports.filter(r => r.status === 'in-progress').length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {reports.filter(r => r.status === 'resolved').length}
            </Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
        </View>

        {reports.length === 0 ? (
          <View style={styles.emptyState}>
            <AlertTriangle size={48} color="#6B7280" />
            <Text style={styles.emptyTitle}>No Reports Yet</Text>
            <Text style={styles.emptyText}>
              You haven't submitted any emergency reports yet.
            </Text>
            <TouchableOpacity 
              style={styles.reportButton}
              onPress={() => router.push('/(tabs)/report')}
            >
              <Text style={styles.reportButtonText}>Report Emergency</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.reportsList}>
            {reports.map((report) => (
              <View key={report.id} style={styles.reportCard}>
                <View style={styles.reportHeader}>
                  <View style={styles.reportType}>
                    <Text style={styles.typeText}>{getTypeLabel(report.type)}</Text>
                    <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(report.severity) }]}>
                      <Text style={styles.severityText}>{report.severity}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
                    {getStatusIcon(report.status)}
                    <Text style={styles.statusText}>{report.status.replace('-', ' ')}</Text>
                  </View>
                </View>

                <Text style={styles.reportDescription}>{report.description}</Text>
                <Text style={styles.reportLocation}>📍 {report.location}</Text>
                
                <View style={styles.statusMessage}>
                  <Text style={styles.statusMessageText}>{getStatusMessage(report.status)}</Text>
                </View>

                <View style={styles.reportMeta}>
                  <Text style={styles.metaText}>
                    Submitted: {formatDate(report.createdAt)}
                  </Text>
                  <Text style={styles.metaText}>
                    Updated: {formatDate(report.updatedAt)}
                  </Text>
                </View>

                <View style={styles.reportFooter}>
                  <Text style={styles.responderText}>
                    Assigned to: {report.responderType.replace('-', ' ').toUpperCase()}
                  </Text>
                  <TouchableOpacity style={styles.trackButton}>
                    <Text style={styles.trackButtonText}>Track Progress</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
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
    flex: 1,
  },
  addButton: {
    backgroundColor: '#DC2626',
    padding: 8,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 40,
  },
  reportButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  reportsList: {
    flex: 1,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportType: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  reportDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  reportLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  statusMessage: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  statusMessageText: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
  },
  reportMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  responderText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
  trackButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  trackButtonText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  accessDeniedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    marginTop: 16,
  },
  accessDeniedSubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
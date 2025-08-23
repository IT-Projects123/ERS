import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FileText, Clock, CircleCheck as CheckCircle, Circle as XCircle, Filter, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_REPORTS = [
  {
    id: '1',
    type: 'fire',
    description: 'Building fire at downtown office complex',
    location: '123 Main St, Downtown',
    status: 'in-progress',
    severity: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    responderType: 'fire-dept',
    reportedBy: 'John Doe',
    isAnonymous: false,
  },
  {
    id: '2',
    type: 'medical',
    description: 'Heart attack victim needs immediate assistance',
    location: 'Central Park, near fountain',
    status: 'resolved',
    severity: 'critical',
    createdAt: '2024-01-15T09:15:00Z',
    responderType: 'medical',
    reportedBy: 'Anonymous',
    isAnonymous: true,
  },
  {
    id: '3',
    type: 'accident',
    description: 'Multi-car accident blocking traffic',
    location: 'Highway 101, Mile Marker 45',
    status: 'reported',
    severity: 'medium',
    createdAt: '2024-01-15T11:45:00Z',
    responderType: 'police',
    reportedBy: 'Sarah Wilson',
    isAnonymous: false,
  },
];

export default function ReportsScreen() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [reports] = useState(MOCK_REPORTS);

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

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(report => report.status === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FileText size={24} color="#DC2626" />
        <Text style={styles.headerTitle}>View All Reports</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['all', 'reported', 'in-progress', 'resolved'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterChip,
                filter === status && styles.filterChipActive
              ]}
              onPress={() => setFilter(status)}
            >
              <Text style={[
                styles.filterChipText,
                filter === status && styles.filterChipTextActive
              ]}>
                {status === 'all' ? 'All Reports' : 
                 status.split('-').map(word => 
                   word.charAt(0).toUpperCase() + word.slice(1)
                 ).join(' ')
                }
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

        <View style={styles.reportsList}>
          {filteredReports.map((report) => (
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
              
              <View style={styles.reportMeta}>
                <Text style={styles.metaText}>
                  Reported by: {report.isAnonymous ? 'Anonymous' : report.reportedBy}
                </Text>
                <Text style={styles.metaText}>
                  {formatDate(report.createdAt)}
                </Text>
              </View>

              <View style={styles.reportFooter}>
                <Text style={styles.responderText}>
                  Assigned to: {report.responderType.replace('-', ' ').toUpperCase()}
                </Text>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    flex: 1,
  },
  filterButton: {
    padding: 8,
  },
  filtersContainer: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 4,
    marginLeft: 16,
  },
  filterChipActive: {
    backgroundColor: '#DC2626',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
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
  viewButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
});
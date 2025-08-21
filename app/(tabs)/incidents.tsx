import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TriangleAlert as AlertTriangle, Clock, CircleCheck as CheckCircle, Play, Check } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const MOCK_ASSIGNED_INCIDENTS = [
  {
    id: '1',
    type: 'fire',
    description: 'Building fire at downtown office complex',
    location: '123 Main St, Downtown',
    status: 'in-progress',
    severity: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    assignedAt: '2024-01-15T10:35:00Z',
    reportedBy: 'John Doe',
    isAnonymous: false,
    estimatedResponse: '15 minutes',
  },
  {
    id: '2',
    type: 'accident',
    description: 'Multi-car accident blocking traffic',
    location: 'Highway 101, Mile Marker 45',
    status: 'reported',
    severity: 'medium',
    createdAt: '2024-01-15T11:45:00Z',
    assignedAt: '2024-01-15T11:50:00Z',
    reportedBy: 'Sarah Wilson',
    isAnonymous: false,
    estimatedResponse: '8 minutes',
  },
  {
    id: '3',
    type: 'fire',
    description: 'Small grass fire spreading near residential area',
    location: 'Hillside Drive, behind shopping center',
    status: 'resolved',
    severity: 'high',
    createdAt: '2024-01-14T16:00:00Z',
    assignedAt: '2024-01-14T16:05:00Z',
    resolvedAt: '2024-01-14T17:30:00Z',
    reportedBy: 'Mike Johnson',
    isAnonymous: false,
    estimatedResponse: 'Completed',
  },
];

export default function IncidentsScreen() {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState(MOCK_ASSIGNED_INCIDENTS);

  const handleAcceptIncident = (incidentId: string) => {
    Alert.alert(
      'Accept Incident',
      'Are you ready to respond to this emergency?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: () => {
            setIncidents(prev => prev.map(incident => 
              incident.id === incidentId 
                ? { ...incident, status: 'in-progress' }
                : incident
            ));
            Alert.alert('Success', 'Incident accepted. You are now responding.');
          },
        },
      ]
    );
  };

  const handleResolveIncident = (incidentId: string) => {
    Alert.alert(
      'Resolve Incident',
      'Mark this incident as resolved?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Resolve',
          onPress: () => {
            setIncidents(prev => prev.map(incident => 
              incident.id === incidentId 
                ? { ...incident, status: 'resolved', resolvedAt: new Date().toISOString() }
                : incident
            ));
            Alert.alert('Success', 'Incident marked as resolved.');
          },
        },
      ]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reported':
        return <Clock size={16} color="#F59E0B" />;
      case 'in-progress':
        return <AlertTriangle size={16} color="#DC2626" />;
      case 'resolved':
        return <CheckCircle size={16} color="#059669" />;
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AlertTriangle size={24} color="#2563EB" />
        <Text style={styles.headerTitle}>My Incidents</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{incidents.length}</Text>
            <Text style={styles.statLabel}>Total Assigned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {incidents.filter(i => i.status === 'in-progress').length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {incidents.filter(i => i.status === 'resolved').length}
            </Text>
            <Text style={styles.statLabel}>Resolved</Text>
          </View>
        </View>

        <View style={styles.incidentsList}>
          {incidents.map((incident) => (
            <View key={incident.id} style={styles.incidentCard}>
              <View style={styles.incidentHeader}>
                <View style={styles.incidentType}>
                  <Text style={styles.typeText}>{getTypeLabel(incident.type)}</Text>
                  <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(incident.severity) }]}>
                    <Text style={styles.severityText}>{incident.severity}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(incident.status) }]}>
                  {getStatusIcon(incident.status)}
                  <Text style={styles.statusText}>{incident.status.replace('-', ' ')}</Text>
                </View>
              </View>

              <Text style={styles.incidentDescription}>{incident.description}</Text>
              <Text style={styles.incidentLocation}>📍 {incident.location}</Text>
              
              <View style={styles.incidentMeta}>
                <Text style={styles.metaText}>
                  Reported by: {incident.isAnonymous ? 'Anonymous' : incident.reportedBy}
                </Text>
                <Text style={styles.metaText}>
                  Assigned: {formatDate(incident.assignedAt)}
                </Text>
              </View>

              <View style={styles.responseInfo}>
                <Text style={styles.responseText}>
                  ETA: {incident.estimatedResponse}
                </Text>
                {incident.resolvedAt && (
                  <Text style={styles.resolvedText}>
                    Resolved: {formatDate(incident.resolvedAt)}
                  </Text>
                )}
              </View>

              <View style={styles.incidentActions}>
                {incident.status === 'reported' && (
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAcceptIncident(incident.id)}
                  >
                    <Play size={16} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Accept & Respond</Text>
                  </TouchableOpacity>
                )}
                
                {incident.status === 'in-progress' && (
                  <TouchableOpacity
                    style={styles.resolveButton}
                    onPress={() => handleResolveIncident(incident.id)}
                  >
                    <Check size={16} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Mark Resolved</Text>
                  </TouchableOpacity>
                )}

                {incident.status === 'resolved' && (
                  <View style={styles.completedBadge}>
                    <CheckCircle size={16} color="#059669" />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                )}
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
  incidentsList: {
    flex: 1,
  },
  incidentCard: {
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
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  incidentType: {
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
  incidentDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  incidentLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  incidentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  responseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  responseText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  resolvedText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  incidentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  acceptButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resolveButton: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  completedText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});
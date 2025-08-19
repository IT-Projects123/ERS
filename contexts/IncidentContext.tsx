import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Incident {
  id: string;
  type: string;
  description: string;
  location: string;
  responderType: string;
  severity: string;
  status: 'reported' | 'in-progress' | 'resolved' | 'rejected';
  userId?: string | null;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface IncidentContextType {
  incidents: Incident[];
  createIncident: (incident: Omit<Incident, 'updatedAt'>) => Promise<void>;
  updateIncident: (id: string, updates: Partial<Incident>) => Promise<void>;
  getIncidentsByUser: (userId: string) => Incident[];
  getAllIncidents: () => Incident[];
}

const IncidentContext = createContext<IncidentContextType | null>(null);

export function IncidentProvider({ children }: { children: ReactNode }) {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const createIncident = async (incident: Omit<Incident, 'updatedAt'>): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newIncident: Incident = {
        ...incident,
        updatedAt: incident.createdAt,
      };
      
      setIncidents(prev => [newIncident, ...prev]);
    } catch (error) {
      console.error('Create incident error:', error);
      throw error;
    }
  };

  const updateIncident = async (id: string, updates: Partial<Incident>): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIncidents(prev => prev.map(incident => 
        incident.id === id 
          ? { ...incident, ...updates, updatedAt: new Date().toISOString() }
          : incident
      ));
    } catch (error) {
      console.error('Update incident error:', error);
      throw error;
    }
  };

  const getIncidentsByUser = (userId: string): Incident[] => {
    return incidents.filter(incident => incident.userId === userId);
  };

  const getAllIncidents = (): Incident[] => {
    return incidents;
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        createIncident,
        updateIncident,
        getIncidentsByUser,
        getAllIncidents,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncidents() {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
}
import { Tabs } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Chrome as Home, TriangleAlert as AlertTriangle, Users, Settings, Shield, FileText } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#DC2626',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            paddingBottom: 8,
            height: 88,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="users"
          options={{
            title: 'Users',
            tabBarIcon: ({ size, color }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="all-reports"
          options={{
            title: 'View Reports',
            tabBarIcon: ({ size, color }) => (
              <FileText size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ size, color }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }

  if (user?.role === 'responder') {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            paddingBottom: 8,
            height: 88,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ size, color }) => (
              <Shield size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="incidents"
          options={{
            title: 'Incidents',
            tabBarIcon: ({ size, color }) => (
              <AlertTriangle size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ size, color }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }

  // Regular user tabs
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#DC2626',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          paddingBottom: 8,
          height: 88,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ size, color }) => (
            <AlertTriangle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-reports"
        options={{
          title: 'My Reports',
          tabBarIcon: ({ size, color }) => (
            <AlertTriangle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
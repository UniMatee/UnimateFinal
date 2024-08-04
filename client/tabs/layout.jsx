import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const TabIcon = ({ icon, color, focused, size }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <FontAwesome name={icon} size={size} color={color} />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
          shadowOpacity: 0.3,
          shadowRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#888888',
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          let size = 30;  
          if (route.name === 'Announcements') {
            iconName = 'home';
            size = focused ? 35 : 30;
          } else if (route.name === 'Schedule') {
            iconName = 'clock-o';
            size = focused ? 35 : 30;
          } else if (route.name === 'Profile') {
            iconName = 'circle-o';
            size = focused ? 35 : 30;
          } else if (route.name === 'Browse') {
            iconName = 'search';
            size = focused ? 35 : 30;
          } else if (route.name === 'LostAndFound') {
            iconName = 'plus-square-o';
            size = focused ? 35 : 30;
          }

          return <TabIcon icon={iconName} color={color} focused={focused} size={size} />;
        },
      })}
    >

      <Tabs.Screen name="Announcements" options={{ headerShown: false }} />
      <Tabs.Screen name="Schedule" options={{ headerShown: false }} />
      <Tabs.Screen name="Profile" options={{ headerShown: false }} />
      <Tabs.Screen name="Browse" options={{ headerShown: false }} />
      <Tabs.Screen name="LostAndFound" options={{ headerShown: false }} />

    </Tabs>
  );
}

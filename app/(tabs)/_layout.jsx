import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../utils/colors'

export default function TabLayout() {
  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          paddingVertical: 4, // Add vertical spacing for the tab bar
          height: 60, 
        },
        tabBarItemStyle: {
          paddingVertical: 4, // Add vertical spacing for each tab item
          display:'flex',
          flexDirection:'column',
        },

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          //? The color prop is automatically provided by Expo Router to the tabBarIcon function based on whether the tab is active or inactive. The color value will be set to the tabBarActiveTintColor when the tab is active, and tabBarInactiveTintColor when the tab is inactive

          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      
    </Tabs>
  )
}
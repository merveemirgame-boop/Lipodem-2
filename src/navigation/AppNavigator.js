import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import NutritionScreen from '../screens/NutritionScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import SupplementsScreen from '../screens/SupplementsScreen';
import CareScreen from '../screens/CareScreen';
import DailyRoutineScreen from '../screens/DailyRoutineScreen';
import { COLORS } from '../utils/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ emoji, focused }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: focused ? 22 : 20 }}>{emoji}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 12,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Ana Sayfa"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Beslenme"
        component={NutritionScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🥗" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Egzersiz"
        component={ExerciseScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🚴" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Takviyeler"
        component={SupplementsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="💊" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Bakim"
        component={CareScreen}
        options={{
          title: 'Bakım',
          tabBarIcon: ({ focused }) => <TabIcon emoji="💆" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="GunlukRutin"
        component={DailyRoutineScreen}
        options={{
          title: 'Rutin',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📋" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

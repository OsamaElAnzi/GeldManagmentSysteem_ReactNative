import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2980b9",
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: "#888",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="transacties"
        options={{
          title: "Transactie",
          tabBarIcon: ({ color }) => (
            <AntDesign name="linechart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

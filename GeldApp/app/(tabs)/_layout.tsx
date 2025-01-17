import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2980b9",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#1E1E1E",
            borderTopWidth: 0,
          },
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E", // Hele achtergrond zwartgrijs
  },
});

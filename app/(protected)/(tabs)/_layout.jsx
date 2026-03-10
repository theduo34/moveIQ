import React from "react";
import { Tabs } from "expo-router";
import {
  Bell,
  House,
  Map,
  Search, User,
} from "lucide-react-native";

const TABS = [
  { name: "home", title: "Home", icon: House },
  { name: "search", title: "Search", icon: Search },
  { name: "routes", title: "Routes", icon: Map },
  { name: "activity", title: "Activity", icon: Bell },
  { name: "profile", title: "Profile", icon: User },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#56034C",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: 64,
          paddingBottom: 4,
          paddingTop: 4,
          backgroundColor: "#FFFFFF",
          borderRadius: 32,
          marginHorizontal: 16,
          marginBottom: 24,
          borderTopWidth: 0,
          position: "absolute",
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 0,
        },
      }}
    >
      {TABS.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, focused }) => (
                <IconComponent
                  color={color}
                  size={22}
                  strokeWidth={focused ? 2.5 : 1.8}
                />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
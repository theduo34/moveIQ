import React from "react";
import { Tabs } from "expo-router";
import {
  House,
  Map,
  Route,
  Settings,
} from "lucide-react-native";

const TABS = [
  { name: "home", title: "Home", icon: House },
  { name: "map", title: "Map", icon: Map },
  { name: "route", title: "Route", icon: Route },
  { name: "settings", title: "Settings", icon: Settings },
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
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 2,
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
              tabBarIcon: ({ color, focused }) => {
                return (
                  <IconComponent
                    color={color}
                    size={focused ? 26 : 24}
                    strokeWidth={focused ? 2.5 : 2}
                    style={{
                      transform: [{ scale: focused ? 1.1 : 1 }],
                    }}
                  />
                );
              },
              tabBarLabel:
                tab.name === "add-money" ? () => null : undefined,
            }}
          />
        );
      })}
    </Tabs>
  );
}

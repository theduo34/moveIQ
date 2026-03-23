import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { DUMMY_NOTIFICATIONS, NOTIFICATION_TYPE, getUnreadCount } from "./notification";
import NotificationTabs from "./notifications-tabs";
import EmptyNotifications from "./empty-notifications";
import NotificationItem from "./notification-item";

export default function NotificationList() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");
    const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);

    const unreadCount = getUnreadCount(notifications);

    const filtered =
        activeTab === "unread"
            ? notifications.filter((n) => !n.isRead)
            : notifications;

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
    };

    const handlePress = (notification) => {
        markAsRead(notification.id);

        console.log("[NotificationList] Marking as read:", notification.id);

        if (notification.type === NOTIFICATION_TYPE.INCIDENT && notification.incidentId) {
            console.log("[NotificationList] Navigating to incident detail:", notification.incidentId);
            router.push({
                pathname: "/(protected)/(stack)/notifications/detail",
                params: {
                    notificationId: notification.id,
                    type: notification.type,
                    title: notification.title,
                    fullDescription: notification.fullDescription,
                    routeLabel: notification.routeLabel,
                    timestamp: notification.timestamp,
                    incidentId: notification.incidentId,
                    isLinkedToIncident: "true",
                },
            });
        } else {
            console.log("[NotificationList] Navigating to notification detail:", notification.id);
            router.push({
                pathname: "/(protected)/(stack)/notifications/detail",
                params: {
                    notificationId: notification.id,
                    type: notification.type,
                    title: notification.title,
                    fullDescription: notification.fullDescription,
                    routeLabel: notification.routeLabel,
                    timestamp: notification.timestamp,
                    incidentId: null,
                    isLinkedToIncident: "false",
                },
            });
        }
    };

    return (
        <View className="flex-1 bg-white">
            <NotificationTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                unreadCount={unreadCount}
            />

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={filtered.length === 0 ? { flex: 1 } : {}}
                ListEmptyComponent={<EmptyNotifications />}
                renderItem={({ item }) => (
                    <NotificationItem notification={item} onPress={handlePress} />
                )}
            />
        </View>
    );
}
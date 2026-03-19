
export const NOTIFICATION_TYPE = {
    INCIDENT: "incident",       // links to an incident detail
    ROUTE_UPDATE: "route_update", // route was saved/updated
    ALERT_CLEAR: "alert_clear",  // congestion/incident cleared
    GENERAL: "general",          // general informational
};


export const DUMMY_NOTIFICATIONS = [
    {
        id: "1",
        type: NOTIFICATION_TYPE.ALERT_CLEAR,
        title: "Road Is Clear!",
        shortDescription:
            "The congestion on Lekki – Victoria Island has cleared. Your commute should no...",
        fullDescription:
            "The congestion on Lekki – Victoria Island has fully cleared as of 8:45 AM. Traffic is now flowing smoothly in both directions. Your estimated travel time has reduced by approximately 22 minutes. Safe travels!",
        routeLabel: "Lekki – Victoria Island",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        incidentId: null, // no linked incident, it's cleared
    },
    {
        id: "2",
        type: NOTIFICATION_TYPE.INCIDENT,
        title: "Heavy Traffic on Lekki – Ajah",
        shortDescription:
            "The congestion on Lekki – Victoria Island has cleared. Your commute should no...",
        fullDescription:
            "Heavy traffic has been reported on the Lekki–Ajah corridor, specifically between Chevron Drive and Abraham Adesanya roundabout. Multiple users have confirmed gridlock conditions. Avoid if possible or allow an extra 35–50 minutes for your journey.",
        routeLabel: "Lekki – Ajah",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        incidentId: "INC-2041", // links to an incident
    },
    {
        id: "3",
        type: NOTIFICATION_TYPE.INCIDENT,
        title: "Roadblock Confirmed",
        shortDescription: "A roadblock has just been reported on your Oshodi – Berger route.",
        fullDescription:
            "A roadblock has been confirmed on the Oshodi–Berger Expressway near the LASMA checkpoint at Ojota. Police presence reported. The blockage is causing significant delays heading northbound. Alternative: use the old Abeokuta Expressway via Agege.",
        routeLabel: "Oshodi – Berger",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4h ago
        isRead: true,
        incidentId: "INC-2038",
    },
    {
        id: "4",
        type: NOTIFICATION_TYPE.ROUTE_UPDATE,
        title: "Your route has been updated",
        shortDescription: "Iyana Oba – Mile 2 has been added successfully to your saved routes",
        fullDescription:
            "Your saved route — Iyana Oba to Mile 2 — has been successfully added to your profile. You will now receive real-time alerts, congestion reports, and incident updates along this corridor whenever there are changes that may affect your commute.",
        routeLabel: "Iyana Oba – Mile 2",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        incidentId: null,
    },
    {
        id: "5",
        type: NOTIFICATION_TYPE.ALERT_CLEAR,
        title: "Third Mainland Bridge — All Clear",
        shortDescription:
            "Earlier reports of an accident on Third Mainland Bridge have been resolved.",
        fullDescription:
            "The earlier reported accident on Third Mainland Bridge (inbound Lagos Island) has been cleared. All lanes are now open and traffic is returning to normal. Expected travel time from the mainland is now approximately 18 minutes.",
        routeLabel: "Third Mainland Bridge",
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        incidentId: null,
    },
];


export const NOTIFICATION_STYLE = {
    [NOTIFICATION_TYPE.INCIDENT]: {
        iconName: "warning",
        bgColor: "#FEF2F2",
        iconColor: "#DC2626",
    },
    [NOTIFICATION_TYPE.ALERT_CLEAR]: {
        iconName: "checkmark-circle",
        bgColor: "#F0FDF4",
        iconColor: "#1B6B5A",
    },
    [NOTIFICATION_TYPE.ROUTE_UPDATE]: {
        iconName: "location",
        bgColor: "#EFF6FF",
        iconColor: "#2563EB",
    },
    [NOTIFICATION_TYPE.GENERAL]: {
        iconName: "information-circle",
        bgColor: "#FFFBEB",
        iconColor: "#D97706",
    },
};


export function formatTimeAgo(isoString) {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export function getUnreadCount(notifications) {
    return notifications.filter((n) => !n.isRead).length;
}
// DUMMY ROUTES DATA
// Replace with GET /api/routes when backend is ready
// ----------------------------
export const DUMMY_ROUTES = [
    { id: "1", label: "Lagos–Ibadan Expressway", type: "Major corridor", distance: "12.5km" },
    { id: "2", label: "Iyana – Ibadan Expressway", type: "Major corridor", distance: "9.2km" },
    { id: "3", label: "Third Mainland Bridge", type: "Bridge route", distance: "11.8km" },
    { id: "4", label: "Lekki–Epe Expressway", type: "Coastal corridor", distance: "18.4km" },
    { id: "5", label: "Apapa–Oshodi Expressway", type: "Port corridor", distance: "7.6km" },
    { id: "6", label: "Sagamu–Ore–Benin Road", type: "Inter-state", distance: "32.1km" },
    { id: "7", label: "Ketu–Mile 12 Road", type: "Local corridor", distance: "3.4km" },
    { id: "8", label: "Ojota–Ikorodu Road", type: "Local corridor", distance: "5.9km" },
];


export const DUMMY_SAVED_ROUTES = [
    { id: "1", label: "Lagos–Ibadan Expressway", type: "Major corridor", distance: "12.5km" },
    { id: "3", label: "Third Mainland Bridge", type: "Bridge route", distance: "11.8km" },
];

// ----------------------------
// INCIDENT TYPES
// Static config — only update if new incident types are added
// ----------------------------
export const INCIDENT_TYPES = [
    {
        id: "heavy_traffic",
        label: "Heavy Traffic",
        subtitle: "Congestion ahead",
        icon: "🚗",
        color: {
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-red-600",
            selectedBorder: "border-red-500",
        },
    },
    {
        id: "accident_crash",
        label: "Accident/Crash",
        subtitle: "Collision on road",
        icon: "🚨",
        color: {
            bg: "bg-orange-50",
            border: "border-orange-200",
            text: "text-orange-600",
            selectedBorder: "border-orange-500",
        },
    },
    {
        id: "construction_roadblock",
        label: "Construction/Roadblock",
        subtitle: "Closure ahead",
        icon: "🚧",
        color: {
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            text: "text-yellow-700",
            selectedBorder: "border-yellow-500",
        },
    },
    {
        id: "police_lasma",
        label: "Police/LASMA",
        subtitle: "Checkpoint ahead",
        icon: "🚔",
        color: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-600",
            selectedBorder: "border-blue-500",
        },
    },
];

// ----------------------------
// NOTES CHARACTER LIMIT
// ----------------------------
export const NOTES_MAX_LENGTH = 120;

// ----------------------------
// VALIDATION
// Call before navigating to ReviewScreen
// ----------------------------
export function validateReportForm({ selectedRoute, selectedIncident }) {
    const errors = {};

    if (!selectedRoute) {
        errors.route = "Please select a route to continue.";
    }

    if (!selectedIncident) {
        errors.incident = "Please select what's happening on this route.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}

// ----------------------------
// REPORT PAYLOAD BUILDER
// Shapes the data for the API — swap console.log with POST /api/incidents
// ----------------------------
export function buildReportPayload({ selectedRoute, selectedIncident, notes }) {
    return {
        routeId: selectedRoute?.id ?? null,
        routeLabel: selectedRoute?.label ?? null,
        routeType: selectedRoute?.type ?? null,
        routeDistance: selectedRoute?.distance ?? null,
        incidentTypeId: selectedIncident?.id ?? null,
        incidentLabel: selectedIncident?.label ?? null,
        notes: notes?.trim() || null,
        reportedBy: "You", // TODO: replace with auth user from context/store
        timestamp: new Date().toISOString(),
    };
}
import { useLocalSearchParams } from "expo-router";
import RouteHistoryScreen from "../../../components/screens/protected/route-history/route-history-screen";

export default function RouteHistory() {
  const { name } = useLocalSearchParams();
  return <RouteHistoryScreen routeName={name} />;
}
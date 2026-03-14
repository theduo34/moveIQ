import { useLocalSearchParams } from "expo-router";
import RouteDetailScreen from "../../../components/screens/protected/route-detail/route-detail-screen";

export default function RouteDetail() {
  const { name } = useLocalSearchParams();
  return <RouteDetailScreen routeName={name} />;
}
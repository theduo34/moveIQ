// components/shared/section-card.jsx
import { View } from "react-native";

const SectionCard = ({ children, style }) => (
  <View
    className="bg-gray-100 rounded-3xl overflow-hidden mb-4"
    style={style}
  >
    {children}
  </View>
);

export default SectionCard;
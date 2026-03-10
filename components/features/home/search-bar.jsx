import { View, TextInput } from "react-native";
import { Search } from "lucide-react-native";

const SearchBar = () => {
  return (
    <View className="flex-row items-center bg-background border rounded-full px-4 py-3">
      <Search size={18} color="#9CA3AF" strokeWidth={2} />
      <TextInput
        className="flex-1 ml-3 text-sm text-text-primary"
        placeholder='Search Route "Try Iyana - CMS"'
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
};

export default SearchBar;
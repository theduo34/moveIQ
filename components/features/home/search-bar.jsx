import { View, TextInput } from "react-native";
import { Search } from "lucide-react-native";
import { SafeAreaView } from "react-native-web";

const SearchBar = () => {
  return (
    <SafeAreaView>
    <View className="flex-row items-center bg-background border rounded-full px-4 py-3">
      <Search size={18} color="#9CA3AF" strokeWidth={2} />
      <TextInput
        className="flex-1 ml-3 text-sm text-text-primary"
        placeholder='Search Route "Try Iyana - CMS"'
        placeholderTextColor="#9CA3AF"
      />
    </View>
    </SafeAreaView>
  );
};

export default SearchBar;
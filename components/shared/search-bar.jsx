import {View, TextInput, TouchableOpacity} from "react-native";
import {Search, X} from "lucide-react-native";

const SearchBar = (
  {
    placeholder = "Search...",
    value,
    onChangeText,
    onSubmit,
    onClear,
    editable = true,
    containerClass = "",
  }) => {
  return (
    <View
      className={`flex-row items-center bg-background border border-border rounded-full px-4 py-3 shadow-sm ${containerClass}`}
    >
      <Search size={18} color="#9CA3AF" strokeWidth={2}/>

      <TextInput
        className="flex-1 mx-3 text-sm text-text-primary"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        editable={editable}
      />

      {value?.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear} activeOpacity={0.7}>
          <X size={16} color="#9CA3AF" strokeWidth={2}/>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
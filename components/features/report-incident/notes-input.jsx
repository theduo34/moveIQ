import React from "react";
import { View, Text, TextInput } from "react-native";
import { NOTES_MAX_LENGTH } from "./report";

export default function NotesInput({ notes, onChangeNotes }) {
    const charCount = notes?.length ?? 0;
    const nearLimit = charCount >= NOTES_MAX_LENGTH * 0.85;

    return (
        <View className="mb-6">
            <TextInput
                value={notes}
                onChangeText={(text) => {
                    if (text.length <= NOTES_MAX_LENGTH) onChangeNotes(text);
                }}
                placeholder="Add more details (optional)"
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                maxLength={NOTES_MAX_LENGTH}
                className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 min-h-[80px]"
                style={{ fontFamily: "System" }}
            />
            <Text
                className={`text-xs text-right mt-1 ${
                    nearLimit ? "text-orange-500" : "text-gray-400"
                }`}
            >
                {charCount}/{NOTES_MAX_LENGTH}
            </Text>
        </View>
    );
}
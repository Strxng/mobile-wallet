import React from "react";
import { Text, View } from "react-native";

interface TextCardProps {
  text: string;
}

export const TextCard = ({ text }: TextCardProps) => {
  return (
    <View className="py-1 px-4 bg-zinc-800 rounded-full">
      <Text className="text-white font-medium">{text}</Text>
    </View>
  );
};

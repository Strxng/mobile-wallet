import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { CreditValue } from "./CreditValue";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface MoneyMovimentCardProps {
  value: number;
  when: Date;
  title: string;
  description: string;
  onDeletePress: () => void;
}

export const MoneyMovimentCard = ({
  title,
  description,
  value,
  when,
  onDeletePress = () => {},
}: MoneyMovimentCardProps) => {
  const colorOne = value > 0 ? "#f0fff2" : "#fff0f0";
  const colorTwo = value > 0 ? "#bdfcb6" : "#fcb6b6";

  return (
    <LinearGradient
      className="rounded-2xl p-3"
      colors={[colorOne, colorTwo]}
      start={[0, 1]}
      end={[1, 0]}
    >
      <View className="container p-3 flex flex-row justify-center items-center">
        <TouchableOpacity
          onPress={onDeletePress}
          className="absolute h-6 w-6 bg-white top-0 right-0 rounded-full items-center justify-center"
        >
          <FontAwesome size={15} name={"close"} color={colorTwo} />
        </TouchableOpacity>
        <View style={{ width: "60%" }}>
          <Text className="text-2xl font-semibold flex-wrap" numberOfLines={1}>
            {title}
          </Text>
          <Text className="flex-wrap" numberOfLines={1}>
            {description}
          </Text>
          <Text className="mt-3">
            {moment(when).format("DD/MM/yyyy HH:mm")}
          </Text>
        </View>

        <View className="flex items-end" style={{ width: "40%" }}>
          <CreditValue value={value} />
        </View>
      </View>
    </LinearGradient>
  );
};

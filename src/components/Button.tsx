import React from "react";
import { TouchableOpacity, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ButtonProps {
  title: string;
  variant: "PRIMARY" | "SECONDARY";
  width: "50%" | "100%";
  iconName?: string;
  onPress?: () => void;
}

export const Button = ({
  title,
  variant,
  width,
  iconName,
  onPress = () => {},
}: ButtonProps) => {
  const color = variant === "PRIMARY" ? "#1c4ed8" : "#27272a";

  return (
    <TouchableOpacity
      className="p-3 h-14 justify-center items-center rounded-2xl flex flex-row"
      style={{ backgroundColor: color, gap: 10, width }}
      onPress={onPress}
    >
      {iconName && <FontAwesome size={20} name={iconName} color={"#FFF"} />}
      <Text className="text-white text-lg font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

import React from "react";
import { Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface CreditValueProps {
  value: number;
}

export const CreditValue = ({ value }: CreditValueProps) => {
  const color = value === 0 ? "#52525b" : value > 0 ? "#079669" : "#9f1339";

  const iconName =
    value === 0 ? "minus" : value > 0 ? "arrow-up" : "arrow-down";

  const normalizedValue =
    value < 0 ? (value * -1).toFixed(2) : value.toFixed(2);
  const valueString = normalizedValue.toString().replace(".", ",");

  return (
    <View
      testID="credit-value"
      className="flex flex-row justify-center items-center"
    >
      <View
        testID="credit-value-icon-container"
        style={{ backgroundColor: color }}
        className="rounded-full h-5 w-5 justify-center items-center"
      >
        <FontAwesome size={12} name={iconName} color={"#FFF"} />
      </View>

      <Text
        testID="credit-value-text"
        style={{ color: color }}
        className="text-lg ml-1 font-semibold"
      >
        {`R$${valueString}`}
      </Text>
    </View>
  );
};

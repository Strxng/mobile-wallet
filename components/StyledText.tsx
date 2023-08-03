import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface MonoTextProps {
  style?: StyleProp<TextStyle>;
  children?: string;
}

export const MonoText = (props: MonoTextProps) => {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
};

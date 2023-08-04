import React from "react";
import { Stack } from "expo-router";
import "expo-router/entry";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen
        name="modalMoneyMoviment"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}

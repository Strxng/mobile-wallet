import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";
import "expo-router/entry";
import { notifyError } from "../utils/toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (err) => {
        if (err instanceof Error) {
          notifyError("Ops... algo deu errado", err.message);
        }
      },
    },
    mutations: {
      onError: (err) => {
        if (err instanceof Error) {
          notifyError("Ops... algo deu errado", err.message);
        }
      },
    },
  },
});

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen
          name="modalMoneyMoviment"
          options={{ presentation: "modal" }}
        />
      </Stack>
      <Toast />
    </QueryClientProvider>
  );
}

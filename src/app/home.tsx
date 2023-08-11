import React from "react";
import { ScrollView, Text, View } from "react-native";
import { CreditValue } from "../components/CreditValue";
import { TextCard } from "../components/TextCard";
import { Button } from "../components/Button";
import { MoneyMovimentCard } from "../components/MoneyMovimentCard";
import { useRouter } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  deleteMoviment,
  getAllMoviments,
  getAmount,
  getTodayAmount,
} from "../services/moviments";

import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: moviments = [] } = useQuery(["moviments"], () =>
    getAllMoviments()
  );

  const { data: todayAmount = 0 } = useQuery(["today-amount"], () =>
    getTodayAmount()
  );

  const { data: amount } = useQuery(["amount"], () => getAmount());
  const amountString = amount
    ? amount.toFixed(2).toString().replace(".", ",")
    : "0,00";

  const { mutate } = useMutation(deleteMoviment, {
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: "amount",
      });
      queryClient.invalidateQueries({
        queryKey: "today-amount",
      });
      queryClient.invalidateQueries({
        queryKey: "moviments",
      });
    },
  });

  return (
    <View className="bg-zinc-950 h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ padding: 0, minHeight: "65%" }}
      >
        <View className="bg-zinc-950 h-80 justify-center items-center">
          <View className="flex flex-row">
            <Text className="text-white text-4xl font-semibold">
              R${amountString}
            </Text>
          </View>

          <View style={{ gap: 15 }} className="flex flex-row mt-3">
            <CreditValue value={todayAmount} />
            <TextCard text="Hoje" />
          </View>

          <View style={{ gap: 20 }} className="flex flex-row mt-10 px-10">
            <Button
              title="Depositar"
              variant="PRIMARY"
              onPress={() =>
                router.push({
                  pathname: "/modalMoneyMoviment",
                  params: { operation: "add" },
                })
              }
              width="50%"
              iconName="plus-square"
            />
            <Button
              title="Retirar"
              variant="SECONDARY"
              onPress={() =>
                router.push({
                  pathname: "/modalMoneyMoviment",
                  params: { operation: "remove" },
                })
              }
              width="50%"
              iconName="minus-square"
            />
          </View>
        </View>

        <View
          className="bg-slate-100 min-h-full flex-1 rounded-3xl p-5"
          style={{ gap: 20 }}
        >
          {moviments.map((gasto, index) => (
            <MoneyMovimentCard
              key={index}
              title={gasto.title}
              description={gasto.description}
              value={gasto.value}
              when={gasto.when}
              onDeletePress={() => mutate(gasto.id!)}
            />
          ))}

          {!moviments.length && (
            <View className="h-full items-center justify-center">
              <FontAwesome size={40} name={"dollar"} color={"#94a3b8"} />
              <Text className="text-lg text-slate-400 text-center mt-3">
                Você não tem nenhum movimento cadastrado
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

import React from "react";
import { ScrollView, Text, View } from "react-native";
import { CreditValue } from "../components/CreditValue";
import { TextCard } from "../components/TextCard";
import { Button } from "../components/Button";
import { MoneyMovimentCard } from "../components/MoneyMovimentCard";
import { useRouter } from "expo-router";

const gastos = [
  {
    title: "Sushi",
    description: "Comprei um sushi do takay",
    value: -72.5,
    when: new Date(),
  },
  {
    title: "Salário",
    description: "Recebi meu salário",
    value: 3000,
    when: new Date(),
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <View className="bg-zinc-950 h-full">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 0, flex: 1 }}
      >
        <View className="bg-zinc-950 h-80 justify-center items-center">
          <View className="flex flex-row">
            <Text className="text-white text-4xl font-semibold">R$10.553</Text>
            <Text className="text-zinc-700 text-4xl font-semibold">,00</Text>
          </View>

          <View style={{ gap: 15 }} className="flex flex-row mt-3">
            <CreditValue value={-150.98} />
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
          className="bg-slate-100 flex-1 rounded-3xl p-5"
          style={{ gap: 20 }}
        >
          {gastos.map((gasto, index) => (
            <MoneyMovimentCard
              key={index}
              title={gasto.title}
              description={gasto.description}
              value={gasto.value}
              when={gasto.when}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

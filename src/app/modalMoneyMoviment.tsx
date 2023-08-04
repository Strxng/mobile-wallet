import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useLocalSearchParams } from "expo-router";

interface FormProps {
  title: string;
  description: string;
  value: string;
}

export default function ModalDeposit() {
  const { operation } = useLocalSearchParams();

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      title: "",
      description: "",
      value: "",
    },
  });

  const onSubmit = (data: FormProps) => {
    if (operation === "add") {
      // guardar dinheiro
    } else {
      // remover dinheiro
    }

    console.log({ data, operation });
  };

  return (
    <View
      className="flex-1 justify-center items-center p-4 bg-slate-100"
      style={{ gap: 20 }}
    >
      <Input name="title" control={control} placeholder="Título" required />

      <Input
        name="description"
        control={control}
        placeholder="Descrição"
        required
      />

      <Input
        name="value"
        control={control}
        placeholder="Valor"
        keyboardType="decimal-pad"
        required
      />

      <Button
        title={operation === "add" ? "Depositar" : "Retirar"}
        variant={operation === "add" ? "PRIMARY" : "SECONDARY"}
        iconName={operation === "add" ? "plus-square" : "minus-square"}
        onPress={handleSubmit(onSubmit)}
        width="100%"
      />
    </View>
  );
}

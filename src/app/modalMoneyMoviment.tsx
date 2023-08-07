import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQueryClient } from "react-query";
import { addMoviment } from "../services/moviments";
import { notifyError } from "../utils/toast";

interface FormProps {
  title: string;
  description: string;
  value: string;
}

export default function ModalDeposit() {
  const { operation } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation(addMoviment, {
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

      router.back();
    },
  });

  const { control, handleSubmit, setError } = useForm<FormProps>({
    defaultValues: {
      title: "",
      description: "",
      value: "",
    },
  });

  const onSubmit = (data: FormProps) => {
    const regex = /^[0-9]+,[0-9]+$/;
    const isValid = regex.test(data.value);

    if (!isValid) {
      setError("value", {
        message: "Use vírgula para separar os valores decimais",
      });
      return;
    }

    const amount = Number(data.value.replace(",", "."));

    if (amount < 0) {
      setError("value", {
        message: "O valor deve ser positivo",
      });
    }

    if (operation === "add") {
      mutate({
        ...data,
        value: amount,
        when: new Date(),
      });
    } else if (operation === "remove") {
      mutate({
        ...data,
        value: amount * -1,
        when: new Date(),
      });
    } else {
      notifyError(
        "Operação inválida",
        "A operação que você tentou realizar é inválida"
      );
    }
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
        placeholder="Valor (use ',' para separar os valores decimais)"
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

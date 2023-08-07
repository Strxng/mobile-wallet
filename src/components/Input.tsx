import React from "react";
import { TextInput, KeyboardType, Text } from "react-native";
import { Control, useController } from "react-hook-form";

interface InputProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  required?: boolean;
  keyboardType?: KeyboardType;
}

export const Input = ({
  name,
  control,
  placeholder,
  required,
  keyboardType,
}: InputProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      required: required ? "O campo é obrigatório" : false,
    },
  });

  return (
    <>
      <TextInput
        className="h-14 px-4 rounded-2xl bg-gray-200 w-full"
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />

      {fieldState.error && (
        <Text className="text-start w-full text-red-600">
          {fieldState.error.message}
        </Text>
      )}
    </>
  );
};

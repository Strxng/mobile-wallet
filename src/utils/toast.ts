import Toast from "react-native-toast-message";

export const notifySuccess = (title: string, description: string) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: description,
  });
};

export const notifyError = (title: string, description: string) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: description,
  });
};

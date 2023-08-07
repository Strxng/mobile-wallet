import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeObject = async <ObjectType>(
  key: string,
  value: ObjectType
): Promise<ObjectType> => {
  const stringObject = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringObject);
  return value;
};

export const getObject = async <ObjectType>(
  key: string
): Promise<ObjectType | null> => {
  const stringObject = await AsyncStorage.getItem(key);
  if (!stringObject) {
    return null;
  }

  return JSON.parse(stringObject) as ObjectType;
};

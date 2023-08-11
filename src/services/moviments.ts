import moment from "moment";
import { getObject, storeObject } from "../providers/localStorage";
import { Moviment } from "../types/Moviment";

import "react-native-get-random-values";
import { v4 as uuidV4 } from "uuid";

export const addMoviment = async (moviment: Moviment): Promise<Moviment> => {
  try {
    const id = uuidV4();
    moviment.id = id;

    const moviments = await getObject<Moviment[]>("MOVIMENTS");
    if (!moviments) {
      await storeObject("MOVIMENTS", [moviment]);
      return moviment;
    }

    const allMoviments = [...moviments!, moviment];
    await storeObject("MOVIMENTS", allMoviments);
    return moviment;
  } catch (e) {
    throw new Error("Não foi possível fazer a movimentação");
  }
};

export const deleteMoviment = async (movimentId: string): Promise<void> => {
  const moviments = await getObject<Moviment[]>("MOVIMENTS");
  if (!moviments) {
    throw new Error("Falha ao deletar o movimento");
  }

  const newMoviments = moviments.filter((mov) => mov.id !== movimentId);
  await storeObject("MOVIMENTS", newMoviments);
};

export const getAllMoviments = async (): Promise<Moviment[]> => {
  const moviments = (await getObject<Moviment[]>("MOVIMENTS")) || [];
  const orderedMoviments = moviments?.sort((a, b) => {
    return new Date(b.when).getTime() - new Date(a.when).getTime();
  });

  return orderedMoviments;
};

export const getTodayAmount = async (): Promise<number> => {
  const moviments = await getObject<Moviment[]>("MOVIMENTS");
  if (!moviments) return 0;

  const todayMoviments = moviments!.filter((m) => {
    const today = new Date();

    if (
      today.getFullYear() === moment(m.when).toDate().getFullYear() &&
      today.getMonth() === moment(m.when).toDate().getMonth() &&
      today.getDate() === moment(m.when).toDate().getDate()
    ) {
      return true;
    } else {
      return false;
    }
  });

  const amount = todayMoviments!
    .map((m) => m.value)
    .reduce((partial, item) => partial + item, 0);

  return amount;
};

export const getAmount = async (): Promise<number> => {
  const moviments = await getObject<Moviment[]>("MOVIMENTS");
  if (!moviments) return 0;

  const amount = moviments!
    .map((m) => m.value)
    .reduce((partial, item) => partial + item, 0);

  return amount;
};

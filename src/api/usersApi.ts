export interface TodoRequest {
  title?: string;
  isDone?: boolean; // изменение статуса задачи происходит через этот флаг
}

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export const fetchData = async () => {
  let result;
  try {
    const responce = await fetch("https://easydev.club/api/v2/todos");
    result = await responce.json();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
  return await result;
};

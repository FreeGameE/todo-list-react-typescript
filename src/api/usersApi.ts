import axios from "axios";

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

export const getData = async () => {
  let result;
  try {
    const response = await axios.get("https://easydev.club/api/v2/todos");
    result = response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
  return await result;
};

export const updateData = async (updatedData?: TodoRequest) => {
  try {
    await axios.post("https://easydev.club/api/v2/todos", updatedData, {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });

    // window.dispatchEvent(new Event("changeListUpdated")); //!
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
  getData();
};

export const changeData = async (id: number, changedData?: TodoRequest) => {
  try {
    await axios.put(`https://easydev.club/api/v2/todos/${id}`, changedData, {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
  getData();
};

export const deleteData = async (id: number) => {
  try {
    const response = await axios.delete(`https://easydev.club/api/v2/todos/${id}`, {
    });
    window.dispatchEvent(new Event("todoCountUpdated"));
    window.dispatchEvent(new Event("todoListUpdated"));
    if (response.status !== 200) {
      alert("Ошибка при удалении данных");
    }
  } catch (error) {
    console.error("Ошибка при удалении данных:", error);
  }
};

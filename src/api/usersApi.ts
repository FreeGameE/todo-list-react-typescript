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

const api = axios.create({
  baseURL: "https://easydev.club/api/v2",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export const getData = async (status: "all" | "completed" | "inWork") => {
  try {
    const response = await api.get("/todos", {
      params: { filter: status },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export const getTodoById = async (id: number) => {
  try {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    // console.error("Ошибка при получении todo:", error);
  }
};

export const updateData = async (updatedData?: TodoRequest) => {
  try {
    await api.post("todos", updatedData);

    // window.dispatchEvent(new Event("changeListUpdated")); //!
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
  getData("all");
};

export const changeData = async (id: number, changedData?: TodoRequest) => {
  try {
    await api.put(`/todos/${id}`, changedData);
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
  getData("all");
};

export const deleteData = async (id: number) => {
  try {
    const response = await api.delete(`/todos/${id}`);
    window.dispatchEvent(new Event("todoCountUpdated"));
    window.dispatchEvent(new Event("todoListUpdated"));
    if (response.status !== 200) {
      alert("Ошибка при удалении данных");
    }
  } catch (error) {
    console.error("Ошибка при удалении данных:", error);
  }
};

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

export const updateData = async (updatedData?: TodoRequest) => {
  try {
    await fetch("https://easydev.club/api/v2/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(updatedData),
    });

    // window.dispatchEvent(new Event("changeListUpdated")); //!
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
  fetchData();
};

export const changeData = async (id: number, changedData?: TodoRequest) => {
  try {
    const responce = await fetch(`https://easydev.club/api/v2/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(changedData),
    });
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
  fetchData();
};

export const deleteData = async (id: number) => {
  try {
    const responce = await fetch(`https://easydev.club/api/v2/todos/${id}`, {
      method: "DELETE",
    });
    window.dispatchEvent(new Event("todoCountUpdated"));
    window.dispatchEvent(new Event("todoListUpdated"))
    if (!responce.ok) {
      alert("Ошибка при удалении данных");
    }
  } catch (error) {
    console.error("Ошибка при удалении данных:", error);
  }
};

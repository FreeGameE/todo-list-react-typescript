import TodoItem from "../TodoItem/TodoItem";
import { fetchData, Todo } from "../../api/usersApi";
import { useEffect, useState } from "react";

type FiltredTodoStatus = {
  filtredTodoStatus: string;
};

const TodoList: React.FC<FiltredTodoStatus> = ({ filtredTodoStatus }) => {
  const [todosData, setTodosData] = useState<Todo[]>([]);
  const [filteredTodosData, setFilteredTodosData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect!(() => {
    const loadTodoList = async () => {
      try {
        const responce = await fetchData();
        setTodosData(responce.data);
        setFilteredTodosData(todosData.filter((data) => data.isDone === false));
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
      }
    };
    loadTodoList();
  }, []);

  useEffect(() => {
    const filtrationTodosData = (filtredTodoStatus: string) => {
      if (filtredTodoStatus === "all") {
        setFilteredTodosData(todosData);
      }
      if (filtredTodoStatus === "inWork") {
        setFilteredTodosData(todosData.filter((data) => data.isDone === false));
      }
      if (filtredTodoStatus === "completed") {
        setFilteredTodosData(todosData.filter((data) => data.isDone === true));
      }
    };

    filtrationTodosData(filtredTodoStatus);
  }, [todosData, filtredTodoStatus]);

  return (
    <div>
      {loading ? <p style={{ textAlign: "center" }}>Загрузка...</p> : undefined}
      {filteredTodosData.map((data) => (
        <TodoItem key={data.id} id={data.id} />
      ))}
    </div>
  );
};

export default TodoList;

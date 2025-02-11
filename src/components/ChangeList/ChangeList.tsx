import { useEffect, useState } from "react";
import { fetchData, TodoInfo } from "../../api/usersApi";
import "./ChangeList.css";

type SetFiltredTodoStatus = {
  setFiltredTodoStatus: (value: string) => void;
  filtredTodoStatus: string;
};

const ChangeList: React.FC<SetFiltredTodoStatus> = ({
  setFiltredTodoStatus, filtredTodoStatus
}) => {
  const [todosInfo, setTodosInfo] = useState<TodoInfo>();

  useEffect!(() => {
    const loadTodoList = async () => {
      try {
        const responce = await fetchData();
        setTodosInfo(responce.info);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    loadTodoList();
  }, []);

  return (
    <div className="todo-status">
      <button
        onClick={() => setFiltredTodoStatus("all")}
        className={filtredTodoStatus === "all" ? "active" : undefined}
      >
        Все({todosInfo?.all})
      </button>
      <button
        onClick={() => setFiltredTodoStatus("inWork")}
        className={filtredTodoStatus === "inWork" ? "active" : undefined}
      >
        В работе({todosInfo?.inWork})
      </button>
      <button
        onClick={() => setFiltredTodoStatus("completed")}
        className={filtredTodoStatus === "completed" ? "active" : undefined}
      >
        Завершённые({todosInfo?.completed})
      </button>
    </div>
  );
};

export default ChangeList;

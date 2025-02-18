import { useEffect, useState } from "react";
import { fetchData, TodoInfo } from "../../api/usersApi";
import "./ChangeList.css";

type SetFiltredTodoStatus = {
  setFilteredTodoStatus: (value: string) => void;
  filteredTodoStatus: string;
};

const ChangeList: React.FC<SetFiltredTodoStatus> = ({
  setFilteredTodoStatus, filteredTodoStatus
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
    window.addEventListener("todoCountUpdated", loadTodoList); //!
    return () => {
      window.removeEventListener("todoCountUpdated", loadTodoList);
    };
  }, [filteredTodoStatus]);

  return (
    <div className="todo-status">
      <button
        onClick={() => (setFilteredTodoStatus("all"))}
        className={filteredTodoStatus === "all" ? "active" : undefined}
      >
        Все({todosInfo?.all})
      </button>
      <button
        onClick={() => setFilteredTodoStatus("inWork")}
        className={filteredTodoStatus === "inWork" ? "active" : undefined}
      >
        В работе({todosInfo?.inWork})
      </button>
      <button
        onClick={() => setFilteredTodoStatus("completed")}
        className={filteredTodoStatus === "completed" ? "active" : undefined}
      >
        Завершённые({todosInfo?.completed})
      </button>
    </div>
  );
};

export default ChangeList;

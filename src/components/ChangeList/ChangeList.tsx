import { useEffect, useState } from "react";
import { fetchData, TodoInfo } from "../../api/usersApi";
import "./ChangeList.css";
import { Button } from 'antd';

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
        const response = await fetchData();
        setTodosInfo(response.info);
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
    <div className="todo-status" style={{ marginTop: "0"}}>
      <Button
        onClick={() => (setFilteredTodoStatus("all"))}
        className={filteredTodoStatus === "all" ? "active" : undefined}
      >
        Все({todosInfo?.all})
      </Button>
      <Button
        onClick={() => setFilteredTodoStatus("inWork")}
        className={filteredTodoStatus === "inWork" ? "active" : undefined}
      >
        В работе({todosInfo?.inWork})
      </Button>
      <Button
        onClick={() => setFilteredTodoStatus("completed")}
        className={filteredTodoStatus === "completed" ? "active" : undefined}
      >
        Завершённые({todosInfo?.completed})
      </Button>
    </div>
  );
};

export default ChangeList;

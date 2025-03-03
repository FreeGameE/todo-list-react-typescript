import { useEffect, useState } from "react";
import { getData, TodoInfo } from "../../api/usersApi";
import { Button } from "antd";
import "./ChangeList.css";

type SetFiltredTodoStatus = {
  setFilteredTodoStatus: (value: string) => void;
  filteredTodoStatus: any;
};

const ChangeList: React.FC<SetFiltredTodoStatus> = ({
  setFilteredTodoStatus,
  filteredTodoStatus,
}) => {
  const [todosInfo, setTodosInfo] = useState<TodoInfo>();

  const loadFilterFromStorage = () => {
    const savedFilter = localStorage.getItem("todoFilter");
    return savedFilter ? savedFilter : "all";
  };

  useEffect(() => {
    const loadTodoList = async () => {
      try {
        const response = await getData(filteredTodoStatus);
        setTodosInfo(response!.info);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    loadTodoList();
    window.addEventListener("todoCountUpdated", loadTodoList);
    return () => {
      window.removeEventListener("todoCountUpdated", loadTodoList);
    };
  }, [filteredTodoStatus]);

  useEffect!(() => {
    const savedFilter = loadFilterFromStorage();
    setFilteredTodoStatus(savedFilter);
  }, []);

  const handleFilterChange = (filter: string) => {
    setFilteredTodoStatus(filter);
    localStorage.setItem("todoFilter", filter);
  };

  return (
    <div className="todo-status" style={{ marginTop: "0" }}>
      <Button
        onClick={() => handleFilterChange("all")}
        className={filteredTodoStatus === "all" ? "active" : undefined}
      >
        Все({todosInfo?.all})
      </Button>
      <Button
        onClick={() => handleFilterChange("inWork")}
        className={filteredTodoStatus === "inWork" ? "active" : undefined}
      >
        В работе({todosInfo?.inWork})
      </Button>
      <Button
        onClick={() => handleFilterChange("completed")}
        className={filteredTodoStatus === "completed" ? "active" : undefined}
      >
        Завершённые({todosInfo?.completed})
      </Button>
    </div>
  );
};

export default ChangeList;

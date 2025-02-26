import TodoItem from "../TodoItem/TodoItem";
import { getData, Todo } from "../../api/usersApi";
import { useEffect, useState } from "react";

type FilteredTodoStatus = {
  filteredTodoStatus: string;
};

const TodoList: React.FC<FilteredTodoStatus> = ({ filteredTodoStatus }) => {
  const [todosData, setTodosData] = useState<Todo[]>([]);
  const [filteredTodosData, setFilteredTodosData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [count, setCount] = useState<number>(0);

  useEffect!(() => {
    setLoading(true);
    const loadTodoList = async () => {
      try {
        const response = await getData();
        const newData: Todo[] = response.data;
    
        setTodosData((prevTodos) => {
          const updatedTodos = newData.map((newTodo: Todo) => {
            const existingTodo = prevTodos.find((todo) => todo.id === newTodo.id);
            return existingTodo ? { ...existingTodo, ...newTodo } : newTodo;
          });
          return updatedTodos;
        });
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTodoList();

    window.addEventListener("todoListUpdated", loadTodoList); //!
    return () => {
      window.removeEventListener("todoListUpdated", loadTodoList);
    };
  }, []);

  useEffect(() => {
    const filtrationTodosData = (filtredTodoStatus: string) => {
      if (filtredTodoStatus === "all") {
        setFilteredTodosData(todosData);
      }
      if (filtredTodoStatus === "inWork") {
        setFilteredTodosData(todosData.filter((data) => !data.isDone));
      }
      if (filtredTodoStatus === "completed") {
        setFilteredTodosData(todosData.filter((data) => data.isDone));
      }
    };

    filtrationTodosData(filteredTodoStatus);
  }, [todosData, filteredTodoStatus]);

  useEffect(() => {
    // функция, которая будет вызываться при изменениях в DOM
    const monitorСhanges = (mutations: MutationRecord[]) => {
      const elements = document.querySelectorAll(".todo-item");
      setCount(elements.length);
    };

    const observer = new MutationObserver(monitorСhanges);

    const config = {
      childList: true, //дочерние элементы
      subtree: true, // поддеревья?
    };

    observer.observe(document.body, config);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect!(() => {
    if (count === filteredTodosData.length && count > 0) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
      window.dispatchEvent(new Event("todoListUpdated"));
      window.dispatchEvent(new Event("todoCountUpdated"));
    }, 5000);
    return () => clearInterval(interval); // сбросить счётчик
  }, []);

  return (
    <div>
      {/* <button onClick={() => setVisibility(true)}>on</button>
      <button onClick={() => setVisibility(false)}>off</button> */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Загрузка...</p>
      ) : (
        filteredTodosData.map((data) => {
          return (
            <div
              key={`div${data.id}`}
              style={visibility ? { display: "block" } : { display: "block" }}
            >
              <TodoItem key={data.id} id={data.id} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodoList;

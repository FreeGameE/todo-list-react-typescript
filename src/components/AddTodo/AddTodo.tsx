import "./AddTodo.css";
import { updateData, TodoRequest } from "../../api/usersApi";
import { useState } from "react";

const AddTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<TodoRequest>({
    isDone: false,
    title: "",
  });

  const addingTodo = async () => {
    if (newTodo.title && newTodo.title?.length >= 2) {
      try {
        const responce = await updateData(newTodo);
        setNewTodo({
          title: "",
        });
        window.dispatchEvent(new Event("todoListUpdated")); //!
        window.dispatchEvent(new Event("todoCountUpdated"))
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      }
    } else alert("Текст должен быть от 2 до 64 символов");
  };

  return (
    <form
      className="add-todo"
      onSubmit={(event) => {
        event.preventDefault();
        addingTodo();
        console.log(newTodo.title?.length);
      }}
    >
      <input
        required
        placeholder="Ваша задача"
        maxLength={64}
        value={newTodo.title}
        onChange={(event) => {
          setNewTodo({
            title: event.target.value,
          });
        }}
      />
      <button>Добавить</button>
    </form>
  );
};

export default AddTodo;

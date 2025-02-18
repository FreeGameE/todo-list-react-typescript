import { useEffect, useState } from "react";
import {
  fetchData,
  Todo,
  changeData,
  TodoRequest,
  deleteData,
} from "../../api/usersApi";
import "./TodoItem.css";

type Id = {
  id: number;
};

const TodoItem: React.FC<Id> = ({ id }) => {
  const [currentTodoData, setCurrentTodoData] = useState<Todo>();
  const [newTodoStatus, setNewTodoStatus] = useState<TodoRequest>({
    isDone: currentTodoData?.isDone,
  });
  const [newTodoTitle, setNewTodoTitle] = useState<TodoRequest>({
    title: currentTodoData?.title,
  });
  const [editingStatus, setEditingStatus] = useState<boolean>(false);

  useEffect!(() => {
    const loadTodoList = async () => {
      try {
        const response = await fetchData();
        const todo = response.data.find((todo: Todo) => todo.id === id);
        if (todo) {
          setCurrentTodoData(todo);
          setNewTodoStatus({
            isDone: todo.isDone,
          });
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        window.dispatchEvent(new Event("visibilityChange"));
      }
    };
    loadTodoList();
  }, []);

  const changingTodoTitle = async () => {
    try {
      await changeData(currentTodoData!.id, newTodoTitle);
      window.dispatchEvent(new Event("todoListUpdated"));
      window.dispatchEvent(new Event("todoCountUpdated"));
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const changingTodoStatus = async () => {
    setNewTodoStatus({
      isDone: !newTodoStatus.isDone,
    });
    try {
      await changeData(currentTodoData!.id, newTodoStatus);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  if (!currentTodoData || !newTodoStatus) {
    return <div></div>;
  }

  return (
    <div className="todo-item">
      <section className="left-side">
        <img
          src={!currentTodoData?.isDone ? "/empty-circle.png" : "/passed.png"}
          alt="incomplete"
          style={{
            width: "1rem",
            height: "1rem",
            marginRight: "0.6rem",
          }}
          onClick={() => {
            changingTodoStatus();
            window.dispatchEvent(new Event("todoListUpdated"));
            window.dispatchEvent(new Event("todoListUpdated"));
            window.dispatchEvent(new Event("todoCountUpdated"));
          }}
          onMouseDown={changingTodoStatus}
        />
        {editingStatus ? (
          <>
            <form id={`change${id}`}>
              <textarea
                rows={5}
                maxLength={64}
                required
                onChange={(event) =>
                  setNewTodoTitle({ title: event?.target.value })
                }
                value={newTodoTitle?.title}
              />
            </form>
          </>
        ) : (
          <p
            className="todo-item-p"
            style={
              currentTodoData?.isDone
                ? { textDecoration: "line-through", color: "dimgray" }
                : undefined
            }
          >
            {currentTodoData?.title}
          </p>
        )}
      </section>
      <section className="right-side">
        {editingStatus ? (
          <>
            {/* //* кнопка отменить изменения */}
            <button
              type="button"
              className="cancel-button"
              onClick={() => setEditingStatus(false)}
            >
              <img src="/cancel.png" alt="cancel" />
            </button>
            {/* кнопка принять изменения */}
            <button
              type="button"
              form={`change${id}`}
              className="accept-button"
              onClick={() =>
                newTodoTitle!.title!.length >= 2
                  ? (changingTodoTitle(), setEditingStatus(false))
                  : // window.dispatchEvent(new Event("todoListUpdated")))
                    alert("Текст должен быть от 2 до 64 символов")
              }
            >
              <img src="/accept.png" alt="accept" />
            </button>
          </>
        ) : (
          <>
            {/* //$ кнопка редактировать */}
            <button
              type="button"
              className="edit-button"
              onClick={() => {
                setEditingStatus(true);
                setNewTodoTitle({ title: currentTodoData.title });
              }}
            >
              <img src="/edit.png" alt="edit" />
            </button>
          </>
        )}
        {/* //@ кнопка удалить todo */}
        <button
          type="button"
          onClick={() => deleteData(id)}
          className={
            !editingStatus ? "delete-button" : "delete-button unactive"
          }
        >
          <img src="/delete.png" alt="delete" />
        </button>
      </section>
    </div>
  );
};

export default TodoItem;

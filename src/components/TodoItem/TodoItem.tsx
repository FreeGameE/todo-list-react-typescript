import { useEffect, useState } from "react";
import { fetchData, Todo } from "../../api/usersApi";
import "./TodoItem.css";

type Id = {
  id: number;
};

const TodoItem: React.FC<Id> = ({ id }) => {
  const [currentTodoData, setCurrentTodoData] = useState<Todo>();
  let activeInputId = false;
  let editingStatus = false;

  useEffect!(() => {
    const loadTodoList = async () => {
      try {
        const responce = await fetchData();
        setCurrentTodoData(responce.data.find((todo: Todo) => todo.id === id));
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    loadTodoList();
  }, []);

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
        />
        {activeInputId ? (
          <>
            <form>
              <textarea rows={5} maxLength={64} required />
            </form>
          </>
        ) : (
          <p
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
        {activeInputId ? (
          <>
            {/* //* кнопка отменить изменения */}
            <button type="button" className="cancel-button">
              <img src="/cancel.png" alt="cancel" />
            </button>
            {/* кнопка принять изменения */}
            <button type="button" className="accept-button">
              <img src="/accept.png" alt="accept" />
            </button>
          </>
        ) : (
          <>
            {/* //$ кнопка редактировать */}
            <button type="button" className="edit-button">
              <img src="/edit.png" alt="edit" />
            </button>
          </>
        )}
        {/* //@ кнопка удалить todo */}
        <button
          type="button"
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

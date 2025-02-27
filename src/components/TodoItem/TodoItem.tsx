import { useEffect, useState } from "react";
import {
  getData,
  Todo,
  changeData,
  TodoRequest,
  deleteData,
} from "../../api/usersApi";
import "./TodoItem.css";
import { Button, Form } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";

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
    const loadTodoItem = async () => {
      try {
        const response = await getData();
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
    loadTodoItem();

    window.addEventListener("todoItemUpdated", loadTodoItem); //!
    return () => {
      window.removeEventListener("todoItemUpdated", loadTodoItem);
    };
  }, []);

  const changingTodoTitle = async () => {
    try {
      setEditingStatus(false);
      setNewTodoTitle({ title: newTodoTitle.title?.trim() });
      await changeData(currentTodoData!.id, newTodoTitle);
      window.dispatchEvent(new Event("todoListUpdated"));
      window.dispatchEvent(new Event("todoCountUpdated"));
      window.dispatchEvent(new Event("todoItemUpdated"));
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
      
      window.dispatchEvent(new Event("todoListUpdated"));
      window.dispatchEvent(new Event("todoCountUpdated"));
      window.dispatchEvent(new Event("todoItemUpdated"));
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <>
      {false ? (
        <div></div>
      ) : (
        <div className="todo-item">
          <section className="left-side">
            <img
              src={
                !currentTodoData?.isDone ? "/empty-circle.png" : "/passed.png"
              }
              alt="incomplete"
              style={{
                width: "1rem",
                height: "1rem",
                marginRight: "0.6rem",
              }}
              onClick={() => {
                changingTodoStatus();
                window.dispatchEvent(new Event("todoListUpdated"));
                // window.dispatchEvent(new Event("todoListUpdated"));
                window.dispatchEvent(new Event("todoCountUpdated"));
              }}
              onMouseDown={changingTodoStatus}
            />
            {editingStatus ? (
              <>
                <Form id={`change${id}`}>
                  <Form.Item
                    initialValue={newTodoTitle?.title}
                    name="title"
                    rules={[
                      { required: true, message: "Введите текст задачи" },
                      {
                        min: 2,
                        message:
                          "Текст задачи должен содержать минимум 2 символа",
                      },
                    ]}
                    style={{ marginBottom: "0", width: "12rem" }}
                  >
                    <textarea
                      rows={5}
                      maxLength={64}
                      required
                      onChange={(event) =>
                        setNewTodoTitle({ title: event?.target.value })
                      }
                      value={newTodoTitle?.title}
                      style={{
                        resize: "none",
                        margin: "16px 0px",
                      }}
                    />
                  </Form.Item>
                </Form>
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
                <Button
                  className="cancel-Button"
                  onClick={() => setEditingStatus(false)}
                >
                  {/* <img src="/cancel.png" alt="cancel" /> */}
                  <CloseOutlined />
                </Button>
                {/* кнопка принять изменения */}
                <Button
                  form={`change${id}`}
                  className="accept-Button"
                  style={{ marginLeft: "0.3rem" }}
                  onClick={() =>
                    newTodoTitle!.title!.trim().length >= 2
                      ? (changingTodoTitle(), setEditingStatus(false))
                      : // window.dispatchEvent(new Event("todoListUpdated")))
                        alert("Текст должен быть от 2 до 64 символов")
                  }
                >
                  {/* <img src="/accept.png" alt="accept" /> */}
                  <CheckOutlined />
                </Button>
              </>
            ) : (
              <>
                {/* //$ кнопка редактировать */}

                <Button
                  className="edit-Button"
                  onClick={() => {
                    setEditingStatus(true);
                    setNewTodoTitle({ title: currentTodoData!.title.trim() });
                  }}
                >
                  {/* <img src="/edit.png" alt="edit" /> */}
                  <FormOutlined />
                </Button>
              </>
            )}
            {/* //@ кнопка удалить todo */}
            <Button
              style={{ marginLeft: "0.3rem" }}
              onClick={() => deleteData(id)}
              className={
                !editingStatus ? "delete-Button" : "delete-Button unactive"
              }
            >
              {/* <img src="/delete.png" alt="delete" /> */}
              <DeleteOutlined />
            </Button>
          </section>
        </div>
      )}
    </>
  );
};

export default TodoItem;

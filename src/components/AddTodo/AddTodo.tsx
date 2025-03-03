import "./AddTodo.css";
import { updateData, TodoRequest } from "../../api/usersApi";
import { useState } from "react";
import { Button, Input, Form } from "antd";

const AddTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<TodoRequest>({
    isDone: false,
    title: "",
  });
  const [form] = Form.useForm();

  const addingTodo = async () => {
    if (newTodo.title && newTodo.title?.trim().length >= 2) {
      setNewTodo({
        title: newTodo.title.trim(),
      });
      try {
        await updateData(newTodo);
        setNewTodo({
          title: "",
        });
        window.dispatchEvent(new Event("todoListUpdated")); //!
        window.dispatchEvent(new Event("todoCountUpdated"));
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      }
    } else alert("Текст должен быть от 2 до 64 символов");
  };

  return (
    <Form
    style={{marginTop: "1rem"}}
      form={form}
      className="add-todo"
      onFinish={() => {
        addingTodo();
        console.log(newTodo.title?.length);
        console.log(newTodo.title);
        form.resetFields();
      }}
    >
      <Form.Item
        name="title"
        rules={[
          { required: true, message: "Введите текст задачи" },
          {
            min: 2,
            message: "Текст задачи должен содержать минимум 2 символа",
          },
          {
            max: 64,
            message: "Текст задачи должен содержать максимум 64 символа",
          },
        ]}
        style={{ marginBottom: "0", width: "12rem" }}
      >
        <Input
          placeholder="Ваша задача"
          // maxLength={64}
          value={newTodo.title}
          onChange={(event) => {
            setNewTodo({
              title: event.target.value,
            });
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ paddingInline: "2rem", paddingBlock: "1.1rem", marginBottom: "0" }}
          type="primary"
          htmlType="submit"
        >
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTodo;

import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import ChangeList from "../ChangeList/ChangeList";
import TodoList from "../TodoList/TodoList";
import "./TodoListPage.css";

const TodoListPage: React.FC = () => {
  const [filtredTodoStatus, setFiltredTodoStatus] = useState("all");

  

  return (
    <div className="todo-list-page">
      <header>СПИСОК ЗАДАЧ</header>
      <section className="main-board">
        <AddTodo />
        <ChangeList setFiltredTodoStatus={setFiltredTodoStatus} filtredTodoStatus={filtredTodoStatus} />
        <TodoList filtredTodoStatus={filtredTodoStatus} />
      </section>
    </div>
  );
};

export default TodoListPage;

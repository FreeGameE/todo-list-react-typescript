import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import ChangeList from "../ChangeList/ChangeList";
import TodoList from "../TodoList/TodoList";
import "./TodoListPage.css";

const TodoListPage: React.FC = () => {
  const [filteredTodoStatus, setFilteredTodoStatus] = useState("all");
  
  

  return (
    <div className="todo-list-page">
      <header>СПИСОК ЗАДАЧ</header>
      <section className="main-board">
        <AddTodo />
        <ChangeList setFilteredTodoStatus={setFilteredTodoStatus} filteredTodoStatus={filteredTodoStatus} />
        <TodoList filteredTodoStatus={filteredTodoStatus} />
        
      </section>
    </div>
  );
};

export default TodoListPage;

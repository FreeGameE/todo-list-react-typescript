import "./AddTodo.css";

const AddTodo: React.FC = () => {
  return (
    <form
      className="add-todo"
      onSubmit={(event) => {
      event.preventDefault();
      }}
    >
      <input placeholder="Ваша задача" />
      <button>Добавить</button>
    </form>
  );
};

export default AddTodo;

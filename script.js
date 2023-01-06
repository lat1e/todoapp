const { useState, useEffect } = React;

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [nextId, setNextId] = useState(1);
  const [todosLoaded, setTodosLoaded] = useState(false);

  const addTodo = (todoContent) => {
    const todo = {
      id: nextId,
      content: todoContent,
      completed: false,
    };
    setNextId((nextId) => nextId + 1);
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const updateCompleted = (id, completed) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const deleteTodoItem = (id) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  // save todos and nextId to localStorage
  useEffect(() => {
    if (todosLoaded === true) {
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("nextId", JSON.stringify(nextId));
    }
    console.log("store data");
  }, [todos, nextId]);

  // load todos and nextId from localStorage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    const nextId = JSON.parse(localStorage.getItem("nextId"));
    if (todos) {
      setTodos(todos);
    }
    if (nextId) {
      setNextId(nextId);
    }
    setTodosLoaded(true);
  }, []);

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="할일"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => addTodo(newTodo)}
        >
          등록
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>완료</th>
            <th>할일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateCompleted(todo.id, !todo.completed)}
                />
              </td>
              <td style={{ color: todo.completed ? "red" : "black" }}>
                {todo.content}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodoItem(todo.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("todo-app")).render(<TodoApp />);

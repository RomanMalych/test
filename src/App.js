import React, { useEffect, useCallback } from "react";
import TodoList from "./todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./modal/Modal";
import './app.css';

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./todo/AddTodo"));
      }, 2000);
    })
);

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
    const todos = await response.json();
    
    setTimeout(() => {
      setTodos(todos);
      setLoading(false);
    }, 2000);
  }, []);

  const toggleTodo = useCallback(
    (id) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
  
      setTodos(updatedTodos);
    },
    [todos, setTodos],
  )

  const removeTodo = (id) => {
    const filtredTodos = todos.filter((todo) => todo.id !== id)
    setTodos(filtredTodos);
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <Modal />
        <h1> Todo </h1>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {
          todos?.length ? 
          <TodoList todos={todos} onToggle={toggleTodo}></TodoList> :
          loading ? 
            null : 
            <p>No Todos</p>
        }
      </div>
    </Context.Provider>
  );
}

export default App;

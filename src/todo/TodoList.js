import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";



function TodoList({ todos, onToggle }) {
  return (
    <ul className="task-todo" >
      {todos.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            index={index}
            onChange={onToggle}
          ></TodoItem>
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoList;

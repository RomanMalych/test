import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";
import "./TodoItem.css";

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);

  return (
    <li className="liTask">
      <span className={todo.completed ? "done" : ""}>
        <input
          type="checkbox"
          checked={todo.completed}
          className="title-input"
          onChange={() => onChange(todo.id)}
        ></input>
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>
      <button className="removeTaskBtn" onClick={() => removeTodo(todo.id)}>
        &times;
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;

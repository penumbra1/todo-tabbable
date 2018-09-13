import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const TodoList = props => (
  <ul className="Todo-list">
    {props.todos.map(todo => (
      <TodoItem
        key={todo.id}
        {...todo}
        handleToggle={props.handleToggle}
        handleRemove={props.handleRemove}
        showAll={props.showAll}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  showAll: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default TodoList;

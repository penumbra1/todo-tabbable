import React from "react";
import PropTypes from "prop-types";

const TodoItem = props => {
  // Partial application: bind the function to props.id argument.
  // It will be executed with props.id automatically
  // so there is no need to create an anonymous function in onChange
  const handleToggle = props.handleToggle.bind(null, props.id);

  const handleRemove = props.handleRemove.bind(null, props.id);

  const htmlId = `toggle-todo-${props.id}`;

  return (
    <li>
      <label htmlFor={htmlId}>
        <input
          type="checkbox"
          id={htmlId}
          name={htmlId}
          value={props.name}
          checked={props.isComplete}
          onChange={handleToggle}
        />
        {props.name}
        <button
          className="removeItem"
          onClick={handleRemove}
          aria-label={`Remove item ${props.name}`}
        >
          X
        </button>
      </label>
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default TodoItem;

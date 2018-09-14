import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as Icon } from "../../assets/trash.svg";

const TodoItem = props => {
  // Partial application: bind the function to props.id argument.
  // It will be executed with props.id automatically
  // so there is no need to create an anonymous function in onChange
  const handleToggle = props.handleToggle.bind(null, props.id);

  const handleRemove = props.handleRemove.bind(null, props.id);

  const htmlId = `toggle-todo-${props.id}`;

  return (
    <li>
      <label
        htmlFor={htmlId}
        className={props.showAll && !props.isComplete ? "active" : ""}
      >
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
          className="removeButton"
          onClick={handleRemove}
          aria-label={`Remove item ${props.name}`}
        >
          <Icon />
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
  handleRemove: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired
};

export default TodoItem;

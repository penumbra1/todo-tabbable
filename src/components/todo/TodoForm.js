import React from "react";
import PropTypes from "prop-types";

const TodoForm = props => (
  <form action="" onSubmit={props.handleSubmit}>
    <input
      type="text"
      value={props.currentTodo}
      onChange={props.handleInputChange}
    />
  </form>
);

TodoForm.propTypes = {
  currentTodo: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default TodoForm;

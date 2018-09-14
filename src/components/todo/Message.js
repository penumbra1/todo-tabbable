import React from "react";
import PropTypes from "prop-types";

const Message = props => (
  <p className="message">
    {props.error && <span className="error">{props.error}</span>}
    {props.message && <span className="success">{props.message}</span>}
  </p>
);

Message.propTypes = {
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Message;

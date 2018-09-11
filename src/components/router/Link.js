import React, { Component } from "react";
import { Consumer } from "./";
import PropTypes from "prop-types";

export default class Link extends Component {
  render() {
    return (
      <Consumer>
        {({ route, linkHandler }) => (
          <a
            href={this.props.to}
            role="button"
            tabIndex="0"
            className={route === this.props.to ? "active" : ""}
            onClick={e => {
              e.preventDefault();
              linkHandler(this.props.to);
            }}
          >
            {this.props.children}
          </a>
        )}
      </Consumer>
    );
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

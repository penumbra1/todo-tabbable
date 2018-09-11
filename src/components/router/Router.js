import React, { Component } from "react";
import { Provider } from "./RouterContext";
import PropTypes from "prop-types";

const getCurrentPath = () => {
  const path = document.location.pathname;
  return path.substring(path.lastIndexOf("/"));
};

export default class Router extends Component {
  state = {
    route: getCurrentPath()
  };

  componentDidMount() {
    window.onpopstate = () => {
      this.setState({ route: getCurrentPath() });
    };
  }

  handleLinkClick = route => {
    window.history.pushState(null, "", route);
    this.setState({ route });
  };

  render() {
    return (
      <Provider
        value={{ route: this.state.route, linkHandler: this.handleLinkClick }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

Router.propTypes = {
  children: PropTypes.node
};

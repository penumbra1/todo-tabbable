import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { TodoForm, TodoList, Footer } from "./components/todo";
import { Consumer } from "./components/router";
import {
  addTodo,
  generateId,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
} from "./lib/todoHelpers";
import { pipe } from "./lib/utils";
import {
  loadTodos,
  createTodo,
  saveTodo,
  destroyTodo
} from "./lib/todoService";

class App extends Component {
  state = {
    todos: [],
    currentTodo: "",
    error: "",
    message: ""
  };

  // AbortController to cancel ongoing fetch of todos when App unmounts
  abortController = new window.AbortController();

  componentDidMount() {
    loadTodos(this.abortController.signal).then(
      todos => !this.abortController.signal.aborted && this.setState({ todos })
    );
  }

  componentWillUnmount() {
    // Cancel fetch of todos
    this.abortController.abort();
  }

  handleInputChange = e => {
    this.setState({ currentTodo: e.target.value });
  };

  showTempMessage = message => {
    this.setState({ message });
    setTimeout(() => this.setState({ message: "" }), 2500);
  };

  handleSubmit = e => {
    e.preventDefault();

    const newTodo = {
      id: generateId(),
      name: this.state.currentTodo,
      isComplete: false
    };

    const updatedTodos = addTodo(this.state.todos, newTodo);

    // Optimistic UI update
    this.setState({ todos: updatedTodos, currentTodo: "", error: "" });

    createTodo(newTodo).then(() => this.showTempMessage("Todo added"));
  };

  handleEmptySubmit = e => {
    e.preventDefault();
    this.setState({ error: "Please supply a name" });
  };

  handleToggle = id => {
    // Find todo, get its toggled copy
    const getToggledTodo = pipe(
      findById,
      toggleTodo
    );
    const updated = getToggledTodo(this.state.todos, id);

    const updatedTodos = updateTodo(this.state.todos, updated);

    // Optimistic UI update
    this.setState({
      todos: updatedTodos
    });

    saveTodo(updated).then(() => this.showTempMessage("Todo updated"));
  };

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({
      todos: updatedTodos
    });

    destroyTodo(id).then(() => this.showTempMessage("Todo removed"));
  };

  render() {
    const submitHandler = this.state.currentTodo
      ? this.handleSubmit
      : this.handleEmptySubmit;
    return (
      <React.Fragment>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React todo</h1>
        </header>
        <main className="App-content">
          {this.state.error && <p className="error">{this.state.error}</p>}
          {this.state.message && (
            <p className="success">{this.state.message}</p>
          )}
          <TodoForm
            currentTodo={this.state.currentTodo}
            handleInputChange={this.handleInputChange}
            handleSubmit={submitHandler}
          />
          <Consumer>
            {({ route }) => (
              <TodoList
                todos={filterTodos(this.state.todos, route)}
                handleToggle={this.handleToggle}
                handleRemove={this.handleRemove}
              />
            )}
          </Consumer>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;

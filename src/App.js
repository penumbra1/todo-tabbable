import React, { Component } from "react";

import { Header, Message, TodoForm, TodoList, Footer } from "./components/todo";
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

import "./App.css";

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
    loadTodos(this.abortController.signal)
      .then(todos => {
        if (todos) {
          !this.abortController.signal.aborted && this.setState({ todos });
        } else {
          this.setState({ error: "No todos yet" });
        }
      })
      .catch(e => {
        this.setState({ error: "Failed to load todos" });
        console.error(e);
      });
  }

  componentWillUnmount() {
    // Cancel ongoing fetch, if any
    this.abortController.abort();
  }

  handleDatabaseError = todos => e => {
    // Revert optimistic UI update
    this.setState({ todos, error: "Oops! A database error has occurred" });
    console.error(e);
  };

  showTempMessage = message => {
    this.setState({ message });
    setTimeout(() => this.setState({ message: "" }), 2500);
  };

  handleInputChange = e => {
    this.setState({ currentTodo: e.target.value });
  };

  handleEmptySubmit = e => {
    e.preventDefault();
    this.setState({ error: "Please supply a name" });
  };

  handleSubmit = e => {
    e.preventDefault();

    const oldTodos = this.state.todos;

    const newTodo = {
      id: generateId(),
      name: this.state.currentTodo,
      isComplete: false
    };
    const updatedTodos = addTodo(this.state.todos, newTodo);

    // Optimistic UI update
    this.setState({ todos: updatedTodos, currentTodo: "", error: "" });

    createTodo(newTodo)
      .then(() => this.showTempMessage("Todo added"))
      .catch(this.handleDatabaseError(oldTodos));
  };

  handleToggle = id => {
    const oldTodos = this.state.todos;

    // Find todo, get its toggled copy
    const getToggledTodo = pipe(
      findById,
      toggleTodo
    );
    const updated = getToggledTodo(this.state.todos, id);
    const updatedTodos = updateTodo(this.state.todos, updated);

    this.setState({
      todos: updatedTodos,
      error: ""
    });

    saveTodo(updated)
      .then(() => this.showTempMessage("Todo updated"))
      .catch(this.handleDatabaseError(oldTodos));
  };

  handleRemove = (id, e) => {
    const oldTodos = this.state.todos;

    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({
      todos: updatedTodos,
      error: ""
    });

    destroyTodo(id)
      .then(() => this.showTempMessage("Todo removed"))
      .catch(this.handleDatabaseError(oldTodos));
  };

  render() {
    const submitHandler = this.state.currentTodo
      ? this.handleSubmit
      : this.handleEmptySubmit;
    return (
      <React.Fragment>
        <Header />
        <main className="App-content">
          <TodoForm
            currentTodo={this.state.currentTodo}
            handleInputChange={this.handleInputChange}
            handleSubmit={submitHandler}
          />
          <Message error={this.state.error} message={this.state.message} />
          <Consumer>
            {({ route }) => (
              <TodoList
                todos={filterTodos(this.state.todos, route)}
                showAll={route === "/"}
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

export const addTodo = (todoList, todo) => todoList.concat(todo);

export const findById = (todoList, id) => todoList.find(todo => todo.id === id);

export const toggleTodo = todo => ({ ...todo, isComplete: !todo.isComplete });

export const updateTodo = (todoList, updatedTodo) =>
  todoList.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));

export const removeTodo = (todoList, id) =>
  todoList.filter(todo => todo.id !== id);

export const filterTodos = (todoList, route) => {
  switch (route) {
    case "/active":
      return todoList.filter(todo => !todo.isComplete);
    case "/complete":
      return todoList.filter(todo => todo.isComplete);
    default:
      return todoList;
  }
};

export const generateId = () => Math.floor(Math.random() * 100000);

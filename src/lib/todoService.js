const baseUrl = "http://localhost:8080/todos";

// Accepts a reference to a signal to abort fetch
export const loadTodos = signal =>
  fetch(baseUrl, { signal })
    .then(res => res.json())
    .catch(e => console.error(e));

export const createTodo = todo =>
  fetch(baseUrl, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  }).then(res => res.json());

export const saveTodo = todo =>
  fetch(`${baseUrl}/${todo.id}`, {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  }).then(res => res.json());

export const destroyTodo = id =>
  fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  });

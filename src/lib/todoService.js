// json-server -p 8080 --watch  db.json

const baseUrl = "http://localhost:8080/todos";

const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }

  // Throws an object with a status field only if a response was received
  const errorInResponse = { status: res.status, text: res.statusText };
  throw errorInResponse;
};

const handleError = e => {
  // Fetch will either:
  // 1) throw an object with a status if error came from handleResponse
  // 2) reject before it gets to handleResponse
  // Case 2 is possible only if the server can't be reached due to a network error:
  // see https://github.com/github/fetch/issues/201#issuecomment-403010358
  // and https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const errorMessage = e.status
    ? `Server rejected the request with status ${e.status}: ${e.text}`
    : "Couldn't reach the server";
  throw new Error(errorMessage);
};

const fetchAndHandle = (...params) =>
  fetch(...params)
    .then(res => handleResponse(res))
    .catch(e => handleError(e));

export const loadTodos = signal => fetchAndHandle(baseUrl, { signal });

export const createTodo = todo =>
  fetchAndHandle(baseUrl, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });

export const saveTodo = todo =>
  fetchAndHandle(`${baseUrl}/${todo.id}`, {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });

export const destroyTodo = id =>
  fetchAndHandle(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  });

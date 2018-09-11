import {
  addTodo,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
} from "./todoHelpers";

test("addTodo should add a given todo to the list", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false }
  ];
  const newTodo = { id: 3, name: "three", isComplete: true };

  const result = addTodo(startTodos, newTodo);

  expect(result).toEqual([...startTodos, newTodo]);
});

test("addTodo should not mutate the existing array", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false }
  ];
  const newTodo = { id: 3, name: "three", isComplete: true };

  const result = addTodo(startTodos, newTodo);

  expect(result).not.toBe(startTodos);
});

test("findById should return the expected item", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: true }
  ];
  const expected = startTodos[1];

  const result = findById(startTodos, 2);

  expect(result).toEqual(expected);
});

test("toggleTodo should toggle the isCompleted on the item", () => {
  const startTodo = { id: 1, name: "one", isComplete: false };
  const expected = { id: 1, name: "one", isComplete: true };

  const result = toggleTodo(startTodo);

  expect(result).toEqual(expected);
});

test("toggleTodo should not mutate the original item", () => {
  const startTodo = { id: 1, name: "one", isComplete: false };

  const result = toggleTodo(startTodo);

  expect(result).not.toBe(startTodo);
});

test("updateTodo should update an item with corresponding id", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: true }
  ];
  const updatedTodo = { id: 3, name: "three", isComplete: false };
  const expected = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: false }
  ];

  const result = updateTodo(startTodos, updatedTodo);

  expect(result).toEqual(expected);
});

test("updateTodo should not mutate the original item", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: true }
  ];
  const updatedTodo = { id: 3, name: "three", isComplete: false };

  const result = updateTodo(startTodos, updatedTodo);

  expect(result).not.toBe(startTodos);
});

test("removeTodo should remove an item with given id", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: true }
  ];
  const expected = [
    { id: 1, name: "one", isComplete: false },
    { id: 3, name: "three", isComplete: true }
  ];

  const result = removeTodo(startTodos, 2);

  expect(result).toEqual(expected);
});

test("removeTodo should not mutate the original array", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: true }
  ];

  const result = removeTodo(startTodos, 2);

  expect(result).not.toBe(startTodos);
});

test("filterTodos should return all items for the root route", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: true }
  ];

  const result = filterTodos(startTodos, "/");

  expect(result).toEqual(startTodos);
});

test("filterTodos should return incomplete todos for the /active route", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: true }
  ];

  const result = filterTodos(startTodos, "/active");

  expect(result).toEqual(startTodos.slice(0, -1));
});

test("filterTodos should return complete todos for the /complete route", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: true }
  ];

  const result = filterTodos(startTodos, "/complete");

  expect(result).toEqual(startTodos.slice(-1));
});

import { pipe } from "./utils";

const inc = num => num + 1;
const dbl = num => num * 2;
const add = (a, b) => a + b;

test("pipe should pass the results of inc to dbl", () => {
  const pipeline = pipe(
    inc,
    dbl
  ); // (...args) => dbl(inc(...args))

  const result = pipeline(2);

  expect(result).toBe(6);
});

test("pipe should pass the results of dbl to inc", () => {
  const pipeline = pipe(
    dbl,
    inc
  ); // (...args) => inc(dbl(...args))

  const result = pipeline(2);

  expect(result).toBe(5);
});

test("pipe works with more than 2 functions", () => {
  const pipeline = pipe(
    add,
    dbl,
    inc
  ); // (...args) => inc(dbl(add(...args)))

  const result = pipeline(1, 2);

  expect(result).toBe(7);
});

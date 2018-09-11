import React from "react";

const RouterContext = React.createContext({
  route: "/",
  linkHandler: () => {}
});

export const { Provider, Consumer } = RouterContext;

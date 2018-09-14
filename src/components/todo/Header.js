import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Header = () => (
  <header className="App-header">
    <Logo
      className="App-logo"
      title="Logo created by Hea Poh Lin from the Noun Project"
      aria-label="App logo resembling a Post-it note"
    />
    <h1 className="App-title">Pronto</h1>
  </header>
);

export default Header;

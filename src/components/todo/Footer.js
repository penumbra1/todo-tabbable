import React from "react";
import { Link } from "../router";

const Footer = () => (
  <footer>
    <Link to="/">All</Link>
    <Link to="/active">Active</Link>
    <Link to="/complete">Complete</Link>
  </footer>
);

export default Footer;

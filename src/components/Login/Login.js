import React from "react";
import { Link } from "react-router-dom";

const Login = () => (
  <div className="login">
    <h3>
      {/* <Link to="/LoginForm">Login</Link>/
      <Link to="/RegistrationForm">Register </Link> */}
      <Link to="/ProductMgmt">Manage Products</Link>
    </h3>
  </div>
);

export default Login;

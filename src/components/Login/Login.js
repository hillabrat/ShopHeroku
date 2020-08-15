import React from "react";
import { Link } from "react-router-dom";

const Login = () => (
  <div className="Login">
    <h3>
      Own this site? <Link to="/ProductMgmt">Login</Link>
    </h3>
  </div>
);

export default Login;

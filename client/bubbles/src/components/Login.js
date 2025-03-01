import React, { useState } from "react";
import { axiosWithAuth } from "../data/axiosAuth";

const Login = props => {

const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
    err: null
  });

  const handleChange = e => {
    setLoginCreds({
      ...loginCreds,
      [e.target.name]: e.target.value,
      err: null
    });
  };

  const login = () => {
    axiosWithAuth()
      .post(`http://localhost:5000/api/login`, {
        username: loginCreds.username,
        password: loginCreds.password
      })
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err =>
        setLoginCreds({
          ...loginCreds,
          err: "Error logging in. Please try again."
        })
      );
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginCreds.username === "" || loginCreds.password === ""
      ? setLoginCreds({
          ...loginCreds,
          err: "Please complete all login fields."
        })
      : login();
  };

  return (
    <div className="login-page">
    <h1>Welcome to the Bubble App!</h1>
    <form>
        <h4>Enter Login Creds</h4>
        <input
          type="text"
          name="username"
          placeholder="Enter username..."
          value={loginCreds.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={loginCreds.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button onClick={handleSubmit}>Login</button>
        {loginCreds.err && (
          <div className="error-container">{loginCreds.err}</div>
        )}
      </form>
    </div>
  );
};
export default Login;
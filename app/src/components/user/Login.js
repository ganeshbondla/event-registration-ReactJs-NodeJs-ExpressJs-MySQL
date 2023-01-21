import React, { useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [mypassword, setKalyan] = useState("");

  const addUserName = (e) => {
    setInputEmail(e.target.value);
  };

  const addPassword = (e) => {
    setKalyan(e.target.value);
  };

  const submitTheFrom = (e) => {
    e.preventDefault();

    let newLogin = {
      username: inputEmail,
      password: mypassword,
    };

    console.log(newLogin);
  };

  return (
    <>
      <Header />
      <div className="container p-3 mt-3">
        <div className="row">
          <div className="col-md-6 mb-2">
            <img alt="Login" className="img-fluid" src="./img/login.png" />
          </div>
          <div className="col-md-6 mb-2 my-auto">
            <div className="p-4 border rounded shadow">
              <div className="text-center">
                <h5>
                  <b>Login</b>
                </h5>
              </div>
              <hr />
              <form onSubmit={submitTheFrom}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Username / Email"
                    onChange={addUserName}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                    onChange={addPassword}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Get Me In
                </button>
              </form>
              <hr />
              <div className="row">
                <div className="col-6 text-left">
                  <small>
                    No Account? <Link to="/register">Register Now</Link>
                  </small>
                </div>
                <div className="col-6 text-right">
                  <small>
                    <Link to="#">Forgot Password?</Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

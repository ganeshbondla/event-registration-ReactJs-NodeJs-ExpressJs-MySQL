import React, { useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

const Register = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputMobile, setInputMobile] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const registerUser = (e) => {
    e.preventDefault();

    const registerUser = {
      userName: inputName,
      userEmail: inputEmail,
      userMobile: inputMobile,
      userPassword: inputPassword,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerUser),
    };
    fetch("http://localhost:3095/user/create/", options)
      .then((response) => response.json())
      .then((res) => {
        setUserCreated(res.success);
        setResponseMessage(res.message);
      });
  };

  return (
    <>
      <Header />
      <div className="container p-3 mt-3">
        <div className="row">
          <div className="col-md-6 mb-2">
            <img alt="Register" className="img-fluid" src="./img/signup.png" />
          </div>
          <div className="col-md-6 mb-2 my-auto">
            <div className="p-4 border rounded shadow">
              <div className="text-center">
                <h5>
                  <b>Register</b>
                </h5>
              </div>
              {userCreated ? (
                <>
                  <div
                    className={`alert alert-${
                      userCreated ? "success" : "danger"
                    }`}
                    role="alert"
                  >
                    {responseMessage}
                  </div>
                </>
              ) : (
                ""
              )}
              <hr />
              <form onSubmit={registerUser}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                    onChange={(e) => setInputName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Username / Email"
                    onChange={(e) => setInputEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Mobile Number"
                    onChange={(e) => setInputMobile(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                    onChange={(e) => setInputPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Get Register
                </button>
              </form>
              <hr />
              <div className="row">
                <div className="col-12 text-center">
                  <small>
                    Already Have Account? <Link to="/login">Login Now</Link>
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

export default Register;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login.js";
import Register from "./components/user/Register.js";
import Home from "./components/user/Home/Home.js";
import Events from "./components/user/Events.js";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

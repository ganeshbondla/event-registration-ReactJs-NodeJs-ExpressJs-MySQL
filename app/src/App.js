import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login.js";
import Register from "./components/user/Register.js";
import Home from "./components/user/Home.js";
import Events from "./components/user/Events.js";
import EventList from "./components/user/Dashboard/ListEvents.js";
import MyEvents from "./components/user/Dashboard/MyEvents.js";
import MyProfile from "./components/user/Dashboard/MyProfile.js";
import LogoutUser from "./components/user/Dashboard/Logout.js";

const App = () => {
  const loginuser = false;

  return (
    <>
      {loginuser ? (
        <BrowserRouter>
          <Routes>
            <Route path="/user/events" element={<EventList />} />
            <Route path="/user/myevents" element={<MyEvents />} />
            <Route path="/user/profile" element={<MyProfile />} />
            <Route path="/user/logout" element={<LogoutUser />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;

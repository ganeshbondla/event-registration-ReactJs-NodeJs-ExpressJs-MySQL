import React from "react";
import Header from "./Header";

const MyEvents = () => {
  return (
    <>
      <Header />
      <div className="container mt-3 pt-3">
        <h1>My Events</h1>
        <div className="row p-2">
          <div className="col-md-6 p-2 mb-2">
            <div className="border border-primary rounded p-3 shadow-sm">
              <h3>Event One</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <hr />
              <div className="row">
                <div className="col text-left">
                  <b>Jan 22, 2023</b>
                </div>
                <div className="col text-right">
                  <button className="btn btn-primary">Book Event</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-2 mb-2">
            <div className="border border-primary rounded p-3 shadow-sm">
              <h3>Event Two</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <hr />
              <div className="row">
                <div className="col text-left">
                  <b>Jan 22, 2023</b>
                </div>
                <div className="col text-right">
                  <button className="btn btn-primary">Book Event</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEvents;

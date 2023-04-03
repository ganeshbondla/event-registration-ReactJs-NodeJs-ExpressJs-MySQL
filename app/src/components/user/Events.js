import React, { useEffect, useState } from "react";
import Header from "./Header";
import EventsList from "./EventsList";

const Events = () => {
  const [listOfEvents, setListOfEvents] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch("http://localhost:3095/event/list/", options)
      .then((response) => response.json())
      .then((res) => setListOfEvents(res.results));
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-3 pt-3">
        <h1>Events</h1>
        <div className="row p-2">
          {listOfEvents.length !== 0 ? (
            <EventsList eventsList={listOfEvents} />
          ) : (
            <>
              <p>Loading Events....</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Events;

import React from "react";
import { useNavigate } from "react-router-dom";

const EventsList = (props) => {
    const { eventsList } = props;
    const navigate = useNavigate();

    const listview = eventsList.map((event, i) => {
        return(
        <div className="col-md-6 p-2 mb-2" key={i}>
            <div className="border border-primary rounded p-3 shadow-sm">
            <h3>{event.event_name}</h3>
            <p>{event.event_description}</p>
            <hr />
            <div className="row">
                <div className="col text-left">
                <b>
                    {event.event_date} | {event.event_amount}
                </b>
                </div>
                <div className="col text-right">
                <button className="btn btn-primary" onClick={() => {
                    navigate(`/event/${event.event_id}`);
                }}>Book Event</button>
                </div>
            </div>
            </div>
        </div>
        )
    })
    
    return(
    <>
{listview}
    </>
    )
}

export default EventsList;
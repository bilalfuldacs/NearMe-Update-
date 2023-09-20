import React from 'react';
import { Link } from 'react-router-dom';

function DisplayCardEvent({ event }) {
  return (
    <Link to={`/events/${event.eventName}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <img className="card-img-top" src={event.eventImage} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title text-center" style={{ textDecoration: 'none' }}>{event.eventName}</h5>
          <span className="card-text" style={{ textDecoration: 'none' }}>{event.eventLocation}</span>
          <div className="row mt-2">
            <div className="col-6">
              <span className="card-text" style={{ textDecoration: 'none' }}>{event.eventFrom}</span>
            </div>
            <div className="col-6 text-right">
              <span className="card-text" style={{ textDecoration: 'none' }}>{event.eventTo}</span>
            </div>
          </div>
          {/* Add more content */}
        </div>
      </div>
    </Link>
  );
}

export default DisplayCardEvent;
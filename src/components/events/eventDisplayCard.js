import React from 'react';
import { Link } from 'react-router-dom';

function DisplayCardEvent({ event }) {
  console.log(event);
  return (
    <Link to={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
      <img
  className="card-img-top w-50 h-50" 
  src={`${event.pictures[0].image_path  }`} // Set the Base64 data as the source
  
  alt="Card image cap"
/>
        <div className="card-body">
          <h5 className="card-title text-center" style={{ textDecoration: 'none' }}>{event.eventName}</h5>
          <span className="card-text" style={{ textDecoration: 'none' }}>
  {event.street + ' ' + event.Hausnumber + ' ' + event.postalCode + ', ' + event.city }
</span>
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
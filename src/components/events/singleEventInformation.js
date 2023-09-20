import React from 'react';

function SingleEventInformation({ details, location, description }) {
  const showLocationFields = !!location;
  const showEventDescription = description !== undefined;

  let cardHeader = 'Details';

  if (showLocationFields) {
    cardHeader = 'LOCATION';
  } else if (showEventDescription) {
    cardHeader = 'Description';
  }

  return (
    <>
      <div className="card" style={{ width: "95%" }}>
        <h5 className="card-header">{cardHeader}</h5>
        <div className="card-body">
          {showLocationFields ? (
            // If `location` prop is provided, display location-related fields
            <>
              {/* Country */}
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Country:</strong> {location.country}</p>
                </div>
                {/* City */}
                <div className="col-md-6">
                  <p><strong>City:</strong> {location.city}</p>
                </div>
              </div>
              {/* Add other location-related fields here */}
              <div className="row">
                {/* Street */}
                <div className="col-md-6">
                  <p><strong>Street:</strong> {location.street}</p>
                </div>
                {/* Postal Code */}
                <div className="col-md-6">
                  <p><strong>Postal Code:</strong> {location.postalCode}</p>
                </div>
              </div>
            </>
          ) : showEventDescription ? (
            // If `eventDescription` prop is provided, display the description in the card body
            <div>
            
              <p>{description.eventDescription}</p>
            </div>
          ) : (
            // If neither `location` nor `eventDescription` prop is provided, display other fields
            <>
              <div className="row">
                {/* Event Type */}
                <div className="col-md-6">
                  <p><strong>Event Type:</strong> {details.eventType}</p>
                </div>
                {/* Event Location */}
                <div className="col-md-6">
                  <p><strong>Event Location:</strong> {details.eventLocation}</p>
                </div>
              </div>
              <div className="row">
                {/* Age Group */}
                <div className="col-md-6">
                  <p><strong>Age Group:</strong> {details.ageGroup}</p>
                </div>
                {/* Total People Allowed */}
                <div className="col-md-6">
                  <p><strong>Total People Allowed:</strong> {details.totalPeople}</p>
                </div>
              </div>
              <div className="row">
                {/* Preferred Gender */}
                <div className="col-md-6">
                  <p><strong>Preferred Gender:</strong> {details.preferredGender}</p>
                </div>
                {/* From Date */}
                <div className="col-md-6">
                  <p><strong>From Date:</strong> {details.fromDate}</p>
                </div>
              </div>
              <div className="row">
                {/* To Date */}
                <div className="col-md-6">
                  <p><strong>To Date:</strong> {details.toDate}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div><br></br>
    </>
  );
}

export default SingleEventInformation;

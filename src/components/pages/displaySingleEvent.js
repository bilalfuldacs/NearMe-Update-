import React from 'react';
import EventImageSlider from '../events/eventImageSlider';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleEventInformation from '../events/singleEventInformation';
import eventImage from '../../assets/empty-blue-white-studio-backdrop-abstract-gradient-grey-background-vintage-color-design-89483978.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function DisplaySingleEvent() {
  const { id } = useParams();
 
  const events = useSelector((state) => state.events.events);
  const filteredEvents = events.filter((event) => event.id === parseInt(id, 10));
  console.log(filteredEvents);
    const containerStyle = {
        minHeight: '100vh', // Ensure the container covers the entire viewport height
        position: 'relative', // Required for overlay
      };
    
     
    
      const overlayStyle = {
        content: "",
        background: `url(${eventImage})`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        opacity: 0.9,
     
      };
    
    const EventData = {
        eventName: filteredEvents[0].eventName,
        eventType: filteredEvents[0].eventType,
        eventLocation: filteredEvents[0].eventLocation,
        totalPeople:filteredEvents[0].totalPeople, 
        ageGroup: filteredEvents[0].ageGroup,
        preferredGender:filteredEvents[0].preferredGender, 
        country: filteredEvents[0].country,
        city:filteredEvents[0].city, 
        street: filteredEvents[0].street,
        postalCode: filteredEvents[0].postalCode,
        hausNumber:filteredEvents[0].hausNumber,
        eventDescription: filteredEvents[0].eventDescription,
        phone:filteredEvents[0].phone,
        email: filteredEvents[0].email,
        whatsapp: filteredEvents[0].whatsapp,
        fromDate: filteredEvents[0].fromDate,
        toDate: filteredEvents[0].toDate,
        images: filteredEvents[0].pictures
        ,
      };
    return (
        < div style={containerStyle} >
               <div style={overlayStyle}></div>
          <div className="row">
            <div className="col-md-4 mt-5">
              {/* Contact Form */}
              <div class="card">
  <h5 class="card-header">Contact</h5>
  <div class="card-body">
    <h5 class="card-title">Email</h5>
    <p class="card-text">Bilal@gmail.com</p>

    <h5 class="card-title">Phone</h5>
    <p class="card-text">12345678</p>
    <h5 class="card-title">whatsapp</h5>
    <p class="card-text">12346678</p>   
  </div>
</div>
            </div>
            <div className="col-md-8 mt-5">
                <EventImageSlider pictures={EventData.images}/><br></br>
           
                <SingleEventInformation details={EventData}/><br></br>
                <SingleEventInformation location={EventData}/>
                <SingleEventInformation description={EventData}/>
    
    
            </div>
          </div>
          </div>
      );
}

export default DisplaySingleEvent;
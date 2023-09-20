import React from 'react';
import EventImageSlider from '../events/eventImageSlider';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleEventInformation from '../events/singleEventInformation';
import eventImage from '../../assets/empty-blue-white-studio-backdrop-abstract-gradient-grey-background-vintage-color-design-89483978.webp';

function DisplaySingleEvent() {
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
        eventName: "Sample Event",
        eventType: "Food",
        eventLocation: "Indoor",
        totalPeople: "50",
        ageGroup: "18 to 25",
        preferredGender: "Male",
        country: "United States",
        city: "New York",
        street: "123 Main St",
        postalCode: "10001",
        hausNumber: "10001",
        eventDescription:" this is event about your wishes",
        phone: "123-456-7890",
        email: "sample@example.com",
        whatsapp: "123-789-4561",
        pictures: ["image1.jpg", "image2.jpg"],
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
                <EventImageSlider/><br></br>
           
                <SingleEventInformation details={EventData}/><br></br>
                <SingleEventInformation location={EventData}/>
                <SingleEventInformation description={EventData}/>
    
    
            </div>
          </div>
          </div>
      );
}

export default DisplaySingleEvent;
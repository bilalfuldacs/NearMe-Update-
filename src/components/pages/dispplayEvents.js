import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterComponent from '../events/eventFilterBar';
import DisplayCardEvent from '../events/eventDisplayCard';
import eventImage from '../../assets/empty-blue-white-studio-backdrop-abstract-gradient-grey-background-vintage-color-design-89483978.webp';
function DisplayEvent({ event }) {
  const eventData = [
    {
      eventName: 'Event 1',
      eventType: 'Food',
      eventLocation: 'Leipzige Strasse 54.Fuulda,Germany',
      eventImage: 'https://picsum.photos/300/200?random=1',
      eventFrom:'2-04-2023',
      eventTo:'2-04-2023'
    },
    {
      eventName: 'Event 2',
      eventType: 'Sports',
      eventLocation: 'Location 2',
      eventImage: 'https://picsum.photos/300/200?random=2',
      eventFrom:'2-04-2023',
      eventTo:'2-04-2023'
    },
    {
      eventName: 'Event 3',
      eventType: 'Food',
      eventLocation: 'Location 3',
      eventImage: 'https://picsum.photos/300/200?random=3',
      eventFrom:'2-04-2023',
      eventTo:'2-04-2023'
    },
    {
      eventName: 'Event 4',
      eventType: 'Sports',
      eventLocation: 'Location 4',
      eventImage: 'https://picsum.photos/300/200?random=4',
      eventFrom:'2-04-2023',
      eventTo:'2-04-2023'
    },
    {
      eventName: 'Event 5',
      eventType: 'Food',
      eventLocation: 'Location 5',
      eventImage: 'https://picsum.photos/300/200?random=5',
      eventFrom:'2-04-2023',
      eventTo:'2-04-2023'
    },
    {
      eventName: 'Event 6',
      eventType: 'Sports',
      eventLocation: 'Location 6',
      eventImage: 'https://picsum.photos/300/200?random=6',
      eventFrom:'2-04-2023',
      eventTo:'2-04-2023'
    },
    // Add more event objects as needed
  ];
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

  return (
    <>
      <div className="container-fluid mt-3" style={containerStyle}>

        <div style={overlayStyle}></div>
        {/* Filter Component */}
        <FilterComponent />

        {/* Cards */}
        <div className="row mt-5">
          {eventData.map((event, index) => (
            <div className="col-4 mb-3" key={index}>
              <DisplayCardEvent event={event} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DisplayEvent;




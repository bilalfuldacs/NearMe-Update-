
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterComponent from '../events/eventFilterBar';
import DisplayCardEvent from '../events/eventDisplayCard';
import eventImage from '../../assets/empty-blue-white-studio-backdrop-abstract-gradient-grey-background-vintage-color-design-89483978.webp';
import { useNavigate,useLocation  } from 'react-router-dom';
import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEventState } from '../../store/event/eventSlice';
import { useAuthContext } from '../../store/context/AuthContext';
function DisplayEvent({ event }) {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const location = useLocation();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  console.log(events);
  useEffect(() => {
    if (!token) {
     
      navigate('/login');
    }
 
  
  }, [token]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let responseData;

        if (location.pathname === '/events/MyEvents') {
          responseData = await Loader.fetchMyEvents();
        } else if (location.pathname === '/events/display') {
          responseData = await Loader.fetchAllEvents();
        }

        // Dispatch the action with the fetched data as payload
        dispatch(updateEventState(responseData.EventData)); // Assuming responseData is an array

       
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, [location]);

  
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
          {events.map((event, index) => (
            <div className="col-4 mb-3" key={index}>
              <DisplayCardEvent event={event} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}



export const Loader = {
  fetchMyEvents: async () => {
    console.log("i am here");
    try {
      // Retrieve the user's token from local storage
      const token = localStorage.getItem('access_token'); // Modify this based on where you store the token

      // Include the token in the request headers
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await fetch('http://127.0.0.1:8000/api/Myevents', {
        headers: headers, // Include the headers with the token
      });

      if (!response.ok) {
        throw new Error('Error fetching user events');
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
   
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  },
  fetchAllEvents: async () => {
    console.log("i am here in All events");
    const token = localStorage.getItem('access_token'); // Modify this based on where you store the token

      // Include the token in the request headers
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/Allevents');

      if (!response.ok) {
        throw new Error('Error fetching all events');
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;

    } catch (error) {
      console.error('Error fetching all events:', error);
    }
  },
};

export default DisplayEvent;




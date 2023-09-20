import React, { useState } from 'react';
import CreatedEvent from '../events/creatdEvents';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventDetail from '../events/eventDetails';
import EventAdresss from '../events/eventAdress';
import EventContactForm from '../events/eventContactForm';
import AddressImage from '../../assets/istockphoto-1291287018-612x612.jpg';
import contactImage from '../../assets/istockphoto-1305268276-612x612.jpg';
import formDetails from '../../assets/172712633-man-fill-out-online-feedback-checklist-or-application-form-giving-rate-to-company-services.jpg';
import UploadPictures from '../events/uploadPictures';
import eventImage from '../../assets/empty-blue-white-studio-backdrop-abstract-gradient-grey-background-vintage-color-design-89483978.webp';

function CreateEvent() {
  const [page, setPage] = useState(0);
  const FormTitles = ["Sign Up", "Personal Info", "Pictures", "Other"];

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    eventLocation: "",
    totalPeople: "",
    ageGroup: "",
    preferredGender: "",
    country: "",
    city: "",
    street: "",
    postalCode: "",
    phone: "",
    email: "",
    whatsapp: "",
    pictures: [],
    isValid: false,
  });

  const containerStyle = {
    minHeight: '70vh', // Ensure the container covers the entire viewport height
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
  const [showAlert, setShowAlert] = useState(false);

  const isCurrentStepValid = () => {
    // Implement validation logic for the current step here.
    // Return true if the step is valid, false otherwise.
    return true; // Modify this to implement your validation logic.
  };

  const PageDisplay = () => {
    if (page === 0) {
      return <EventDetail formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <EventAdresss formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <UploadPictures formData={formData} setFormData={setFormData} />;
    } else {
      return <EventContactForm formData={formData} setFormData={setFormData} />;
    }
  };

  const PicDisplay = () => {
    if (page === 0) {
      return (
        <img
          src={formDetails}
          alt="Loading..."
          style={{ height: '430px', marginTop: '20px' }}
        />
      );
    } else if (page === 1 || page === 2) {
      return (
        <img
          src={AddressImage}
          alt="Loading..."
          style={{ height: '360px' }}
        />
      );
    } else {
      return (
        <img
          src={contactImage}
          alt="Loading..."
          style={{ height: '430px' }}
        />
      );
    }
  };

  return (
    <div className="container-fluid mt-3">

      <div className='row w-100 mt-3'>
        <div className='col-sm-4'>{PicDisplay()}</div>
        <div className='col-sm-8 border border-primary h-50 mt-5 '>
          {PageDisplay()}
          <button
            onClick={() => {
              if (page > 0) {
                setPage((currPage) => currPage - 1);
              }
            }}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (formData.isValid === true) {
                if (page === FormTitles.length - 1) {
                  alert('FORM SUBMITTED');
                  console.log(formData);
                } else {
                  setPage((currPage) => currPage + 1);
                }
              } else {
                setShowAlert(true);
              }
            }}
          >
            {page === FormTitles.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>

      {showAlert && (
        <div
          className='container d-flex justify-content-center align-items-center w-25 h-25'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            width: '50%',
            height: '50%',
          }}
        >
          <div className='alert alert-danger alert-dismissible text-center' role='alert'>
            Fill all required fields.
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='alert'
              aria-label='Close'
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
        </div>
      )}

      <div className='row mb-5'>
        <div className='col-4'></div>
        <div className='col-8 mb-5'></div>
      </div>
    </div>
  );
}

export default CreateEvent;

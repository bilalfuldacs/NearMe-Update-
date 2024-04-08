import React, { useState } from "react";
import EventDetailsForm from "./EventDetails";
import EventAddressForm from "./EventAddressForm";
import EventPicturesForm from "./EventsPicturesForm";
import ContactFormUI from "./EventContactForm";
import { Container, Button, Box } from "@mui/material";
import { db } from "../../firebase-config"; // Adjust the import path based on your project structure
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../../firebase-config"; // Adjust the import path based on your project structure
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FormManager = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    eventLocation: "",
    totalPeopleAllowed: "",
    preferredGender: "",
    country: "",
    city: "",
    state: "",
    street: "",
    postalCode: "",
    phone: "",
    email: "",
    whatsapp: "",
    whatsappCountryCode: "",
    phoneCountryCode: "",
    pictures: [],
    fromDate: "",
    toDate: "",
    hausNummber: "",
    eventDescription: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    if (name === "pictures") {
      if (!value || value.length === 0) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "At least one picture is required",
        }));
        return false;
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        return true;
      }
    }
    // Simple required field validation
    if (!value.trim()) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required",
      }));
      return false;
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    }
  };

  const validateCurrentStep = () => {
    const validations = {
      0: () =>
        validateField("eventName", formData.eventName) &&
        validateField("eventType", formData.eventType) &&
        validateField("eventLocation", formData.eventLocation) &&
        validateField("preferredGender", formData.preferredGender) &&
        validateField("totalPeopleAllowed", formData.totalPeopleAllowed) &&
        validateField("fromDate", formData.fromDate) &&
        validateField("toDate", formData.toDate),

      1: () =>
        validateField("hausNummber", formData.hausNummber) &&
        validateField("postalCode", formData.postalCode),
      2: () => {
        if (formData.pictures.length === 0) {
          // Update the form errors state to reflect the error in pictures
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            pictures: "At least one picture is required",
          }));
          return false;
        } else {
          // Clear the error for pictures if it was previously set
          setFormErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.pictures;
            return newErrors;
          });
          return true;
        }
      },
      3: () =>
        validateField("email", formData.email) &&
        validateField("eventDescription", formData.eventDescription) &&
        validateField("phone", formData.phone) &&
        validateField("whatsapp", formData.whatsapp) &&
        validateField("phoneCountryCode", formData.phoneCountryCode) &&
        validateField("whatsappCountryCode", formData.whatsappCountryCode),
    };

    return validations[currentStep] ? validations[currentStep]() : true;
  };
  const handleFinalSubmit = async () => {
    // Exclude the File objects from the formData before sending to Firestore
    const { pictures, ...eventDataWithoutPictures } = formData;

    // If you want to store only the image names in Firestore
    const imageNames = pictures.map((file) => file.name);

    // Fetch the user object from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // Ensure the user object exists and has an email before proceeding
    if (!user || !user.email) {
      console.error("No user email found in local storage.");
      // Handle the missing user/email scenario appropriately
      return;
    }

    const eventWithImageNamesAndUserEmail = {
      ...eventDataWithoutPictures,
      imageNames, // This will be an array of image file names
      userEmail: user.email, // Add the user's email to the event data
    };

    try {
      const docRef = await addDoc(
        collection(db, "events"),
        eventWithImageNamesAndUserEmail
      );
      console.log("Event stored in Firestore with ID:", docRef.id);
      // Optionally, navigate to a success page or reset the form here
    } catch (error) {
      console.error("Error adding event to Firestore:", error);
      // Handle the error appropriately
    }
  };

  const goToNext = () => {
    // Before the final step, move to the next step if validation passes
    if (currentStep < 3) {
      if (validateCurrentStep()) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
      // On the final step, validate and handle the final submit
      if (validateCurrentStep()) {
        handleFinalSubmit(); // This should be your function that handles submission
      } else {
        // Handle the case where validation failed on the final step
        // Maybe display a message or log an error
        console.error("Validation failed on the final step.");
      }
    }
  };

  const goToPrevious = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const updateFormData = (field, value) => {
    validateField(field, value); // Validate the field when it's updated
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <EventDetailsForm
            formData={formData}
            updateFormData={updateFormData}
            errors={formErrors}
          />
        );
      case 1:
        return (
          <EventAddressForm
            formData={formData}
            updateFormData={updateFormData}
            errors={formErrors}
          />
        );
      case 2:
        return (
          <EventPicturesForm
            formData={formData}
            updateFormData={updateFormData}
            errors={formErrors}
          />
        );
      case 3:
        return (
          <ContactFormUI
            formData={formData}
            updateFormData={updateFormData}
            errors={formErrors}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      {renderStep()}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        {currentStep > 0 && (
          <Button variant="contained" color="error" onClick={goToPrevious}>
            Back
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={goToNext}>
          {currentStep === 3 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Container>
  );
};

export default FormManager;

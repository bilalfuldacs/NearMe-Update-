import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function EventAddress({ onSubmit, setFormData }) {
  const [isValid, setIsValid] = useState(false);
  let valid=false;
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    street: Yup.string().required('Street is required'),
    hausnummer: Yup.string().required('Haus Nummer is required'),
    postalCode: Yup.string().required('Postal Code is required'),
  });
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      isValid,
    }));
  }, [isValid]);
  // Define a function to handle onBlur event for the fields
  const handleBlurField = (e, formik) => {
    const { name, value } = e.target;
    const allFieldsFilled = areFieldsFilled(formik.values);
   
    console.log(allFieldsFilled);
    if (allFieldsFilled) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // Check if the eventName field is valid and all fields are filled
    formik.validateField(name).then((error) => {
      if (!error && value && !formik.errors[name] ) {
        // Update the form data only if the eventName field is valid and has a value, and all fields are filled
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          isValid
        }));
      }
    });
  };
  function areFieldsFilled(obj) {
    return Object.values(obj).every((value) => Boolean(value));
  }
  return (
    <Formik
      initialValues={{
        country: '',
        city: '',
        street: '',
        hausnummer: '',
        postalCode: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="row">
            <div className="form-row">
              <div className="col-sm-12 w-100">
                <label htmlFor="country">Country:</label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  required
                  className={`form-control ${
                    formik.touched.country && formik.errors.country
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    handleBlurField(e, formik);
                    formik.handleBlur(e);
                  }}
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="city">City:</label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  required
                  className={`form-control ${
                    formik.touched.city && formik.errors.city
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    handleBlurField(e, formik);
                    formik.handleBlur(e);
                  }}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="col-6">
                <label htmlFor="street">Street:</label>
                <Field
                  type="text"
                  id="street"
                  name="street"
                  required
                  className={`form-control ${
                    formik.touched.street && formik.errors.street
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    handleBlurField(e, formik);
                    formik.handleBlur(e);
                  }}
                />
                <ErrorMessage
                  name="street"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="hausnummer">Haus Nummer:</label>
                <Field
                  type="text"
                  id="hausnummer"
                  name="hausnummer"
                  required
                  className={`form-control ${
                    formik.touched.hausnummer && formik.errors.hausnummer
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    handleBlurField(e, formik);
                    formik.handleBlur(e);
                  }}
                />
                <ErrorMessage
                  name="hausnummer"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="postalCode">Postal Code:</label>
                <Field
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  required
                  className={`form-control ${
                    formik.touched.postalCode && formik.errors.postalCode
                      ? 'is-invalid'
                      : ''
                  }`}
                  onBlur={(e) => {
                    handleBlurField(e, formik);
                    formik.handleBlur(e);
                  }}
                />
                <ErrorMessage
                  name="postalCode"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EventAddress;

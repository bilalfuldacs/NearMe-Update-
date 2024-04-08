import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import useGetData from "../customHooks/ApiCalling";
import { usePostData } from "../customHooks/ApiCalling";
import axios from "axios";

const EventAddressForm = ({ formData, updateFormData, errors }) => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const { postData, response } = usePostData();
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    updateFormData(name, value);
  };
  console.log("i am updating");
  const { data, loading, error } = useGetData(
    "https://countriesnow.space/api/v0.1/countries/codes"
  );
  useEffect(() => {
    if (!formData.country) return;

    const fetchStates = async () => {
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          { country: formData.country }
        );
        if (response.data && response.data.data && response.data.data.states) {
          setStates(response.data.data.states);
        }
      } catch (error) {
        console.error("Failed to fetch states:", error);
      }
    };

    fetchStates();
  }, [formData.country]);
  useEffect(() => {
    if (!formData.state) return;

    const fetchCities = async () => {
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            country: formData.country,
            state: formData.state,
          }
        );
        // Ensure the response has the expected format
        if (response.data && response.data.data) {
          setCities(response.data.data); // Assuming response.data.data is the array of cities
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, [formData.state]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 2,
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Event Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                value={formData.country}
                name="country"
                label="Country"
                onChange={handleChange}
              >
                {data &&
                  data.data.map((country) => (
                    <MenuItem key={country.code} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                value={formData.state}
                label="State"
                onChange={handleChange}
                name="state"
              >
                {states.map((state) => (
                  <MenuItem key={state.state_code} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                value={formData.city}
                label="City"
                onChange={handleChange}
                name="city"
              >
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Street"
              variant="outlined"
              value={formData.street}
              onChange={handleChange}
              fullWidth
              name="street"
              error={!!errors.street}
              helperText={errors.street || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Haus Nummer"
              variant="outlined"
              value={formData.hausNummber}
              onChange={handleChange}
              fullWidth
              name="hausNummber"
              error={!!errors.hausNummber}
              helperText={errors.hausNummber || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="postalCode"
              label="Postal Code"
              variant="outlined"
              value={formData.postalCode}
              onChange={handleChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode || ""}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EventAddressForm;

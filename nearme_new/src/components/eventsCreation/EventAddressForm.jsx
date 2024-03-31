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

const EventAddressForm = ({ formData, updateFormData, errors }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormData(name, value);
  };

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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                value={formData.country}
                name="country"
                label="Country"
                onChange={handleChange}
              >
                {/* Add MenuItem components here based on fetched countries */}
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
              ></Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Select Street</InputLabel>
              <Select
                value={formData.street}
                label="Select Street"
                onChange={handleChange}
                name="street"
              ></Select>
            </FormControl>
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

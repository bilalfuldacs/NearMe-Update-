import React from "react";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Box,
  Button,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";

const EventDetailsForm = ({ formData, updateFormData, errors }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormData(name, value);
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Event Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Event Name"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              error={!!errors.eventName}
              helperText={errors.eventName || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Event Type</InputLabel>
              <Select
                name="eventType"
                value={formData.eventType}
                label="Event Type"
                onChange={handleChange}
                error={!!errors.eventType}
                helperText={errors.eventType || ""}
              >
                <MenuItem value="Type1">Type 1</MenuItem>
                <MenuItem value="Type2">Type 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Event Location</InputLabel>
              <Select
                name="eventLocation"
                value={formData.eventLocation}
                label="Event Location"
                onChange={handleChange}
                error={!!errors.eventLocation}
                helperText={errors.eventLocation || ""}
              >
                <MenuItem value="Location1">Location 1</MenuItem>
                <MenuItem value="Location2">Location 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Preferred Gender</InputLabel>
              <Select
                name="preferredGender"
                value={formData.preferredGender}
                label="Preferred Gender"
                onChange={handleChange}
                error={!!errors.preferredGender}
                helperText={errors.preferredGender || ""}
              >
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total People Allowed"
              variant="outlined"
              type="number"
              name="totalPeopleAllowed"
              value={formData.totalPeopleAllowed}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.totalPeopleAllowed}
              helperText={errors.totalPeopleAllowed || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="From Date"
              type="date"
              name="fromDate"
              error={!!errors.fromDate}
              helperText={errors.fromDate || ""}
              InputLabelProps={{ shrink: true }}
              value={formData.fromDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="To Date"
              type="date"
              name="toDate"
              error={!!errors.toDate}
              helperText={errors.toDate || ""}
              InputLabelProps={{ shrink: true }}
              value={formData.toDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EventDetailsForm;

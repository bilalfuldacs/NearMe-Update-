import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const ContactFormUI = ({ formData, updateFormData, errors }) => {
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
          Contact Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              value={formData.email}
              error={!!errors.email}
              helperText={errors.email || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="WhatsApp country code"
              name="whatsappCountryCode"
              variant="outlined"
              value={formData.whatsappCountryCode}
              onChange={handleChange}
              error={!!errors.whatsappCountryCode}
              helperText={errors.whatsappCountryCode || ""}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="whatsapp"
              label="WhatsApp"
              variant="outlined"
              value={formData.whatsapp}
              error={!!errors.whatsapp}
              helperText={errors.whatsapp || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone country code"
              variant="outlined"
              name="phoneCountryCode"
              value={formData.phoneCountryCode}
              error={!!errors.phoneCountryCode}
              helperText={errors.phoneCountryCode || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone"
              name="phone"
              variant="outlined"
              value={formData.phone}
              error={!!errors.phone}
              helperText={errors.phone || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Event Description"
              variant="outlined"
              name="eventDescription"
              multiline
              rows={4}
              value={formData.eventDescription}
              error={!!errors.eventDescription}
              helperText={errors.eventDescription || ""}
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

export default ContactFormUI;

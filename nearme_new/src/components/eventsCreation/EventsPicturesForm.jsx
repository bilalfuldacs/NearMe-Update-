import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";

const EventPicturesForm = ({ formData, updateFormData, errors }) => {
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    // Use updateFormData instead of setFormData
    updateFormData("pictures", [...formData.pictures, ...files]);
  };

  const handleImageRemove = (index) => {
    // Use updateFormData with new pictures array excluding the one at the specified index
    const updatedPictures = formData.pictures.filter((_, i) => i !== index);
    updateFormData("pictures", updatedPictures);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          m: 2,
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Event Pictures
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
        >
          Upload Pictures
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </Button>
        <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
          {formData.pictures.map((file, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  position: "relative",
                  width: 150,
                  height: 150,
                  backgroundImage: `url(${URL.createObjectURL(file)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "primary.main",
                    backgroundColor: "background.paper",
                    "&:hover": {
                      color: "secondary.main",
                    },
                  }}
                  onClick={() => handleImageRemove(index)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
        {errors.pictures && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {errors.pictures}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default EventPicturesForm;

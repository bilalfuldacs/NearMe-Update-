import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Slider,
  TextField,
} from "@mui/material";

function FilterPanel({ filters, onFiltersChange, onFilterSubmit }) {
  const handleSliderChange = (event, newValue) => {
    onFiltersChange({ ...filters, distance: newValue });
  };

  const handleChange = (event) => {
    onFiltersChange({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <Box m={5} p={2} boxShadow={2}>
      <Typography gutterBottom>Filter</Typography>

      <Box mt={2}>
        <Typography gutterBottom>Distance</Typography>
        <Slider
          value={filters.distance}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          name="distance"
        />
      </Box>

      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category" // This should match the InputLabel
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <MenuItem value="Type1">Type1</MenuItem>
          <MenuItem value="Type2">Type2</MenuItem>
          {/* Add more MenuItems here */}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="Event-Location">Event Location</InputLabel>
        <Select
          labelId="Event-Location"
          label="Event-Location" // This should match the InputLabel
          name="eventLocation"
          value={filters.eventLocation}
          onChange={handleChange}
        >
          <MenuItem value="Location1">Location1</MenuItem>
          <MenuItem value="Location2">Location2</MenuItem>
          {/* Add more MenuItems here */}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="Preferred-Age-Group">Preferred Gender</InputLabel>
        <Select
          name="preferredGender"
          label="preferred Gender" // This should match the InputLabel
          labelId="preferred Gender"
          value={filters.preferredGender}
          onChange={handleChange}
        >
          <MenuItem value="Any">Any</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          {/* Add more MenuItems here */}
        </Select>
      </FormControl>

      <TextField
        label="From Date"
        type="date"
        name="fromDate"
        value={filters.fromDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="To Date"
        type="date"
        name="toDate"
        value={filters.toDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <Button variant="contained" onClick={onFilterSubmit} sx={{ mt: 2 }}>
        Filter
      </Button>
    </Box>
  );
}

export default FilterPanel;

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
          <MenuItem value="concerts">Concerts</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          {/* Add more MenuItems here */}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="Event-Location">Event Location</InputLabel>
        <Select
          labelId="Event-Location"
          label="Event-Location" // This should match the InputLabel
          name="EventLocation"
          value={filters.eventLocation}
          onChange={handleChange}
        >
          <MenuItem value="outdoor">Outdoor</MenuItem>
          <MenuItem value="indoor">Indoor</MenuItem>
          {/* Add more MenuItems here */}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="Preferred-Age-Group">Preferred Age Group</InputLabel>
        <Select
          name="ageGroup"
          label="Preferred-Age-Group" // This should match the InputLabel
          labelId="Preferred-Age-Group"
          value={filters.ageGroup}
          onChange={handleChange}
        >
          <MenuItem value="all">All Ages</MenuItem>
          <MenuItem value="adults">Adults</MenuItem>
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

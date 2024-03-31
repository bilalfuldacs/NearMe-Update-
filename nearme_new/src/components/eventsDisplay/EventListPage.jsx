import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FilterPanel from "./FilterPanel"; // Assume this is in the same directory
import EventCard from "./EventCard"; // Assume this is in the same directory
import CustomPagination from "./Pagination"; // Assume this is in the same directory

function EventListPage() {
  // Dummy data for the events
  const dummyEvents = [
    {
      id: 1,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 21,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 22,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 3,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 4,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 5,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 6,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 7,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 8,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 9,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 10,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 11,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 12,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 13,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 14,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 15,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 16,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 17,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 18,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 19,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    {
      id: 20,
      title: "Concert in the Park",
      date: "2023-07-16",
      location: "Outdoor",
      address: "123 Park Ave, City",
      image: "/path/to/event1.jpg", // Replace with actual image paths
    },
    // ... more dummy event objects
  ];

  const [filters, setFilters] = useState({
    distance: 30,
    category: "",
    eventLocation: "",
    ageGroup: "",
    fromDate: "",
    toDate: "",
  });

  const eventsPerPage = 7; // Number of events you want per page
  const [currentPage, setCurrentPage] = useState(1);

  // Given the current page and events per page, calculate the slice of events to show
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = dummyEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const [events, setEvents] = useState(dummyEvents);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFilterSubmit = () => {
    // Perform API call to fetch events based on filters
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    // Perform API call to fetch events based on new page
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            onFilterSubmit={() => {}}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" gutterBottom>
            Events
          </Typography>
          <Grid container spacing={2}>
            {currentEvents.map((event) => (
              <Grid item key={event.id} xs={12} sm={6} md={4}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
          <CustomPagination
            pageCount={Math.ceil(dummyEvents.length / eventsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventListPage;

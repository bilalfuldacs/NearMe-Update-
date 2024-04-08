import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FilterPanel from "./FilterPanel";
import EventCard from "./EventCard";
import CustomPagination from "./Pagination";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useLocation } from "react-router-dom";

function EventListPage() {
  const [allEvents, setAllEvents] = useState([]); // All fetched events
  const [filteredEvents, setFilteredEvents] = useState([]); // Events after filters are applied
  const eventsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      let q;
      if (location.pathname.startsWith("/events/MyEvents")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.email) {
          console.error("User is not logged in or email is not available");
          return;
        }
        q = query(
          collection(db, "events"),
          where("userEmail", "==", user.email)
        );
      } else if (location.pathname.startsWith("/events/display")) {
        q = query(collection(db, "events"));
      } else {
        return;
      }

      const querySnapshot = await getDocs(q);
      const fetchedEvents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents);
    };

    fetchEvents();
  }, [location.pathname]);

  const [filters, setFilters] = useState({
    distance: 30,
    category: "",
    eventLocation: "",
    preferredGender: "",
    fromDate: "",
    toDate: "",
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFilterSubmit = () => {
    let newFilteredEvents = [...allEvents]; // Start with all events for filtering

    // Filter by category if a category is selected
    if (filters.category) {
      newFilteredEvents = newFilteredEvents.filter(
        (event) => event.eventType === filters.category
      );
    }

    // Further filter by event location if an event location is selected
    if (filters.eventLocation) {
      newFilteredEvents = newFilteredEvents.filter(
        (event) => event.eventLocation === filters.eventLocation
      );
    }

    // Further filter by age group if an age group is selected
    if (filters.ageGroup) {
      newFilteredEvents = newFilteredEvents.filter(
        (event) => event.preferredGender === filters.ageGroup
      );
    }

    // Further filter by date range if a date range is selected
    if (filters.fromDate && filters.toDate) {
      newFilteredEvents = newFilteredEvents.filter((event) => {
        const eventStartDate = new Date(event.fromDate).getTime();
        const eventEndDate = new Date(event.toDate).getTime();
        const filterStartDate = new Date(filters.fromDate).getTime();
        const filterEndDate = new Date(filters.toDate).getTime();
        return (
          (eventStartDate <= filterEndDate &&
            eventStartDate >= filterStartDate) ||
          (eventEndDate <= filterEndDate && eventEndDate >= filterStartDate) ||
          (eventStartDate <= filterStartDate && eventEndDate >= filterEndDate)
        );
      });
    }

    console.log(filters);
    console.log(newFilteredEvents);

    setFilteredEvents(newFilteredEvents); // Update the state with the new filtered list
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate the slice of filtered events to display based on pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onFilterSubmit={handleFilterSubmit}
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
            pageCount={Math.ceil(filteredEvents.length / eventsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventListPage;

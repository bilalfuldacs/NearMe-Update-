import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import signupImage from "../../assets/istockphoto-1305268276-612x612.jpg";
function EventCard({ event }) {
  return (
    <Card>
      <CardMedia
        component="img"
        image={signupImage} // Replace with your image path
        alt="Event"
      />
      <CardContent>
        <Typography variant="h6">{event.eventName}</Typography>
        <Typography variant="h6">
          {event.street} {event.hausNummber} {event.city} {event.postalCode}
          {event.country}
        </Typography>
        <Typography variant="h6">
          From Date: {event.fromDate}
          {"  "} To Date: {event.toDate}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EventCard;

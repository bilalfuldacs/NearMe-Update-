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
        <Typography variant="h6">{event.date}</Typography>
        <Typography variant="body2">{event.location}</Typography>
        <Typography variant="body2">{event.address}</Typography>
      </CardContent>
    </Card>
  );
}

export default EventCard;

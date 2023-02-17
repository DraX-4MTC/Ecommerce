import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Sidenavigation = () => {
  return (
    <Card style={{ boxShadow: "none" }}>
      <CardContent>
        <Typography>
          <b>Account Details</b>
        </Typography>
        <br />
        <Typography>
          <b>Price</b>
        </Typography>
        <Typography>
          <b>Price</b>
        </Typography>
        <Typography>
          <b>Price</b>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Sidenavigation;

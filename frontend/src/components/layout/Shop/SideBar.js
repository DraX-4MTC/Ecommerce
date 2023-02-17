import React from "react";
import { Slider, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const categories = [
  "Laptop",
  "Mobile",
  "Watches",
  "Head Phones",
  "Cameras",
  "Desktops",
];

const SideBar = ({ price, priceHandler, setCategory, setRatings, ratings }) => {
  return (
    <>
      <Typography variant="h5">Filters</Typography>
      <br />

      <Card variant="outlined">
        <CardContent>
          <Typography>
            <b>Price</b>
          </Typography>
          <Slider
            style={{ color: "#e1aa5e", width: "99%" }}
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={500000}
          />
        </CardContent>
      </Card>
      <br />
      <Card variant="outlined">
        <CardContent>
          <Typography>
            <b>Categories</b>
          </Typography>
          <ul style={{ margin: 0 }}>
            {categories.map((category) => (
              <li
                className="categoryLink"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <br />
      <Card variant="outlined">
        <CardContent>
          <Typography>
            <b>Ratings Above</b>
          </Typography>
          <Slider
            style={{ color: "#e1aa5e", width: "99%" }}
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="continous-slider"
            min={0}
            max={5}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default SideBar;

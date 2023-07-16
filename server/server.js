const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();
const port = 3001;
const cities = [];

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

fs.createReadStream("cities.csv")
  .pipe(csv())
  .on("data", (row) => {
    cities.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");
  });

app.get("/cities", (req, res) => {
  const { query } = req.query;
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(query.toLowerCase())
  );
  const sortedCities = filteredCities.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  res.json(sortedCities);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

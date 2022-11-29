import express from "express";
import fetch from "node-fetch";
import { apiKey } from "./sources/keys.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey.API_KEY}`
  );
  const cityWeatherData = await response.json();
  if (!response.ok) {
    res.status(404).json({ weatherText: "Respond not found!" });
  } else {
    const temp = cityWeatherData.main.temp;
    res.status(200).json({ cityName, temp });
  }
});

export default app;

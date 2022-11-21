import express from 'express';
// import { engine } from 'express-handlebars';
import fetch from 'node-fetch';
import { apiKey } from './sources/keys.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey.API_KEY}`);
    const data = await response.json();
    console.log(data);
    const temp = data.main.temp
    res.json({cityName, temp})
  } catch (error) {
    console.log(error); 
    res.json({ weatherText: "City is not found!" });
  }
});

app.listen(3000);
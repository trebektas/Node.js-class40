import express from 'express';
// import { engine } from 'express-handlebars';
// import fetch from 'node-fetch';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.send(cityName);
});

app.listen(3000);
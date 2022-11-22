import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("check GET-POST /", () => {
  it("GET request test", () => {
    expect(request.get('/').method).toBe("GET");
  });
  it("POST request test", () => {
    expect(request.post('/weather').method).toBe("POST");
  });
});

describe("check statusCode /", () => {
  it("statusCode should be 200 for the get request", async () => {
    const getResponse = await request.get('/');
    expect(getResponse.statusCode).toBe(200);
  });
  it("statusCode should be 200 for the post request with a true city name", async () => {
    const postResponse = await request.post('/weather').send({ cityName: "Rotterdam" });
    expect(postResponse.statusCode).toBe(200);
  });
  it("statusCode should be 400 for the post request with a wrong city name", async () => {
    const postResponse = await request.post('/weather').send({ cityName: "Rotterda" });
    expect(postResponse.statusCode).toBe(400);
  });
  it("statusCode should be 400 for the post request with a empty city name", async () => {
    const postResponse = await request.post('/weather').send({ cityName: "" });
    expect(postResponse.statusCode).toBe(400);
  });
});
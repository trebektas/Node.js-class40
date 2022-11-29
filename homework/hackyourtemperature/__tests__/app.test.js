import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("check GET-POST /", () => {
  it("GET request test", async () => {
    await request.get("/", (req, res) => {
      expect(req.method).toBe("GET");
    });
  });
  it("POST request test", async () => {
    await request.post("/weather", (req, res) => {
      expect(req.method).toBe("POST");
    });
  });
});

describe("check statusCode /", () => {
  it("statusCode should be 200 for the get request", async () => {
    const getResponse = await request.get("/");
    expect(getResponse.statusCode).toBe(200);
  });
  it("statusCode should be 200 for the post request with a true city name", async () => {
    const postResponse = await request
      .post("/weather")
      .send({ cityName: "Rotterdam" });
    expect(postResponse.statusCode).toBe(200);
  });
  it("statusCode should be 404 for the post request with a wrong city name", async () => {
    const postResponse = await request
      .post("/weather")
      .send({ cityName: "Rotterda" });
    expect(postResponse.statusCode).toBe(404);
  });
  it("statusCode should be 404 for the post request with a empty city name", async () => {
    const postResponse = await request.post("/weather").send({ cityName: "" });
    expect(postResponse.statusCode).toBe(404);
  });
});

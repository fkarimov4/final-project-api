require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getJobs, getFilteredJobs, getRecentJobs, getSingleJob } = require("./jobs");
const { addUser, updateUser, getUser } = require("./users");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/jobs", getJobs);
app.post("/jobs/filtered", getFilteredJobs);
app.get("/jobs/recent", getRecentJobs);
app.get("/jobs/:jobId", getSingleJob);

app.post("/users/add", addUser)
app.get("/users/:userId", getUser)
app.patch("/users/:userId", updateUser)

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

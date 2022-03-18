require("dotenv").config();
const express = require("express");
const admin = require('firebase-admin');
const cors = require("cors");
const {
  getJobs,
  getFilteredJobs,
  getRecentJobs,
  getSingleJob,
} = require("./jobs");
const { addUser, updateUser, getUser } = require("./users");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const withAuthorization = async (req, res, next) => {
  const jwt = req.headers.authorization;
  try {
    const id = await admin.auth().verifyIdToken(jwt);
    res.locals.userId = id.uid;
    res.send({
      success: true,
      message: "User authorized with token"
    })
  } catch {
    res.status(403).send("Unauthorized");
    return;
  }
  next();
};

app.get("/jobs", getJobs);
app.post("/jobs/filtered", getFilteredJobs);
app.get("/jobs/recent", getRecentJobs);
app.get("/jobs/:jobId", getSingleJob);

app.post("/users/add", withAuthorization, addUser);
app.get("/users/:userId", getUser);
app.patch("/users/:userId", withAuthorization, updateUser);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

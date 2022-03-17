const { connectDb } = require("./connectDb");

exports.getJobs = (req, res) => {
  const db = connectDb();
  db.collection("jobs")
    .get()
    .then((snapshot) => {
      const jobList = snapshot.docs.map((doc) => {
        let job = doc.data();
        job.id = doc.id;
        return job;
      });
      res.send(jobList);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getFilteredJobs = (req, res) => {
  const jobsQuery = {
    technologies: req.body.technologies,
    salaryLowerLim: req.body.salaryLowerLim,
    position: req.body.position,
    location: req.body.location,
    experience: req.body.experience,
  };
  const db = connectDb();
  db.collection("jobs")
    .get()
    .then((snapshot) => {
      const results = snapshot.docs.map((doc) => {
        let job = doc.data();
        job.id = doc.id;
        return job;
      });
      const filteredResults = results
        .filter((r) => r.location.includes(...jobsQuery.location))
        .filter((r) => r.position.includes(...jobsQuery.position))
        .filter((r) => r.experience.includes(...jobsQuery.experience))
        .filter((r) => r.technologies.includes(...jobsQuery.technologies))
        .filter((r) => r.salaryLowerLim >= jobsQuery.salaryLowerLim);
      res.send(filteredResults);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getRecentJobs = (req, res) => {
  const db = connectDb();
  db.collection("jobs")
    .orderBy("createdOn")
    .limit(9)
    .get()
    .then((snapshot) => {
      const results = snapshot.docs.map((doc) => {
        let job = doc.data();
        job.id = doc.id;
        return job;
      });
      res.send(results);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getSingleJob = (req, res) => {
  const db = connectDb();
  db.collection("jobs")
    .doc(req.params.jobId)
    .get()
    .then((doc) => {
      const job = doc.data();
      job.id = doc.id;
      res.send(job);
    })
    .catch((err) => res.status(500).send(err));
};

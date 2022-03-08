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
      res.status(200).send(jobList);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getFilteredJobs = (req, res) => {
  const jobsQuery = {
    technologiesUsed: req.body.technologiesUsed,
    salaryLowerLim: req.body.salaryLowerLim,
    jobTitle: req.body.jobTitle,
    location: req.body.location,
    experienceLevel: req.body.experienceLevel,
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
        .filter((r) => r.salaryLowerLim >= jobsQuery.salaryLowerLim)
        .filter((r) =>
          r.technologiesUsed.includes(...jobsQuery.technologiesUsed)
        )
        .filter((r) => r.jobTitle.includes(...jobsQuery.jobTitle))
        .filter((r) => r.location.includes(...jobsQuery.location))
        .filter((r) =>
          r.experienceLevel.includes(...jobsQuery.experienceLevel)
        );
      res.status(200).send(filteredResults);
    })
    .catch((err) => res.status(500).send(err));
};

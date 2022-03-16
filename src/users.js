const { connectDb } = require("./connectDb");

exports.addUser = (req, res) => {
  const db = connectDb();
  db.collection("users")
    .doc((req.body.userId))
    .set({
        userId: req.body.userId,
        savedJobs: [],
        appliedJobs: []
    })
    .then(() => {
        res.send('User created in Firebase!')
    })
    .catch((err) => res.status(500).send(err));
};

// res.send('User created');
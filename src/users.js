const { connectDb } = require("./connectDb");

exports.addUser = (req, res) => {
  const db = connectDb();
  db.collection("users")
    .doc(req.body.userId)
    .set({
      userId: req.body.userId,
      savedJobs: [],
      appliedJobs: [],
    })
    .then(() => {
      res.send({
          message: "User created in Firebase!"
      });
    })
    .catch((err) => res.status(500).send(err));
};

exports.getUser = (req, res) => {
  const { userId } = req.params;
  const db = connectDb();
  db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      const user = doc.data();
      res.send(user);
    })
    .catch((err) => res.status(500).send(err));
};

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const savedJobs = req.body.savedJobs;
  const db = connectDb();
  db.collection("users")
    .doc(userId)
    .update({ savedJobs: savedJobs })
    .then(() => {
      res.send({
        message: "User profile updated successfully!"
      });
    })
    .catch((err) => res.status(500).send(err));
};

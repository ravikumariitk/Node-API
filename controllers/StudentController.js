const Student = require("../models/Student");

// Controller functions for handling student-related operations

// Creating entry
exports.createStudent = (req, res) => {
  const Student1 = new Student({
    Name: req.query.Name,
    Roll_no: req.query.Roll_no,
    Branch: req.query,
    Branch,
  });

  Student1.save()
    .then(() => {
      res.send("Added successfully!");
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
};

//Reading entry
exports.readStudents = (req, res) => {
  const filter = {};
  if (Name) filter.Name = req.query.Name;
  if (Roll_no) filter.Roll_no = req.query.Roll_no;
  if (Branch) filter.Branch = req.query.Branch;

  Student.find(filter)
    .then((students) => {
      res.send(students);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
};

// Updating student entry
exports.updateStudent = (req, res) => {
  // Old data
  const filter = {};
  if (Name) filter.Name = req.query.Name;
  if (Roll_no) filter.Roll_no = req.query.Roll_no;
  if (Branch) filter.Branch = req.query.Branch;

  // New Data
  const update = {};
  if (New_Name) update.Name = req.query.New_Name;
  if (New_Roll_no) update.Roll_no = req.query.New_Roll_no;
  if (New_Branch) update.Branch = req.query.New_Branch;

  Student.updateMany(filter, update)
    .then(() => {
      res.send("Updated successfully!");
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
};

// Deleting entry
exports.deleteStudent = (req, res) => {
  const filter = {};
  if (Name) filter.Name = req.query.Name;
  if (Roll_no) filter.Roll_no = req.query.Roll_no;
  if (Branch) filter.Branch = req.query.Branch;

  if (filter == {}) {
    res.send("Invalid request!");
  }

  Student.deleteMany(filter)
    .then(() => {
      res.send("Deleted successfully!");
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
};

const Student = require("../models/Student");

// Controller functions for handling student-related operations

// Creating entry
exports.createStudent = (req, res) => {
  const { Name, Roll_no, Branch } = req.body;

  const Student1 = new Student({
    Name: Name,
    Roll_no: Roll_no,
    Branch: Branch,
  });

  Student1.save()
    .then(() => {
      res.send("Added successfully!");
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });

  console.log(req.body);
};

//Reading entry
exports.readStudents = (req, res) => {
  const { Name, Roll_no, Branch } = req.body;
  const filter = {};
  if (Name) filter.Name = Name;
  if (Roll_no) filter.Roll_no = Roll_no;
  if (Branch) filter.Branch = Branch;

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
  const { Name, Roll_no, Branch, New_Name, New_Roll_no, New_Branch } =
    req.body;
  
  // Old data
  const filter = {};
  if (Name) filter.Name = Name;
  if (Roll_no) filter.Roll_no = Roll_no;
  if (Branch) filter.Branch = Branch;

  // New Data
  const update = {};
  if (New_Name) update.Name = New_Name;
  if (New_Roll_no) update.Roll_no = rNew_Roll_no;
  if (New_Branch) update.Branch = New_Branch;

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
  const { Name, Roll_no, Branch } = req.body;
  const filter = {};
  if (Name) filter.Name = Name;
  if (Roll_no) filter.Roll_no = Roll_no;
  if (Branch) filter.Branch = Branch;

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

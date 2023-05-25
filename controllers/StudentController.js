const Student = require("../models/Student");
const jwt = require('jsonwebtoken');
//Token validation
function verifyToken(token, secret) {
  try {
    token=token['Session-Token'];
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    // Token verification failed
    console.error('Failed to verify token:', err.message);
    return null;
  }
}
// Controller functions for handling student-related operations
// Creating entry
exports.createStudent = (req, res) => {
  //Varifying token
  const token = req.cookies;
  const secret = process.env.TOKEN_SECRET;
  const decodedToken = verifyToken(token, secret);
  if (decodedToken) {

    //Token vrified
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
  } else {
    //Token verification failed
    res.send("Your session have been expired log in to continue.")
  }
};
//Reading entry
exports.readStudents = (req, res) => {
  //Varifying token
  const token = req.cookies;
  const secret = process.env.TOKEN_SECRET;
  const decodedToken = verifyToken(token, secret);
  if (decodedToken) {
    //Token vrified
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
  } else {
    //Token verification failed
    res.send("Your session have been expired log in to continue.")
  }
};

// Updating student entry
exports.updateStudent = (req, res) => {
  //Varifying token
  const token = req.cookies;
  const secret = process.env.TOKEN_SECRET;
  const decodedToken = verifyToken(token, secret);
  if (decodedToken) {
    //Token vrified
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
    if (New_Roll_no) update.Roll_no = New_Roll_no;
    if (New_Branch) update.Branch = New_Branch;
    Student.updateMany(filter, update)
      .then(() => {
        res.send("Updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  } else {
    //Token verification failed
    res.send("Your session have been expired log in to continue.")
  }
};

// Deleting entry
exports.deleteStudent = (req, res) => {
  //Varifying token
  const token = req.cookies;
  const secret = process.env.TOKEN_SECRET;
  const decodedToken = verifyToken(token, secret);
  if (decodedToken) {
    //Token vrified
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
  } else {
    //Token verification failed
    res.send("Your session have been expired log in to continue.")
  }
};

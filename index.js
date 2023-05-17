const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mogodb_url = MONGODB_URL;
mongoose.connect(mogodb_url);
//schema
const StudentSchema = mongoose.Schema({
    Name: String,
    Roll_no: Number,
    Branch: String
});
//model
const Student = mongoose.model('Student', StudentSchema, 'StudentData');
app.get("/", (req, res) => {
    res.send("Hello World");
})
//Creating entry
app.post("/create", (req, res) => {
    const Student1 = new Student({
        Name: req.query.Name,
        Roll_no: req.query.Roll_no,
        Branch: req.query.Branch
    });
    Student1.save();
    res.send("Added Successfully!");
});
//Reading entry
function create_obj(data) {
    let A = {};
    if (data.Name != null) {
        A["Name"] = data.Name;
    } if (data.Roll_no != null) {
        A["Roll_no"] = data.Roll_no;
    } if (data.Branch != null) {
        A["Branch"] = data.Branch;
    }
    return A;
}
app.get("/read", (req, res) => {

    let A = create_obj(req.query);
    Student.find(A).then(function (lists) {
        res.send(lists)
    });
})
//Update
app.post('/update', (req, res) => {
    let oldData=create_obj(req.query);
    let newData = { 
         Name: req.query.New_Name,
         Roll_no: req.query.New_Roll_no,
         Branch: req.query.New_Branch
         };
    Student.updateMany(oldData, newData, (err, data) => {
        if (err) res.send(err);
        else {
            res.send("Updated Successfully!");
        }
    });
});
//Deleting entry
app.get("/delete", (req, res) => {
    let A = create_obj(req.query);
    if(A==={}) 
    {
        res.send("Invalid request!");
    }
    Student.deleteMany(A).then(function (lists) {
        res.send("Deleted Successfully!")
    });
});
app.listen(3000, () => {
    console.log("Server is running");
});
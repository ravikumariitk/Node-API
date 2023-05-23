const User = require("../models/User");
const jwt = require('jsonwebtoken');
//Sign In
exports.signin = (req, res) => {
    const { user, password } = req.body;
    const filter = {};
    if (user) filter.user = user;
    if (password) filter.password = password;
    if (filter == {}) {
        res.send("Invalid request!");
    }
    User.findOne(filter, (err, data) => {
        if (err) throw err;
        if (data==null) {
            res.send("Invalid username or password!");
        }
        else {
            const token = jwt.sign({ _id: data._id }, process.env.TOKEN_SECRET, {
                expiresIn: 3600 // expires in 60 minutes
            });
            res.json({
                success: true,
                message: "Enjoy your token!",
                token: token
            });
        }
    });
}

//SignUp
exports.signup = (req, res) => {
    const { user, password } = req.body;
    const filter = {};
    if (user) filter.user = user;
    if (filter == {}) {
        res.send("Invalid request!");
    }
    User.findOne(filter, (err, data) => {
        console.log(data)
        if (err) throw err;
        else if(data!=null)
        {
            res.send("User already exists please try to login!")
        }
        else {
            const User1 = new User({
              user: filter.user,
              password: filter.password,
            });
          
            User1.save()
              .then(() => {
                res.send("User added successfully!");
              })
              .catch((err) => {
                console.error(err);
                res.send(err);
              });
        }
    });
}
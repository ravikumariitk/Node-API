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
            let new_data={};
            new_data['user']=filter.user;
            new_data['password']=filter.password;
            new_data['session_token']=token;
            User.updateOne(filter,new_data).then(() => {
                res.send("You have been logged in successfully your current session will be valid upto 60 minutes.");
              }).catch((err) => {
                res.send(err);
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
        if (err) throw err;
        else if(data!=null)
        {
            res.send("User already exists please try to login!")
        }
        else {
            const User1 = new User({
              user: filter.user,
              password: req.body.password,
              session_token:""
            });
            User1.save()
              .then(() => {
                let new_data={};
                const token = jwt.sign({ _id: User1._id }, process.env.TOKEN_SECRET, {
                    expiresIn: 3600 // expires in 60 minutes
                });
                new_data['user']=User1.user;
                new_data['password']=User1.password;
                new_data['session_token']=token;
                User.updateOne(User1, new_data).then(() => {
                    res.send("You have been signed up successfully your current session will be valid upto 60 minutes.");
                  })
                  .catch((err) => {
                    
                    res.send(err);
                  });
              })
              .catch((err) => {
                res.send(err);
              });
        }
    });
}
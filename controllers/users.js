const User = require("../models/User");
const bcrypt = require("bcryptjs");

const validateRegistration = require("../validation/register");

const userLogin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.json({ status: "fail", message: "User not found" });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return res.json({
              id: user._id,
              username: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              status: "ok",
            });
          } else {
            return res.json({ status: "fail", message: "Incorrect Password" });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
};

const userRegister = (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  if (!isValid) {
    return res.json({ status: "fail" });
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.json({ status: "fail", message: "Email already exits" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.pwd,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.json({ status: "ok" });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

module.exports.userLogin = userLogin;
module.exports.userRegister = userRegister;

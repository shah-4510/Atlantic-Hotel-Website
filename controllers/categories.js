const Category = require("../models/Category");

const sendCategory = (req, res) => {
  res.send("categories");
};

const newCategory = (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    id: req.body.id,
  });
  newCategory
    .save()
    .then((rooms) => res.json(rooms))
    .catch((err) => console.log(err));
};

module.exports.sendCategory = sendCategory;
module.exports.newCategory = newCategory;

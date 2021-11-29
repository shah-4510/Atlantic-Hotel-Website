const mongoose = require('mongoose');

// DB config
const db = "mongodb+srv://admin:admin@cluster0.xmyrl.mongodb.net/get-set-book?retryWrites=true&w=majority";

// Connect to MongoDB
const client = mongoose
                    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true} )
                    .then(console.log('MongoDB Connected'))
                    .catch(err => console.log(err));

module.exports = client;
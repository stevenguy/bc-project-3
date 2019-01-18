const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/bookkeeping"
);

let god = {
    password: 'asdfghjkl',
    photoURL: 'https://www.superherodb.com/pictures2/portraits/10/100/884.jpg?t=1492413122',
    name: 'Admin',
    email: 'notadmin@admin.com',
    role: 'Admin'
}

db.User.find(god)
    .then(dbModel => {
        if(!dbModel){
            db.User.create(god)
            .then(() => process.exit(0))
        }
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
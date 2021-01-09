const express = require("express");

const Person = require("./personschema");

// init express
const app = express();

//connect database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb+srv://chelbi:<deco1995>@cluster0.go5ta.mongodb.net/<user>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


//parsing the body
app.use(express.json());

//create and save

var createAndSavePerson = function (done) {
  let med = new Person({
    name: "meriem3",
    age: 20,
    favoriteFoods: ["Pizza"],
  });

  med.save((err, data) => {
    if (err) {
      return console.log(err);
    } else {
      done(null, data);
    }
  });
};

// Create Many Records with model.create()

var arrayOfPeople = [
  {
    name: "atef",
    age: 30,
    favoriteFoods: ["Poisson", "Viande"],
    created_at: Date.now(),
  },
  {
    name: "hbib",
    age: 30,
    favoriteFoods: ["Poisson", "Viande"],
    created_at: Date.now(),
  },
];

var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, (err, createdPeople) => {
    if (err) {
      console.log(error);
    } else {
      done(null, createdPeople);
    }
  });
};

//Use model.find() to Search Your Database

Person.find({ name: "med" }, (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(data);
  }
});

// //Use model.findOne()

Person.find({ name: "hbib" }, (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(data);
  }
});
// Use model.findById()

Person.findById("5fe48b6bee0f4323a0971d21", (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(data);
  }
});



//Perform New Updates on a Document Using model.findOneAndUpdate()

Person.findOneAndUpdate(
  { name: "atef" },
  { age: 20 },
  { new: true },
  (err, data) => {
    if (err) {
      console.log(error);
    } else {
      console.log(data);
    }
  }
);

//Delete One Document Using model.findByIdAndRemove

Person.findByIdAndRemove("5fe3be9838bb150984e30d62", (err, deleted) => {
  if (!err) {
    console.log(deleted);
  }
});

//Delete Many Documents with model.remove()

Person.remove({ name: "hbib" }, (err, data) => {
  if (!err) {
    console.log(data);
  }
});

//Chain Search Query Helpers to Narrow Search Results

Person.find({ favoriteFoods: { $all: ["burrito"] } })
  .sort({ age: "asc" })
  .limit(2)
  .select("name favoriteFoods")
  .exec((err, data) => {
    if (!err) {
      console.log(data);
    }
  });

// //Add new person
app.post("/", (req, res) => {
  let newPerson = new Person(req.body);
  newPerson
    .save()
    .then((Person) => res.status(201).send(Person))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

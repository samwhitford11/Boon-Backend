///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT
// create express app
const express = require("express");
const app = express();

 ///////////////////////////////
  // MiddleWare
  ////////////////////////////////
  app.use(cors()); 
  app.use(morgan("dev")); 
  app.use(express.json()); 
  
///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
mongoose.connect(DATABASE_URL) 
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const GiftSchema = new mongoose.Schema({
    item: String,
    image: String,
    link: String,
    notes: String,
    purchased: Boolean,
    
  });

const personSchema = new mongoose.Schema({
    name: String,
    gifts: [{type: mongoose.Types.ObjectId, ref:"Gifts"}]
})  
  
const Person = mongoose.model("Person", personSchema);
const Gifts = mongoose.model("Gifts", GiftSchema);

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("Boon App");
});
////////////////////////////////////////////////////////////////////
// PERSON ROUTES
////////////////////////////////////////////////////////////////////
// PERSON INDEX ROUTE //works
app.get("/people", async (req, res) => {
    res.json(await Person.find({}));  
});

// PERSON CREATE ROUTE //works
app.post("/addperson", async (req, res) => {
        res.json(await Person.create(req.body))
});

// PERSON UPDATE ROUTE //
app.put("/people/:id", async (req, res) => {
    res.json(await Person.findByIdAndUpdate(req.params.id, req.body, {new: true}))
});

//PERSON DELETE ROUTE
app.delete("/people/:id", async (req, res) => {
    res.json(await Person.findByIdAndDelete(req.params.id));
});

// SHOW PEOPLE ROUTE
app.get("/people/:personid", async (req, res) => {
    // res.json(await Person.findById(req.params.personid))
    const person = await Person.findById(req.params.personid).populate("gifts")
    res.json(person)
});

////////////////////////////////////////////////////////////////////
// GIFT ROUTES
////////////////////////////////////////////////////////////////////
// GIFT CREATE ROUTE
app.post("/addgift/:personid", async (req, res) => {
    // find the person of the id from req obj
    // create a var and assign it to the result of a mongoose method to find a doc with the schema of the Person model with the id matching the req param with the ref field gifts populated
    const person = await Person.findById(req.params.personid).populate("gifts")
    // create new gift from the form data 
    const gift = await Gifts.create(req.body)
    // attach new gift to person
    person.gifts.push(gift)
    // save person's data
    person.save()
    // respond w found person
    res.json(person)

});

// GIFT UPDATE ROUTE  
app.put("/gift/:id", async (req, res) => {
        res.json(await Gifts.findByIdAndUpdate(req.params.id, req.body, {new: true}))
});

// GIFT DELETE ROUTE
app.delete("/gift/:id", async (req, res) => {
        res.json(await Gifts.findByIdAndDelete(req.params.id));
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
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

// PERSON INDEX ROUTE
app.get("/people", async (req, res) => {
    res.json(await Person.find({})
    .populate("gifts"));  
});

// PERSON CREATE ROUTE
app.post("/addperson", async (req, res) => {
        res.json(await Person.create(req.body))
});

// GIFT CREATE ROUTE
app.post("/addgift", async (req, res) => {
    res.json(await Gifts.create(req.body))
});

// LINKED CREATE ROUTE - SHOW?
app.post("/linkgift/:personid/:giftid", async (req, res) => {
    const person = await Person.findById(req.params.personid)
    const gift = await Gifts.findById(req.params.giftid)
    person.gifts.push(gift)
    person.save()
    res.json(person)
});

// SHOW ROUTE
app.get("/linkgift/:personid", async (req, res) => {
    // res.json(await Person.findById(req.params.personid))
    const person = await Person.findById(req.params.personid).populate("gifts")
    res.json(person)
});

// GIFT EDIT ROUTE

// GIFT UPDATE ROUTE  
app.put("/gift/:id", async (req, res) => {
        res.json(await Gift.findByIdAndUpdate(req.params.id, req.body, {new: true}))
});

// PERSON UPDATE ROUTE

// GIFT DELETE ROUTE
app.delete("/gift/:id", async (req, res) => {
        res.json(await Gifts.findByIdAndDelete(req.params.id));
});

//PERSON DELETE ROUTE





///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));



//personid 6408f5dba2706db687311b0c

//giftid 6408f811ef59ef5d3dbbe21b
///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000, DATABASE_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));
  
///////////////////////////////
// MODELS
////////////////////////////////
const GiftSchema = new mongoose.Schema({
    name: String,
    item: String,
    image: String,
    link: String,
    notes: String,
    purchased: Boolean,
  });
  
  const Gift = mongoose.model("Gift", GiftSchema);
  
  ///////////////////////////////
  // MiddleWare
  ////////////////////////////////
  app.use(cors()); 
  app.use(morgan("dev")); 
  app.use(express.json()); 
  

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("Boon App");
});

// GIFT INDEX ROUTE
app.get("/gift", async (req, res) => {
    try{
        res.json(await Gift.find({}));
    }catch (error) {
        res.status(400).json(error);
    }
});

// GIFT CREATE ROUTE
app.post("/gift", async (req, res) => {
    try{
        res.json(await Gift.create(req.body));
    }catch (error) {
        res.status(400).json(error);
    }
});

// UPDATE ROUTE
app.put("/gift/:id", async (req, res) => {
    try{
        res.json(await Gift.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    }catch (error){
        res.status(400).json(error);
    }
});

// DELETE ROUTE
app.delete("/gift/:id", async (req, res) => {
    try{
        res.json(await Gift.findByIdAndDelete(req.params.id));
    }catch (error){
        res.status(400).json(error);
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
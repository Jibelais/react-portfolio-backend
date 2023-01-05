// Import Dependencies
const express = require("express");
const cors = require("cors");



// Import JSON files
const projects = require("./projects.json");
const about = require("./about.json");


// Create our app object
const app = express();

// set up middleware
app.use(cors());
app.use(express.json()) // parse json bodies from request
app.use(express.urlencoded({ extended: false })); // to use URL encoded 


require("dotenv").config(); 
const {PORT, DATABASE_URL} = process.env
const mongoose = require("mongoose")

//Database Connection
mongoose.connect(DATABASE_URL)
//Connection 
mongoose.connection
    .on("open", () => {console.log("You are connected to DB")})
    .on("close", () => {console.log("You are disconnected")})
    .on("error", (error)=> {console.log(error)})

// Model 
const ProjectSchema = new mongoose.Schema({
    name: String, 
    live: String, 
    git: String, 
    image: String
})
const Project = mongoose.model("Project", ProjectSchema)



//home route for testing our app
app.get("/", (req, res) => {
  res.send("Hello World");
});

// route for retrieving projects
app.get("/projects", async (req, res) => {
  // send projects via JSON
  // res.json(projects);
  try {
    res.status(200).json(await Project.find({}))
   } catch (error) {
    res.status(400).json(error)
   }
 })

 // CREATE
app.post("/projects", async (req, res) => {
  try {
    res.status(200).json(await Project.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// route for retrieving about info
app.get("/about", (req, res) => {
  // send projects via JSON
  res.json(about);
});

//declare a variable for our port number

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//handling endpoints and routers using express router

const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

//importing the router model

router.post("/signup", async (req, res) => {
  try {
    //save the person document to the database
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");

    //use generate token to generate a new jwt token here you can use anything as payload to identify the unique user

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is:", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    } //status signal from server
  }
  //endpoint to send data for data to be saved in database according to given schema
});

//login route for token assignment

router.post("/login", async (req, res) => {
  try {
    //extract the username and password from the request body
    const { username, password } = req.body;

    //find the user in database using username
    const user = await Person.findOne({ username: username });

    //if user doesnot exist or the password does not match, return error

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    //genrate tokens

    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    //return token as response
    res.json({token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}); 
  
//Profile Route

router.get('/profile',jwtAuthMiddleware, async(req,res)=>{
try{
const userData = req.user;
console.log("User Data: ",userData)

const userId = userData.id;
const user = await Person.findById(userId);
res.status(200).json({user});
}catch(err){
console.log(err);
res.status(500).json({error: "Internal Server Error" });
}
})

//get method to get the person

router.get("/",jwtAuthMiddleware,async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched!");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//parameterized api call
router.get("/:workType", async (req, res) => {
  //parameterized api call
  try {
    const workType = req.params.workType; //extract the work type from the url parameter
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//route for update operation
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from the url parameter
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return the updated document
        runValidators: true, //run the mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    //assuming you have a person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "person deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

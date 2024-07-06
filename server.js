// const jsonString = '{"name":"kashish","age":"29","city":"Chennai"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

// const objectToConvert = {
//     name:'Alice',
//     age:25
// }

// const jsonStringified = JSON.stringify(objectToConvert);
// console.log( jsonStringified);

const express = require("express");
const app = express(); //app se server bnega

//import database connection object
const db = require("./db");

//import person model through which all db operations and connectivity is performed
const Person = require("./models/Person");
const menuItem = require("./models/Menu");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //to parse json data and store it in req.body for further use

app.get("/", function (req, res) {
  res.send("Hello World...How can i help you?");
});
app.get("/pizza", function (req, res) {
  res.send("sure sir,i would love to serve you pizza");
});
app.get("/idli", function (req, res) {
  var customised_idli = {
    name: "rava idli",
    size: "10 cm diameter",
    is_sambhar: true,
    is_chutney: false,
  };
  res.send(customised_idli);
});

/* app.post('/items', async(req,res)=>{
  try {
    //save the person document to the database
    const data = req.body;
    const newItem = new menuItem(data);
    const response = await newItem.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    } 
  }
})

app.get('/items', async(req,res)=>{
  try {
    const data = await menuItem.find();
    console.log("data fetched!");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}) */

//importing router files 

const personRoutes= require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes')
//use the routers
app.use('/person',personRoutes);
app.use('/items',menuRoutes);


/* app.post("/person", async (req, res) => {
  // const data = req.body //assume request body contains person data

  //create a new person document using the mongoose model

  //const newPerson= new Person(data);

  // newPerson.name = data.name;
  // newPerson.age = data.age;
  // newPerson.work = data.work;
  // newPerson.mobile = data.mobile;
  // newPerson.email = data.email;
  // newPerson.address = data.address;
  // newPerson.salary = data.salary;

  //this is altternative of the above length code that is to directly pass data rather than storing every field

  // newPerson.save((error,savedPerson)=>{
  //   if(error){
  //     console.log('Error saving person details:',error);
  //     res.status(500).json({error:'Internal server error'}) //status signal from server 500 means error response 
  //   }else{
  //     console.log('person saved successfully:',person); 
  //     res.status(200).json(savedPerson)
  //   }  

  try {
    //save the person document to the database
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    } //status signal from server
  }
  //endpoint to send data for data to be saved in database according to given schema
});

//get method to get the person

app.get("/person", async (req, res) => {
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

app.get('/person/:workType', async(req,res)=>{     //parameterized api call 
  try{
        const workType = req.params.workType;//extract the work type from the url parameter
         if(workType=='chef'||workType=='waiter'||workType=='manager'){
              const response = await Person.find({work:workType})
              console.log("data fetched");
              res.status(200).json(response);
         }else{
          res.status(404).json({error:'Invalid work type'});
         }
         }catch(err){
          console.log(err);
          if (!res.headersSent) {
            res.status(500).json({ error: "Internal server error" });
          }
        }
}) 

*/

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
  

/* crud operations and their http methods 
create - put (save)
read - get   (fetch)
update - patch/put
delete - delete
jab /method hit hoga post ke through toh kya hoga.....
*/


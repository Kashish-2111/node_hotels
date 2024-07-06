const express = require('express');
const router = express.Router();
const menuItem = require("./../models/Menu");

router.post('/', async(req,res)=>{
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
  
  router.get('/', async(req,res)=>{
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
  })

  router.get('/:tasteType',async(req,res)=>{
    try{
        const tastetype = req.params.tasteType;
      if(tastetype=='sweet'||tastetype=='spicy'||tastetype=='sour'||tastetype=='salty'||tastetype=='bitter'){
        const response = await menuItem.find({taste:tastetype});
        console.log('data fetched!');
        res.status(200).json(response);
      }
    }catch(err){
        consoke.log(err);
        if(!res.headersSent){
            res.status(500).json({error:'Invalid taste type'})
        }
    }
  })

  router.put("/:id", async(req,res) => {
    try {
      const itemId = req.params.id; //extract the id from the url parameter
      const updatedItemData = req.body;
      const response = await menuItem.findByIdAndUpdate(
        itemId,
        updatedItemData,
        {
          new: true, //return the updated document
          runValidators: true, //run the mongoose validation
        }
      );
      if (!response) {
        return res.status(404).json({ error: "Item not found" });
      }
      console.log("data updated");
      res.status(200).json(response);
    }catch(err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error"});
    }
  });
  
  router.delete('/:id',async(req,res)=>{
      try{
         const itemId = req.params.id;
         //assuming you have a person model
         const response = await menuItem.findByIdAndDelete(itemId);
         if(!response){
          return res.status(404).json({error:"Item not found"})
         }
          console.log("data deleted");
          res.status(200).json({message:'Item deleted successfully!'});
      }catch(err){
          console.log(err);
          res.status(500).json({error:"Internal Server Error"});
      }
  })


  //comment for testing purpose 
  module.exports=router;

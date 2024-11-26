const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItem.js')


//Post route to save a new menu item to the database
router.post('/', async (req, res) => {
    try{

        const data = req.body  //Assuming the request body contains the menu item data

        //create a new MenuItem document using the Mongoose model
        const newMenuItem = new MenuItem(data);//assuming data is an object with the menu item's details

        //save the document to the database
        const response = await newMenuItem.save(); 
        console.log('Menu Item saved successfully');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }  
})



//Get route to fetch all menu items from the database
router.get('/', async (req, res) => {
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(error){
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
})



//Get route to fetch all menu items of a particular taste from the database
router.get('/:tasteType', async (req, res) => {
  try{
    const tasteType = req.params.tasteType;
    if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){
      const data = await MenuItem.find({taste: tasteType});
      console.log('Item fetched');
      res.status(200).json(data);
    }else{
      res.status(404).json({error: 'Invalid Taste Type'});
    }
  }catch(error){
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

//Put route to update a menu item in the database
router.put('/:id', async (req, res) => {
  try{
    const menuItemId = req.params.id; //assuming the menu item id is passed as a route parameter
    const updatedMenuItemData = req.body; //assuming the updated menu item data is passed in the request body

    const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
      new: true, //return the updated document
      runValidators: true, //run the model validators
    });

    if(!response){
      return res.status(404).json({error: 'Menu Item not found'});
    }

    console.log('Menu Item data updated successfully');
    res.status(200).json(response);
  }catch(error){
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//Delete route to delete a menu item from the database
router.delete('/:id', async (req, res) => {
  try{
    const menuItemId = req.params.id; //assuming the menu item id is passed as a route parameter

    const response = await MenuItem.findByIdAndDelete(menuItemId);

    if(!response){
      return res.status(404).json({error: 'Menu Item not found'});
    }

    console.log('Menu Item deleted successfully');
    res.status(200).json({message: 'Menu Item deleted successfully'});
  }catch(error){
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
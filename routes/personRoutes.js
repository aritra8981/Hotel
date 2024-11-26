const express = require('express');
const router = express.Router();
const Person = require('./../models/person.js')

//Post route to save a new person to the database
router.post('/', async (req, res) => {
    try{

        const data = req.body  //Assuming the request body contains the person data

        //create a new Person document using the Mongoose model
        const newPerson = new Person(data);//assuming data is an object with the person's details

        //save the document to the database
        const response = await newPerson.save(); 
        console.log('Person saved successfully');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }

    // const data = req.body  //Assuming the request body contains the person data

    // //create a new Person document using the Mongoose model
    // const newPerson = new Person(data);//assuming data is an object with the person's details

    // //save the document to the database
    // newPerson.save((error, savedPerson)=>{
    //   if(error){
    //     console.log('Error saving the person: ', error);
    //     res.status(500).send(error, 'Internal Server Error');
    //   }
    //   else{
    //     console.log('Person saved successfully:', Person);
    //     res.status(200).send(savedPerson);
    //   }
    //   })
})


//Get route to fetch all persons from the database
router.get('/', async (req, res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

 //Get route to fetch all persons of a particular work type from the database
router.get('/:workType', async (req, res) => { 
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const data = await Person.find({work: workType});
            console.log('data fetched');
            res.status(200).json(data);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


//Put route to update a person's details in the database
router.put('/:id', async (req, res) =>{
    try{
        const personId = req.params.id; //assuming the person id is passed as a route parameter
        const updatedPersonData = req.body; //assuming the updated person data is passed in the request body

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return the updated document
            runValidators: true, //run the model validators
        });

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('Person data updated successfully');

    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//Delete route to delete a person from the database
router.delete('/:id', async (req, res) =>{
    try{
        const personId = req.params.id; //assuming the person id is passed as a route parameter

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('Person data deleted successfully');
        res.status(200).json({message: 'Person deleted successfully'});
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;
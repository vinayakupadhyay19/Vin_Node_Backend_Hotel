const express = require('express');
const router = express.Router();
const Person = require('../models/person');

//For person api enpoint
router.post('/post', async (req, res) => {
    try {
        //Extract the data from the request.
        const data = req.body;
        //Create a new person documnet using  the Mongoose model.

        const newPerson = new Person(data);

        const savedPerson = await newPerson.save();
        console.log('Saved.. !');
        res.status(200).json(savedPerson);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error ' });
    }
});



//For person api enpoint
router.get('/getPersonData', async (req, res) => {
    try {

        const data = await Person.find();
        console.log('Retrived.. !');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error ' });
    }
});


//For person api enpoint
router.get('/:workType', async (req, res) => {

    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const data = await Person.find({ work: workType });
            if (data.length === 0) {
                res.status(200).json({ messege: ' Sorry ! No data found for the given work type.' });
            }
            console.log('Retrived.. !');
            res.status(200).json(data);
        } else {
            res.status(200).json({ messege: 'No data found for the given work type ! Please enter valid work type.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//For person api endpoint
router.put('/:id' , async(req , res) =>{
     try{
        const personId = req.params.id; // Extracting the id from the URL parameter
        const updatedPersonData = req.body; //Upload data for the person.
        const response = await Person.findByIdAndUpdate(personId , updatedPersonData , {
            new : true , // Return the updated document 
            runValidators : true  //Run mongoose validation
        });

        if(!response){
            res.status(404).json({error : 'Person not found'});
            return;
        }

        console.log("Data Updated !");
        res.status(200).json({response});
        return;
     }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error !'});
     }
});


//For Person api endpoint
router.delete('/:id' , async(req, res) =>{
    try{
        const personId = req.params.id;
        
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            res.status(404).json({error : 'Person not found !'});
            return;
        }

        console.log('Data Deleted !');
        res.status(200).json({messege : 'Data deleted successfully !'});
        return;

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error !'});
    }

});

module.exports = router;
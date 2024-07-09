const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const { genToken,jwtAuthMiddleware } = require('../jwt');


//For person login api endpoint

router.post('/login' , async (req, res) =>{
    try{
        //Extract the username and password from the request
        const {username , password} = req.body;

        //Find the username 

        const user = await Person.findOne({username: username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({ message: 'Invalid Credentials {Username or Password}' });
        }

        // generate token 
        const payload = {
            id : user.id,
            username : user.username
        }

        const token = genToken(payload);

        return res.json({token})

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error ' });
    }
})

//For person profile endpoint

router.get('/profile' ,jwtAuthMiddleware, async (req, res) =>{
    try{
        const userData = req.userTokenInfo;
        console.log('User Data : ' +userData.id);

        const userId = userData.id;
        const userProfile = await Person.findById(userId);

        return res.status(200).json(userProfile);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error ' });
    }
})

//For person api enpoint
router.get('/getPersonData',jwtAuthMiddleware, async (req, res) => {
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
router.get('/:workType', jwtAuthMiddleware,async (req, res) => {

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
router.put('/:id' , jwtAuthMiddleware ,async(req , res) =>{
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
router.delete('/:id' ,jwtAuthMiddleware, async(req, res) =>{
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
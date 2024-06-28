const express = require('express');
const router = express.Router();
const MenuItems = require('../models/menuItem');


//For menu api endpoint
router.get('/menu', (req, res) => {
    res.send('Hello ! I am in menu page');
});



//For menu api enpoint
router.post('/menuItems', async (req, res) => {
    try {
        
        const data = req.body;

        const newMenuItem = new MenuItems(data);
        const savedMenuItem = await newMenuItem.save();

        console.log('Saved.. !');
        res.status(200).json(savedMenuItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error ' });
    }
})

//For menu api enpoint
router.get('/getAllMenu', async (req, res) => {
    try {

        const getAllData = await MenuItems.find();
        console.log('Retrived.. !');
        res.status(200).json(getAllData);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//For menu api endpoint

router.put('/menu/:id' , async (req, res) =>{
    try{

        const menuId = req.params.id;
        const updatedData = req.body;

        const response = await MenuItems.findByIdAndUpdate(menuId , updatedData, {
            new : true , // Return the updated document 
            runValidators : true  //Run mongoose validation
        });

        console.log("Data Updated Successfully !");
        res.status(200).json(response);
        return ;
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Inernal Server Error  !'});
    }

});

//For menu api endpoint
router.delete('/menu/:id' , async(req, res)=>{
    try{
        const menuId = req.params.id;

        const response  = await MenuItems.findByIdAndDelete(menuId);

        if(!response){
            res.status(200).json({messege : "Please check the id. It is not correct !"})
            return ;
        }

        console.log("Deleted Sucessfully !");
        res.status(200).json(response);
        return;
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error !'});
    }
})

module.exports = router;
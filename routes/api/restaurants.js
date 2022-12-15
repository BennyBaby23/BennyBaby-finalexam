const express = require('express');
const { create } = require('hbs');

const router =express.Router(); 


const Restaurant = require('../../models/restaurant');


//Lists all restaurants in the database 
router.get('/', (req,res,next) => {

   
    Restaurant.find((err, restaurants) => {
        if(err){
            console.log(err);
            res.json('Error! Try Again properly').status(500);
        }else{
            res.json(restaurants).status(200);
        }
    });
    
});

//Creates a new restaurant record in the database with the information provided
//crud functionality
//create
router.post('/', (req,res,next) => {
    //  console.log(req.body);
    //  res.status(200).json(req.body);
    
    if(!req.body.name){
        res.status(400).json({'ValidationError': 'Name is a required field'});
    }else if(!req.body.address){
        res.status(400).json({'ValidationError': 'Address is a required field'});
    }else if(!req.body.phoneNumber){
        res.status(400).json({'ValidationError': 'Phone Number: is a required field'});
    }
    else{
        //creating each restaurant object if pass threw validation
        Restaurant.create({
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            emailAddress: req.body.emailAddress,
            rating: req.body.rating

    
        },(err, newRestaurant)=>{
            if(err){
                console.log(err);
                res.status(500).json({'ErrorMessage': 'Server threw an exception'});
            }
            else{
                res.status(200).json(newRestaurant);
            }
    
        })
    }
    });


//delete functionality with id
//Removes the restaurant from the database
router.delete('/_id', (req, res, next)=>{
    Restaurant.remove({
        _id: req.params._id
    },(err)=>{
        if(err){
            console.log(err);
            res.status(500).json({'ErrorMessage': 'Server threw an exception'});
        }else{
            res.status(200).json({'Successfully deleted': 'true'});
        }

    })
});

//export the module to use it in app.js
module.exports = router;
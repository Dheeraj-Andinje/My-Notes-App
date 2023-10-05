const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator'); //to validate data in user request

const User = require("../models/User");//user shceama model
const bcrypt = require("bcrypt");    //password hashing
const jwt = require('jsonwebtoken');  //for web tokens
const fetchuser= require("../middleware/fetchuser");

const jwtstring = "dog cat cow $";
//create user using post
router.post('/createuser', [body('Name', "Name should be  minimum length  of 3").isLength({ min: 3 }),
body('Email', "enter valis mail").isEmail(),
body('Password', "password shouid have minimum 5 chars").isLength({ min: 5 })],
    async (req, res) => {

        const err = validationResult(req);
        const nextstep = async () => {
            if (!err.isEmpty()) {
                console.log(err.array())
                return res.status(400).json({ error: err.array() });
            }
            let user = await User.findOne({ Email: req.body.Email });
            if (user) {
                res.status(400).json({ error: "sorry email is already exist" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.Password, salt);


            user = await User.create({
                Name: req.body.Name,
                Email: req.body.Email,
                Password: secPass,
                Date: req.body.Date
            })
                .then(user => {
                    const data = {
                        user: {
                            id: user.id
                        }
                    }
                    const jwtData = jwt.sign(data, jwtstring)
                    res.json({ authToken: jwtData })
                })
                .catch(er => { console.log("error.....!" + er) });
            //      res.json({error:"pleas enter valid email"})})
            // const user=User(req.body);
            // user.save();
            // res.send(req.body);
        }
        try {
            nextstep();
        } catch (error) {
            return res.status(500).json({ "error": "internal server error" });
        }
       

    })

//Authenthicate user using Post
router.post('/login', [
    body('Email', "enter valis mail").isEmail(),
    body('Password', "password shouid have minimum 5 chars").isLength({ min: 5 })],
    async (req, res) => {
        console.log(req.body);
        const err = validationResult(req);
        if (!err.isEmpty()) {
            console.log(err.array())
            return res.status(400).json({ error: err.array() });
        }
        const   {Email,Password}= await req.body;
        try {
            let user = await User.findOne({Email});
            console.log({user});
            if(!user){
                return res.status(400).json({ "error": "Sorry Please login with correct credentials" });

            }
            const passwordcompare=await bcrypt.compare(Password,user.Password)
            

            if(!passwordcompare){
                return res.status(400).json({ "error": "Sorry Please login with correct credentials" });

            }
            const payload = {
                user: {
                    id: user.id
                }
                
            }
            const jwtData = jwt.sign(payload, jwtstring)
            res.json({ authToken: jwtData })

        } catch (error) {
            return res.status(500).json({ "error": "internal server error" });
        }
    })

//Route 3-Get loged in user details using post-login required
router.post('/getuser', fetchuser,
    async (req, res) => {
try {
    const userId=req.user.id;
    const user= await User.findById(userId).select("-Password");
    res.json(user);
} catch (error) {
    return res.status(500).json({ "error": "internal server error" });
}
});

module.exports = router;

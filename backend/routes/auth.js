const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var JWT_SECRET = "BhargabisgoingGod$Mode";
var fetchuser = require('../middleware/fetchuser')

//Route 1: Create a New User using:POST "/api/auth/createuser".No login required 
router.post('/createuser',
    [body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email!").isEmail(),
    body('password', "Password should be of length 5 or more").isLength({ min: 5 })],
    async (req, res) => {
        let success=false;

        //If there are errors, return BadRequests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        //Check whether a user with the same email exists already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "Sorry a user with same email already exists! Check or Enter a new email" })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //Create User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            success=true;
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({success, authtoken });
        } catch (error) { //send error if there is any
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    })

//Route 2: Authenticate a User using:POST "/api/auth/login".No login required 
router.post('/login',
    body('email', "Enter a valid email!").isEmail(),
    body('password', "Password cannot be blank").exists(),
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Username doesn't match with the password" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Username doesn't match with the password" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    })

//Route 3: Get user details using :POST "/api/auth/getuser".login required 
router.post('/getuser', fetchuser, async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;

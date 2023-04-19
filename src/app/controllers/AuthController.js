const Users = require('./../models/User'); 
const { mongooseToObject } = require('../../util/monggoose');
const { response } = require('express'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class AuthController {
    //[POST] /auth/register
    register(req, res, next) {
      const { email, nickname, password } = req.body; 
      // Check if user with given email already exists
      Users.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(409).json({ message: 'Email is already in use' });
        }

        // Hash the password
        return bcrypt.hash(password, 10);
      })
      .then(hashedPassword => {
        // Create a new user
        const newUser = new Users({ email, nickname, password: hashedPassword });
        return newUser.save();
      })
      .then(newUser => {
        // Create and sign a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: '1h'
        });
        

        // Return the token
        res.status(201).json({ token });
      })
      .catch(error => {
        // console.error(error);
        console.log('JWT_SECRET:........', process.env.JWT_SECRET);
        console.log('JWT_PRIVATE_KEY:.....',process.env.JWT_PRIVATE_KEY);
        res.status(500).json({ message: 'Server Error' });
      });
    }
    // register = async (req, res) => {
    //   const { email, nickname, password } = req.body;  
    //   try {
    //     // Check if a user with the provided email already exists
    //     const existingUser = await Users.findOne({ email }); 
    //     if (existingUser) {
    //       return res.status(409).json({ message: 'Email already in use' });
    //     }
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     // Create a new user object
    //     const user = new Users({ email, nickname, password: hashedPassword }); 
    //     // Save the user object to the database
    //     await user.save(); 
    //     // Create a JWT token with the user ID as the payload
    //     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    //       expiresIn: '1h'
    //     });
    //     // Return the token as the response body
    //     res.status(201).json({ token }); 
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Server error' });
    //   }
    // };
     


    //[POST] /auth/login
    // login(req, res, next){ 
    //     Users.findOne({ email: req.body.email, password: req.body.password })
    //         .then(user => res.json(user))
    //         .catch(next);
    // }

    login = async (req, res) => {
        const { email, password } = req.body;
      
        // Look for a user with the provided email address
        const user = await User.findOne({ email });
      
        // If no user is found, return an error
        if (!user) {
          return res.status(401).json({ message: 'Incorrect email or password' });
        }
      
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
      
        // If the passwords don't match, return an error
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Incorrect email or password' });
        }
        // Helper function to create a JWT
        const createToken = (userId) => {
            // You'll need to import the JWT library and provide your own secret here
            const token = jwt.sign({ userId }, 'mySecretKey', { expiresIn: '1h' });
            return token;
        }
      
        // If the email and password are correct, create a JWT and return it to the client
        const token = createToken(user._id);
      
        res.status(200).json({ token });
      };
      
        

    //[POST] /auth/logout
    logout(req, res, next){
        res.send("logout success");

    }

    //[GET] /auth/me
     

     
    //[GET] /auth/
    index(req, res, next) {
        res.send('Auth Controller');
    }

}

module.exports = new AuthController();

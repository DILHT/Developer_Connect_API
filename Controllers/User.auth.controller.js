import bcrypt from 'bcrypt';
import User from '../Models/user.model.js';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try{
        const { username, email, password } = req.body;

        //check if all fields are provided
        const userexists = await User.findOne({ where: { email } });
        if(userexists){
            return res.status(400).json({ message: "Email Already Registered" });
        }

        //hash the password
        const hashedpassword = await bcrypt.hash(password, 10);

        //create a new user
        const user = await User.create({
            username,
            email,
            password: hashedpassword,
            // bio: req.body.bio || '',
            // website: req.body.website || ''
        })

        //create a token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                // bio: user.bio,
                // website: user.website
            }
        })

    }catch(error){
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//login part

export const login = async (req,res) => {
    try{
        const { email, password } = req.body;

        //check if email is provided
        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        //find user by email
        const user = await User.findOne({ where: { email } });
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        //check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid password" });
        }
        //create a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                // bio: user.bio,
                // website: user.website
            }
        });

        

    }catch(error){
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
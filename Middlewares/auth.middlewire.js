import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

export const protect = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try{

            token = req.headers.authorization.split(' ')[1];

            //Verify JWT

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //find user in DB
            const user = await User.findByPk(decoded.id);

            if(!user){
                return res.status(401).json({ message: "USer not found"});
            }


            req.user = user;
            next();

        } catch {
            res.status(401).json({ message: "Invalid token"})
        }
    };



    
};

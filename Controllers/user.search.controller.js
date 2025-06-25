import User from "../Models/user.model.js";
import { Op } from "sequelize";

export const SearchUserByTech = async(req,res) => {
        
    try{

        const { tech } = req.query;

        if(!tech){
            return res.status(400).json({ message: "Please provide a Tech  stack keyword"});
        }

        const users = await User.findAll({
            where:{
                skills:{
                    [Op.like] : `%${tech}%`
                }
            },
            attributes: ['id','username','email','bio','skills','profileImage','github','linkedin']
        });

        res.status(200).json({
            message: "User matching tech stack",
            results: users

        });

    }catch(error){
        console.log("Error Searching user :", error);
        res.status(500).json({ message: "Internal Server error"});
    }
};
import User from "../Models/user.model.js";


export const updateProfile = async (req,res) => {
    try{
        const user = await User.findByPk(req.user.id); //get auth user
        if(!user){
            return res.status(404).json({ message: "USer Not FOund"});
        }

        const { bio, skills, website, github, linkedin } = req.body;

        user.bio = bio || user.bio;
        user.skills = skills || user.skills;
        user.website = website || user.website;
        user.github = github || user.github;
        user.linkedin = linkedin || user.linkedin;

        //for image
        if(req.file){
            user.profileImage = `/uploads/${req.file.filename}`
        }

        await user.save();
        res.json({
            message:'Profile Updated',
            user
        });

    } catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error"})
    }
}
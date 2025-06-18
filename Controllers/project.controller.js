import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try{
        const { name, description, image, toolsUsed } = req.body;
        const userId = req.user.id;

        const project = await Project.create({
            name,
            description,
            image,
            toolsUsed,
            userId
        });

        res.status(201).json({
            message: "Project created successfully",
            project
        });

    }catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
};

export const getProjects = async (req, res) => {
    try{
        const userId = req.user.id;

        const projects = await Project.findAll({
            where: { userId},
            attributes: ['id', 'name', 'description', 'image', 'toolsUsed', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            message: "Projects retrieved successfully",
            projects
        });

    } catch(error) {
        console.error("Error getting projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
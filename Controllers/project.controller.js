import Project from "../Models/project.model.js";

export const createProject = async (req, res) => {
    try{
        const { title, description, toolsUsed } = req.body;
        const userId = req.user.id;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const project = await Project.create({
            title,
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
            attributes: ['id', 'title', 'description', 'image', 'toolsUsed', 'createdAt'],
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
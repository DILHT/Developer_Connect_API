/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: My Awesome Project
 *         description:
 *           type: string
 *           example: A project to connect developers
 *         image:
 *           type: string
 *           example: https://example.com/image.jpg
 *         toolsUsed:
 *           type: string
 *           example: React, Node.js, MongoDB
 *         userId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - title
 *         - description
 *         - userId
 */


import sequelize from "../config/database.js";
import { STRING } from "sequelize";
import User from "./user.model.js";


const Project = sequelize.define('Project',{
    title:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3,20]
        }
    },
    description:{
        type: STRING,
        allowNull:false,
        
    },
    image:{
        type: STRING
    },
    toolsUsed:{
        type: STRING
    }
});

//each project belongs to a user
Project.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
    });

  //each user can have multiple projects
    User.hasMany(Project, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export default Project;
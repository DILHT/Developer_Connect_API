import sequelize from "../config/database.js";
import { STRING } from "sequelize";
import User from "./user.model.js";


const Project = sequelize.define('Project',{
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            isAlphanumeric:true,
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
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: devuser
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         bio:
 *           type: string
 *           example: Full-stack developer
 *         website:
 *           type: string
 *           example: https://myportfolio.com
 *         skills:
 *           type: string
 *           example: JavaScript, React, Node.js
 *         github:
 *           type: string
 *           example: https://github.com/username
 *         linkedin:
 *           type: string
 *           example: https://linkedin.com/in/username
 *         profileImage:
 *           type: string
 *           example: /uploads/profile-123.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - username
 *         - email
 *         - password
 */


import { STRING, TEXT, JSON } from 'sequelize';
import sequelize from '../config/database.js'; 

const User = sequelize.define('User',{
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isAlphanumeric: true,
            len: [3, 20] // Username must be between 3 and 20 characters
        }
    },
    email:{
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, //  correct email
            notEmpty: true
        }
    },
    password:{
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 100] // Password must be between 6 and 100 characters
        }
    },
    bio:{
        type: STRING,
        defaultValue: '',
    },
    website:{
        type: STRING,
        defaultValue: '',
        // validate: {
        //     isUrl: true // Validates that the website is in a proper URL format
        // }
    },
    skills:{
        type: TEXT,
        defaultValue: ''
    },
    github:{
        type: STRING,
        defaultValue:''
    },
    linkedin:{
        type : STRING,
        defaultValue:''
    },
    sociallinks:{
        type: JSON,
        defaultValue: {}
    },
    profileImage:{
        type:STRING,
        defaultValue:''
    }

}, {
    timestamps:true

});


export default User;

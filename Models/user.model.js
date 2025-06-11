import { STRING } from 'sequelize';
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
            isEmail: true, // Validates that the email is in a proper format
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
    }
});


export default User;

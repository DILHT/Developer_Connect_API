import express from 'express';
import { register } from '../Controllers/User.auth.controller.js';
import { login } from '../Controllers/User.auth.controller.js';

const userroute = express.Router();

userroute.post('/register', register);
userroute.post('/login', login);

export default userroute;
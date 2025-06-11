import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database.js';
import userroute from './Routes/user.route.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userroute);

//sync db
sequelize.sync()
    .then(() => {
        console.log('Database synchronized successfully');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
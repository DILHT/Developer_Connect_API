// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();

// // const sequelize = new Sequelize(process.env.DB_NAME || process.env.DATABASE_URL, process.env.DB_USER, process.env.DB_PASSWORD, {
// //     host: process.env.DB_HOST,
// //     port: process.env.DB_PORT, 
// //     dialect: 'mysql',
    
// // });
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'mysql',
//     dialectOptions: {
//     ssl: {
//         require: true,
//       rejectUnauthorized: false // may be needed for Railway
//     },
//     },
//     logging: false,
// });

// export default sequelize;

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = isProduction 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false,
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      logging: false
    });

export default sequelize;
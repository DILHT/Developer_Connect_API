// config/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
    openapi: '3.0.0',
    info: {
    title: 'DevConnect API',
        version: '1.0.0',
        description: 'API for developer collaboration platform',
        contact: {
            name: 'Daniel Kasambala',
            email: 'danielkasambala51@gmail.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            },
        },
    },
    security: [{
        bearerAuth: [],
    }],
    },
  apis: ['./Routes/*.js','./Models/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
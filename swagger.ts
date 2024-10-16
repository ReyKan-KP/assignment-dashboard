import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API',
      version: '1.0.0',
      description: 'API documentation for the Next.js application',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // Change this to your server URL
      },
    ],
  },
  apis: ['./pages/api/*.ts'], // Path to your API files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };

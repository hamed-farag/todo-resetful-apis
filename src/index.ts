import path from "path";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

import { routes } from "./routes";

const app = express();

app.use(express.json());

routes(app);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Todo App",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data for Todo.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions

  apis: [
    path.join(
      __dirname,
      process.env.NODE_ENV === "development" ? "/routes.ts" : "./routes.js"
    ),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);

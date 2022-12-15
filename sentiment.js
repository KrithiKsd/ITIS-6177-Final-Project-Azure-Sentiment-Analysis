const express = require('express')
const app = express()
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const route = require('./routes/mainRoute');

const port = 3002

app.use(cors());
//swagger definition
const options = {
    swaggerDefinition: {
      info: {
        title: "Sentiment Analysis using Azure",
        version: "1.0.0",
        description: "Sentiment analysis, detecting keyphrases and finding the language from the given sentence using Microsoft Azure API. ",
      },
      host: "localhost:3002",
      basePath: "/",
    },
    apis: ["./routes/mainRoute.js"],
  };

const specs = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(route);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
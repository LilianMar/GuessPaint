import { AppDataSource } from "./data-source";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { wordRouter } from "./routes/words.routes";
import { categoryRouter } from "./routes/category.routes";
import { wordCategoryRouter } from "./routes/wordCategory.routes";
import {roomRouter} from "./routes/room.routes";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerSpec from './swagger';
const cors = require('cors');
var express = require('express');
var app = express();
const PORT = 3000;
//const wsInstance = require('express-ws')(app);
//const websocketRouter = require('../src/routes/socket.routes')(wsInstance);
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/api", wordRouter);
app.use("/api", categoryRouter);
app.use("/api", wordCategoryRouter);
app.use("/api", roomRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use('/ws', websocketRouter);

AppDataSource.initialize()
    .then(async () => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));


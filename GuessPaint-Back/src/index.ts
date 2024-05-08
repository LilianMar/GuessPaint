import express from 'express';
import cors from 'cors';
import expressWs from 'express-ws';
import { errorHandler } from './middleware/errorHandler';
import { wordRouter } from './routes/words.routes';
import { categoryRouter } from './routes/category.routes';
import { wordCategoryRouter } from './routes/wordCategory.routes';
import { roomRouter } from './routes/room.routes';
import { websocketRouter } from './routes/socket.routes';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerSpec from './swagger';
import { AppDataSource } from './data-source';

const app: express.Application = express();
const expressWsInstance:expressWs.Instance = expressWs(app);
//const wsInstance = require('express-ws')(app);
//const websocketRouter = require('../src/routes/socket.routes')(wsInstance);
const PORT = 3000;
const API_PREFIX = '/api';
const API_DOCS_PREFIX = '/api-docs';

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(API_DOCS_PREFIX, swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(API_PREFIX, wordRouter);
app.use(API_PREFIX, categoryRouter);
app.use(API_PREFIX, wordCategoryRouter);
app.use(API_PREFIX, roomRouter);
websocketRouter('/ws', app, expressWsInstance);
//app.use("/ws", websocketRouter);


AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        console.log('Data Source has been initialized!');
    })
    .catch((error) => console.log(error));

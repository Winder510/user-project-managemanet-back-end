import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoutes from './routes/api'
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
configViewEngine(app);

initWebRoutes(app);

app.listen(PORT, () => {
    console.log("running in port + " + PORT);
})
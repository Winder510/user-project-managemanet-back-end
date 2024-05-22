import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoutes from './routes/web'
import bodyParser from 'body-parser'
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

configViewEngine(app);

initWebRoutes(app);

app.listen(PORT, () => {
    console.log("running in port + " + PORT);
})
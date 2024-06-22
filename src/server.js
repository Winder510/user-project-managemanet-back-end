require("dotenv").config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import configCors from "./configs/cors";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//config cookie parser
app.use(cookieParser());

configViewEngine(app);
configCors(app);

initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log("running in port + " + PORT);
});

import express from "express";
import ApiController from "../controller/apiController";
const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/test", ApiController.test);
  router.post("/register", ApiController.handleRegister);

  return app.use("/api/v1/", router);
};
export default initApiRoutes;

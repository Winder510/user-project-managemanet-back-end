import express from "express";
import ApiController from "../controller/apiController";
const router = express.Router();

const initApiRoutes = (app) => {
  router.post("/register", ApiController.handleRegister);
  router.post("/login", ApiController.handleLogin);

  return app.use("/api/v1/", router);
};
export default initApiRoutes;

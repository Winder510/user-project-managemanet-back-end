import express from "express";
import ApiController from "../controller/apiController";
import UserController from "../controller/userController";
const router = express.Router();

const initApiRoutes = (app) => {
  // rest api
  // get - R , Post - c , put -u , delete- d
  router.post("/register", ApiController.handleRegister);
  router.post("/login", ApiController.handleLogin);

  router.get("/user/read", UserController.readFunc);
  router.get("/user/create", UserController.createFunc);
  router.get("/user/update", UserController.updateFunc);
  router.get("/user/delete", UserController.deleteFunc);

  return app.use("/api/v1/", router);
};
export default initApiRoutes;

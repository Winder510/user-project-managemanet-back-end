import express from "express";
import ApiController from "../controller/apiController";
import UserController from "../controller/userController";
import groupController from "../controller/groupController";
const router = express.Router();

const initApiRoutes = (app) => {
  // rest api
  // get - R , Post - c , put -u , delete- d
  router.post("/register", ApiController.handleRegister);
  router.post("/login", ApiController.handleLogin);

  router.get("/user/read", UserController.readFunc); // de lay duoc page & limit sai req.querry
  router.post("/user/create", UserController.createFunc);
  router.put("/user/update", UserController.updateFunc);
  router.delete("/user/delete", UserController.deleteFunc);

  router.get("/group/read", groupController.readFunc);
  return app.use("/api/v1/", router);
};
export default initApiRoutes;

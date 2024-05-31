import db from "../models/index";
const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    return {
      EM: "Get list success", //error message
      EC: "0", //eroor code
      DT: users, //data
    };
  } catch (e) {
    return {
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    };
  }
};
const createUser = async () => {};
const updateUser = async () => {};
const deleteUser = async () => {};
module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};

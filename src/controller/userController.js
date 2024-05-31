import UserApiService from "../service/userApiService";
const readFunc = async (req, res) => {
  try {
    let data = await UserApiService.getAllUser();
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //eroor code
      DT: data.DT, //data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    });
  }
};
const createFunc = async (req, res) => {
  try {
    let data = await UserApiService.createUser();
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    let data = await UserApiService.updateUser();
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    let data = await UserApiService.deleteUser();
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};

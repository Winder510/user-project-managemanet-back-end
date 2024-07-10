import UserApiService from "../service/userApiService";
import roleApiService from "../service/roleApiService";
const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await roleApiService.getRoleWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //eroor code
        DT: data.DT, //data
      });
    } else {
      let data = await roleApiService.getAllUser();
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //eroor code
        DT: data.DT, //data
      });
    }
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
    // validate
    let data = await roleApiService.createNewRoles(req.body);
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
const updateFunc = async (req, res) => {
  try {
    let data = await UserApiService.updateUser(req.body.userData);
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
const deleteFunc = async (req, res) => {
  try {
    console.log("req.body.id, ", req.body.id);
    let data = await roleApiService.deleteRole(req.body.id);
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

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};

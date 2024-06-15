import db from "../models/index";
const getGroups = async () => {
  try {
    let groups = await db.Group.findAll();

    return {
      EM: "Get group success", //error message
      EC: 0, //eroor code
      DT: groups, //data
    };
  } catch (e) {
    return {
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    };
  }
};
module.exports = {
  getGroups,
};

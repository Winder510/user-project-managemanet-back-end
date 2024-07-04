import db from "../models/index";
const createNewRoles = async (roles) => {
  try {
    let curRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });
    const persists = roles.filter(
      ({ url: url1 }) => !curRoles.some(({ url: url2 }) => url1 === url2)
    );
    if (persists.length === 0) {
      return {
        EM: "Nothing to save", //error message
        EC: "0", //eroor code
        DT: [],
      };
    }
    await db.Role.bulkCreate(persists);
    return {
      EM: `Create success: ${persists.length} roles`, //error message
      EC: "0", //eroor code
      DT: [], //data
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
  createNewRoles,
};

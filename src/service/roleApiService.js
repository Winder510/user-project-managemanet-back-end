import { includes } from "lodash";
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
const getRoleWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.Role.findAndCountAll({
      offset: offset,
      limit: +limit,
      attributes: ["id", "url", "description"],
    });
    const plainRows = rows.map((row) => row.get({ plain: true }));

    let totalPages = Math.ceil(+count / +limit);
    let data = {
      totalRows: count,
      totalPages,
      data: plainRows,
    };

    return {
      EM: "success", //error message
      EC: 0, //eroor code
      DT: data, //data
    };
  } catch (e) {
    return {
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    };
  }
};
const deleteRole = async (id) => {
  try {
    await db.Role.destroy({
      where: {
        id: id,
      },
    });
    return {
      EM: "delete success", //error message
      EC: "0", //eroor code
      DT: "", //data
    };
  } catch (e) {
    return {
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    };
  }
};
const getAllRole = async () => {
  try {
    let roles = await db.Role.findAll({
      attributes: ["id", "url", "description"],
    });
    const plainRows = roles.map((row) => row.get({ plain: true }));

    return {
      EM: "Get list success", //error message
      EC: "0", //eroor code
      DT: plainRows, //data
    };
  } catch (e) {
    return {
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    };
  }
};
const getRolesByGroupService = async (id) => {
  try {
    if (!id) {
      return {
        EM: "Not found any roles", //error message
        EC: "0", //eroor code
        DT: [],
      };
    }
    let roles = await db.Group.findOne({
      where: { id: id },
      attributes: ["id", "name", "description"],
      include: [
        {
          model: db.Role,
          attributes: ["id", "url", "description"],
          through: { attributes: [] },
        },
      ],
    });
    return {
      EM: "get success", //error message
      EC: "0", //eroor code
      DT: roles, //data
    };
  } catch (e) {
    return {
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: [],
    };
  }
};
const assignRoleToGroupService = async (data) => {
  try {
    await db.Group_Role.destroy({
      where: { groupId: +data.groupId },
    });
    await db.Group_Role.bulkCreate(data.groupRoles);
    return {
      EM: "Assign role success", //error message
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
  getRoleWithPagination,
  deleteRole,
  getAllRole,
  getRolesByGroupService,
  assignRoleToGroupService,
};

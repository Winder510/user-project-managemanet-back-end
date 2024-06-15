import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
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

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: +limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
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
const createUser = async (rawUser) => {
  try {
    let hashPass = hashUserPassword(rawUser.password);

    await db.User.create({
      ...rawUser,
      password: hashPass,
    });
    return {
      EM: "Create user success ", //error message
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
const updateUser = async (rawUser) => {
  try {
    await db.User.update(
      { ...rawUser },
      {
        where: {
          id: rawUser.id,
        },
      }
    );
    return {
      EM: "Update user success ", //error message
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
const deleteUser = async (userid) => {
  try {
    await db.User.destroy({
      where: {
        id: userid,
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
module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};

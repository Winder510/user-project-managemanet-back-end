import db from "../models/index";
import bcrypt from "bcryptjs";
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";
import { Op } from "sequelize";
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (user) {
    return true;
  }
  return false;
};
const registerNewUser = async (rawUserData) => {
  try {
    let isEmailExist = await checkEmailExist(rawUserData.email);
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: "1",
      };
    }
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already exist",
        EC: "1",
      };
    }
    let hashPassword = hashUserPassword(rawUserData.password);

    //create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone,
      groupId: 4,
    });

    return {
      EM: "Create successfully",
      EC: 0,
    };
  } catch (e) {
    return {
      EM: "Some thing wrong in service",
      EC: -2,
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true
};
const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    user = user.dataValues;
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      let groupWithRole = await getGroupWithRoles(user);
      let payload = {
        email: user.email,
        groupWithRole,
        username: user.username,
      };
      let token = createJWT(payload);
      if (isCorrectPassword) {
        return {
          EM: "Success",
          EC: "0",
          DT: {
            access_token: token,
            groupWithRole,
            email: user.email,
            username: user.username,
          },
        };
      }
    }
    return {
      EM: "Email/phone or password is not exist",
      EC: "-1",
      DT: "",
    };
  } catch (e) {
    return {
      EM: "Some thing wrong in service",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
};

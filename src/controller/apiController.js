import loginRegisterService from "../service/loginRegisterService.js";
const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters", //error message
        EC: "-1", //eroor code
        DT: "", //data
      });
    }

    //service create user
    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //eroor code
      DT: "", //data
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Error from server", //error message
      EC: "-1", //eroor code
      DT: "", //data
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    let rawData = req.body;
    let data = await loginRegisterService.handleUserLogin(rawData);
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

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
  handleRegister,
  handleLogin,
};

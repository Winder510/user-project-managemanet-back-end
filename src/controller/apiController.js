const test = () => {};
const handleRegister = (req, res) => {
  console.log("check>>>>>", req.body);
};

module.exports = {
  test,
  handleRegister,
};

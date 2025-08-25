const TransferFlowServiceRestController = require("./TransferFlowServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new TransferFlowServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};

const TransferFlowServiceMcpController = require("./TransferFlowServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new TransferFlowServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};

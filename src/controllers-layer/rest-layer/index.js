const mainRouters = require("./main");
const sessionRouter = require("./session-router");
module.exports = {
  ...mainRouters,
  TransferFlowServiceRestController: require("./TransferFlowServiceRestController"),
  ...sessionRouter,
};

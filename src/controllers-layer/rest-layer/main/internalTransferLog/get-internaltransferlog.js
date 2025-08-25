const { GetInternalTransferLogManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class GetInternalTransferLogRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("getInternalTransferLog", "getinternaltransferlog", req, res);
    this.dataName = "internalTransferLog";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetInternalTransferLogManager(this._req, "rest");
  }
}

const getInternalTransferLog = async (req, res, next) => {
  const getInternalTransferLogRestController =
    new GetInternalTransferLogRestController(req, res);
  try {
    await getInternalTransferLogRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getInternalTransferLog;

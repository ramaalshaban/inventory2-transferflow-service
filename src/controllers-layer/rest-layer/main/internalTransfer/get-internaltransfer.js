const { GetInternalTransferManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class GetInternalTransferRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("getInternalTransfer", "getinternaltransfer", req, res);
    this.dataName = "internalTransfer";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetInternalTransferManager(this._req, "rest");
  }
}

const getInternalTransfer = async (req, res, next) => {
  const getInternalTransferRestController =
    new GetInternalTransferRestController(req, res);
  try {
    await getInternalTransferRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getInternalTransfer;

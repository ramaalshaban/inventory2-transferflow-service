const { GetInternalTransferLineManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class GetInternalTransferLineRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("getInternalTransferLine", "getinternaltransferline", req, res);
    this.dataName = "internalTransferLine";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetInternalTransferLineManager(this._req, "rest");
  }
}

const getInternalTransferLine = async (req, res, next) => {
  const getInternalTransferLineRestController =
    new GetInternalTransferLineRestController(req, res);
  try {
    await getInternalTransferLineRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getInternalTransferLine;

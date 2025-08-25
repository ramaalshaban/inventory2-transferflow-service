const { GetInternalTransferByStatusManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class GetInternalTransferByStatusRestController extends TransferFlowRestController {
  constructor(req, res) {
    super(
      "getInternalTransferByStatus",
      "getinternaltransferbystatus",
      req,
      res,
    );
    this.dataName = "internalTransfer";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetInternalTransferByStatusManager(this._req, "rest");
  }
}

const getInternalTransferByStatus = async (req, res, next) => {
  const getInternalTransferByStatusRestController =
    new GetInternalTransferByStatusRestController(req, res);
  try {
    await getInternalTransferByStatusRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getInternalTransferByStatus;

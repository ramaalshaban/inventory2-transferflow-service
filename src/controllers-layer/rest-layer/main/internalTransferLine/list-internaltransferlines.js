const { ListInternalTransferLinesManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class ListInternalTransferLinesRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("listInternalTransferLines", "listinternaltransferlines", req, res);
    this.dataName = "internalTransferLines";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListInternalTransferLinesManager(this._req, "rest");
  }
}

const listInternalTransferLines = async (req, res, next) => {
  const listInternalTransferLinesRestController =
    new ListInternalTransferLinesRestController(req, res);
  try {
    await listInternalTransferLinesRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listInternalTransferLines;

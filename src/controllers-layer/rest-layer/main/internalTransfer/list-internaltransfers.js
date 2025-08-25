const { ListInternalTransfersManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class ListInternalTransfersRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("listInternalTransfers", "listinternaltransfers", req, res);
    this.dataName = "internalTransfers";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListInternalTransfersManager(this._req, "rest");
  }
}

const listInternalTransfers = async (req, res, next) => {
  const listInternalTransfersRestController =
    new ListInternalTransfersRestController(req, res);
  try {
    await listInternalTransfersRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listInternalTransfers;

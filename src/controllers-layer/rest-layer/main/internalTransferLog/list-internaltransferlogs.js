const { ListInternalTransferLogsManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class ListInternalTransferLogsRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("listInternalTransferLogs", "listinternaltransferlogs", req, res);
    this.dataName = "internalTransferLogs";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListInternalTransferLogsManager(this._req, "rest");
  }
}

const listInternalTransferLogs = async (req, res, next) => {
  const listInternalTransferLogsRestController =
    new ListInternalTransferLogsRestController(req, res);
  try {
    await listInternalTransferLogsRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listInternalTransferLogs;

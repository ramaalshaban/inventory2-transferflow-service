const { DeleteInternalTransferLogManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class DeleteInternalTransferLogRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("deleteInternalTransferLog", "deleteinternaltransferlog", req, res);
    this.dataName = "internalTransferLog";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteInternalTransferLogManager(this._req, "rest");
  }
}

const deleteInternalTransferLog = async (req, res, next) => {
  const deleteInternalTransferLogRestController =
    new DeleteInternalTransferLogRestController(req, res);
  try {
    await deleteInternalTransferLogRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteInternalTransferLog;

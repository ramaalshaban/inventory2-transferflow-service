const { UpdateInternalTransferLogManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class UpdateInternalTransferLogRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("updateInternalTransferLog", "updateinternaltransferlog", req, res);
    this.dataName = "internalTransferLog";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateInternalTransferLogManager(this._req, "rest");
  }
}

const updateInternalTransferLog = async (req, res, next) => {
  const updateInternalTransferLogRestController =
    new UpdateInternalTransferLogRestController(req, res);
  try {
    await updateInternalTransferLogRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateInternalTransferLog;

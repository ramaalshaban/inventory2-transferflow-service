const { UpdateInternalTransferManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class UpdateInternalTransferRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("updateInternalTransfer", "updateinternaltransfer", req, res);
    this.dataName = "internalTransfer";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateInternalTransferManager(this._req, "rest");
  }
}

const updateInternalTransfer = async (req, res, next) => {
  const updateInternalTransferRestController =
    new UpdateInternalTransferRestController(req, res);
  try {
    await updateInternalTransferRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateInternalTransfer;

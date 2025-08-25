const { DeleteInternalTransferManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class DeleteInternalTransferRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("deleteInternalTransfer", "deleteinternaltransfer", req, res);
    this.dataName = "internalTransfer";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteInternalTransferManager(this._req, "rest");
  }
}

const deleteInternalTransfer = async (req, res, next) => {
  const deleteInternalTransferRestController =
    new DeleteInternalTransferRestController(req, res);
  try {
    await deleteInternalTransferRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteInternalTransfer;

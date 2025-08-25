const { DeleteInternalTransferLineManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class DeleteInternalTransferLineRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("deleteInternalTransferLine", "deleteinternaltransferline", req, res);
    this.dataName = "internalTransferLine";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteInternalTransferLineManager(this._req, "rest");
  }
}

const deleteInternalTransferLine = async (req, res, next) => {
  const deleteInternalTransferLineRestController =
    new DeleteInternalTransferLineRestController(req, res);
  try {
    await deleteInternalTransferLineRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteInternalTransferLine;

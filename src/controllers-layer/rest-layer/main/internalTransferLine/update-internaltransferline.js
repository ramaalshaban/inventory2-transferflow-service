const { UpdateInternalTransferLineManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class UpdateInternalTransferLineRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("updateInternalTransferLine", "updateinternaltransferline", req, res);
    this.dataName = "internalTransferLine";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateInternalTransferLineManager(this._req, "rest");
  }
}

const updateInternalTransferLine = async (req, res, next) => {
  const updateInternalTransferLineRestController =
    new UpdateInternalTransferLineRestController(req, res);
  try {
    await updateInternalTransferLineRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateInternalTransferLine;

const { CreateInternalTransferLineManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class CreateInternalTransferLineRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("createInternalTransferLine", "createinternaltransferline", req, res);
    this.dataName = "internalTransferLine";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateInternalTransferLineManager(this._req, "rest");
  }
}

const createInternalTransferLine = async (req, res, next) => {
  const createInternalTransferLineRestController =
    new CreateInternalTransferLineRestController(req, res);
  try {
    await createInternalTransferLineRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createInternalTransferLine;

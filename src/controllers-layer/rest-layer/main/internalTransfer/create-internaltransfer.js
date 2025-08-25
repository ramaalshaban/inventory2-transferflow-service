const { CreateInternalTransferManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class CreateInternalTransferRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("createInternalTransfer", "createinternaltransfer", req, res);
    this.dataName = "internalTransfer";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateInternalTransferManager(this._req, "rest");
  }
}

const createInternalTransfer = async (req, res, next) => {
  const createInternalTransferRestController =
    new CreateInternalTransferRestController(req, res);
  try {
    await createInternalTransferRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createInternalTransfer;

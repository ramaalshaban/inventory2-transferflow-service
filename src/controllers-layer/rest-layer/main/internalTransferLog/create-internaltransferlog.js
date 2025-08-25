const { CreateInternalTransferLogManager } = require("managers");

const TransferFlowRestController = require("../../TransferFlowServiceRestController");

class CreateInternalTransferLogRestController extends TransferFlowRestController {
  constructor(req, res) {
    super("createInternalTransferLog", "createinternaltransferlog", req, res);
    this.dataName = "internalTransferLog";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateInternalTransferLogManager(this._req, "rest");
  }
}

const createInternalTransferLog = async (req, res, next) => {
  const createInternalTransferLogRestController =
    new CreateInternalTransferLogRestController(req, res);
  try {
    await createInternalTransferLogRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createInternalTransferLog;

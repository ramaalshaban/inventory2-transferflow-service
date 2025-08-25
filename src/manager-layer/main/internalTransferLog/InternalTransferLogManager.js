const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const TransferFlowServiceManager = require("../../service-manager/TransferFlowServiceManager");

/* Base Class For the Crud Routes Of DbObject InternalTransferLog */
class InternalTransferLogManager extends TransferFlowServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "internalTransferLog";
    this.modelName = "InternalTransferLog";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = InternalTransferLogManager;

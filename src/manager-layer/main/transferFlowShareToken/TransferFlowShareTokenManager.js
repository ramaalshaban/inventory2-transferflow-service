const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const TransferFlowServiceManager = require("../../service-manager/TransferFlowServiceManager");

/* Base Class For the Crud Routes Of DbObject TransferFlowShareToken */
class TransferFlowShareTokenManager extends TransferFlowServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "transferFlowShareToken";
    this.modelName = "TransferFlowShareToken";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = TransferFlowShareTokenManager;

const ApiManager = require("./ApiManager");

class TransferFlowServiceManager extends ApiManager {
  constructor(request, options) {
    super(request, options);
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }
}

module.exports = TransferFlowServiceManager;

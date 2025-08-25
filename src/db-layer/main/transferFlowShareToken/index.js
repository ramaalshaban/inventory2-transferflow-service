const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createTransferFlowShareToken: utils.createTransferFlowShareToken,
  getIdListOfTransferFlowShareTokenByField:
    utils.getIdListOfTransferFlowShareTokenByField,
  getTransferFlowShareTokenById: utils.getTransferFlowShareTokenById,
  getTransferFlowShareTokenAggById: utils.getTransferFlowShareTokenAggById,
  getTransferFlowShareTokenListByQuery:
    utils.getTransferFlowShareTokenListByQuery,
  getTransferFlowShareTokenStatsByQuery:
    utils.getTransferFlowShareTokenStatsByQuery,
  getTransferFlowShareTokenByQuery: utils.getTransferFlowShareTokenByQuery,
  updateTransferFlowShareTokenById: utils.updateTransferFlowShareTokenById,
  updateTransferFlowShareTokenByIdList:
    utils.updateTransferFlowShareTokenByIdList,
  updateTransferFlowShareTokenByQuery:
    utils.updateTransferFlowShareTokenByQuery,
  deleteTransferFlowShareTokenById: utils.deleteTransferFlowShareTokenById,
  deleteTransferFlowShareTokenByQuery:
    utils.deleteTransferFlowShareTokenByQuery,
};

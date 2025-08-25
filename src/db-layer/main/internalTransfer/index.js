const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetInternaltransfer: require("./dbGetInternaltransfer"),
  dbGetInternaltransferbystatus: require("./dbGetInternaltransferbystatus"),
  dbCreateInternaltransfer: require("./dbCreateInternaltransfer"),
  dbUpdateInternaltransfer: require("./dbUpdateInternaltransfer"),
  dbDeleteInternaltransfer: require("./dbDeleteInternaltransfer"),
  dbListInternaltransfers: require("./dbListInternaltransfers"),
  createInternalTransfer: utils.createInternalTransfer,
  getIdListOfInternalTransferByField: utils.getIdListOfInternalTransferByField,
  getInternalTransferById: utils.getInternalTransferById,
  getInternalTransferAggById: utils.getInternalTransferAggById,
  getInternalTransferListByQuery: utils.getInternalTransferListByQuery,
  getInternalTransferStatsByQuery: utils.getInternalTransferStatsByQuery,
  getInternalTransferByQuery: utils.getInternalTransferByQuery,
  updateInternalTransferById: utils.updateInternalTransferById,
  updateInternalTransferByIdList: utils.updateInternalTransferByIdList,
  updateInternalTransferByQuery: utils.updateInternalTransferByQuery,
  deleteInternalTransferById: utils.deleteInternalTransferById,
  deleteInternalTransferByQuery: utils.deleteInternalTransferByQuery,
};

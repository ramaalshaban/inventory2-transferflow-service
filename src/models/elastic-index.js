const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const internalTransferMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  sourceBranchId: { type: "keyword", index: true },
  sourceSectionId: { type: "keyword", index: true },
  destinationBranchId: { type: "keyword", index: true },
  destinationSectionId: { type: "keyword", index: true },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  reason: { type: "keyword", index: true },
  note: { type: "text", index: false },
  transferDate: { type: "date", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const internalTransferLineMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  internalTransferId: { type: "keyword", index: true },
  bookId: { type: "keyword", index: true },
  quantity: { type: "integer", index: false },
  note: { type: "text", index: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const internalTransferLogMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  internalTransferId: { type: "keyword", index: true },
  transferLineId: { type: "keyword", index: true },
  eventType: { type: "keyword", index: true },
  eventType_: { type: "keyword" },
  oldStatus: { type: "keyword", index: false },
  oldStatus_: { type: "keyword" },
  newStatus: { type: "keyword", index: false },
  newStatus_: { type: "keyword" },
  note: { type: "text", index: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const transferFlowShareTokenMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  configName: { type: "keyword", index: true },
  objectName: { type: "keyword", index: true },
  objectId: { type: "keyword", index: true },
  ownerId: { type: "keyword", index: true },
  peopleOption: { type: "keyword", index: true },
  tokenPermissions: { type: "keyword", index: true },
  allowedEmails: { type: "keyword", index: true },
  expireDate: { type: "date", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("internalTransfer", internalTransferMapping);
    await new ElasticIndexer("internalTransfer").updateMapping(
      internalTransferMapping,
    );
    ElasticIndexer.addMapping(
      "internalTransferLine",
      internalTransferLineMapping,
    );
    await new ElasticIndexer("internalTransferLine").updateMapping(
      internalTransferLineMapping,
    );
    ElasticIndexer.addMapping(
      "internalTransferLog",
      internalTransferLogMapping,
    );
    await new ElasticIndexer("internalTransferLog").updateMapping(
      internalTransferLogMapping,
    );
    ElasticIndexer.addMapping(
      "transferFlowShareToken",
      transferFlowShareTokenMapping,
    );
    await new ElasticIndexer("transferFlowShareToken").updateMapping(
      transferFlowShareTokenMapping,
    );
  } catch (err) {
    hexaLogger.insertError(
      "UpdateElasticIndexMappingsError",
      { function: "updateElasticIndexMappings" },
      "elastic-index.js->updateElasticIndexMappings",
      err,
    );
  }
};

module.exports = updateElasticIndexMappings;

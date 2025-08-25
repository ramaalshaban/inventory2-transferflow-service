const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const InternalTransfer = require("./internalTransfer");
const InternalTransferLine = require("./internalTransferLine");
const InternalTransferLog = require("./internalTransferLog");
const TransferFlowShareToken = require("./transferFlowShareToken");

InternalTransfer.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  // set enum Index and enum value
  const statusOptions = ["initiated", "inTransit", "completed", "canceled"];
  const dataTypestatusInternalTransfer = typeof data.status;
  const enumIndexstatusInternalTransfer =
    dataTypestatusInternalTransfer === "string"
      ? statusOptions.indexOf(data.status)
      : data.status;
  data.status_idx = enumIndexstatusInternalTransfer;
  data.status =
    enumIndexstatusInternalTransfer > -1
      ? statusOptions[enumIndexstatusInternalTransfer]
      : undefined;

  return data;
};

InternalTransferLine.prototype.getData = function () {
  const data = this.dataValues;

  data.internalTransfer = this.internalTransfer
    ? this.internalTransfer.getData()
    : undefined;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  return data;
};

InternalTransferLine.belongsTo(InternalTransfer, {
  as: "internalTransfer",
  foreignKey: "internalTransferId",
  targetKey: "id",
  constraints: false,
});

InternalTransferLog.prototype.getData = function () {
  const data = this.dataValues;

  data.internalTransfer = this.internalTransfer
    ? this.internalTransfer.getData()
    : undefined;
  data.internalTransferLine = this.internalTransferLine
    ? this.internalTransferLine.getData()
    : undefined;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  // set enum Index and enum value
  const eventTypeOptions = [
    "created",
    "statusChanged",
    "lineAdded",
    "lineUpdated",
    "lineRemoved",
    "canceled",
    "completed",
  ];
  const dataTypeeventTypeInternalTransferLog = typeof data.eventType;
  const enumIndexeventTypeInternalTransferLog =
    dataTypeeventTypeInternalTransferLog === "string"
      ? eventTypeOptions.indexOf(data.eventType)
      : data.eventType;
  data.eventType_idx = enumIndexeventTypeInternalTransferLog;
  data.eventType =
    enumIndexeventTypeInternalTransferLog > -1
      ? eventTypeOptions[enumIndexeventTypeInternalTransferLog]
      : undefined;
  // set enum Index and enum value
  const oldStatusOptions = ["initiated", "inTransit", "completed", "canceled"];
  const dataTypeoldStatusInternalTransferLog = typeof data.oldStatus;
  const enumIndexoldStatusInternalTransferLog =
    dataTypeoldStatusInternalTransferLog === "string"
      ? oldStatusOptions.indexOf(data.oldStatus)
      : data.oldStatus;
  data.oldStatus_idx = enumIndexoldStatusInternalTransferLog;
  data.oldStatus =
    enumIndexoldStatusInternalTransferLog > -1
      ? oldStatusOptions[enumIndexoldStatusInternalTransferLog]
      : undefined;
  // set enum Index and enum value
  const newStatusOptions = ["initiated", "inTransit", "completed", "canceled"];
  const dataTypenewStatusInternalTransferLog = typeof data.newStatus;
  const enumIndexnewStatusInternalTransferLog =
    dataTypenewStatusInternalTransferLog === "string"
      ? newStatusOptions.indexOf(data.newStatus)
      : data.newStatus;
  data.newStatus_idx = enumIndexnewStatusInternalTransferLog;
  data.newStatus =
    enumIndexnewStatusInternalTransferLog > -1
      ? newStatusOptions[enumIndexnewStatusInternalTransferLog]
      : undefined;

  return data;
};

InternalTransferLog.belongsTo(InternalTransfer, {
  as: "internalTransfer",
  foreignKey: "internalTransferId",
  targetKey: "id",
  constraints: false,
});

InternalTransferLog.belongsTo(InternalTransferLine, {
  as: "internalTransferLine",
  foreignKey: "transferLineId",
  targetKey: "id",
  constraints: false,
});

TransferFlowShareToken.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  data._owner = data.ownerId ?? undefined;
  return data;
};

module.exports = {
  InternalTransfer,
  InternalTransferLine,
  InternalTransferLog,
  TransferFlowShareToken,
  updateElasticIndexMappings,
};

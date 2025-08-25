const {
  getInternalTransferById,
  getIdListOfInternalTransferByField,
} = require("dbLayer");
const {
  getInternalTransferLineById,
  getIdListOfInternalTransferLineByField,
} = require("dbLayer");
const {
  getInternalTransferLogById,
  getIdListOfInternalTransferLogByField,
} = require("dbLayer");
const {
  getTransferFlowShareTokenById,
  getIdListOfTransferFlowShareTokenByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexInternalTransferData = async () => {
  const internalTransferIndexer = new ElasticIndexer("internalTransfer", {
    isSilent: true,
  });
  console.log("Starting to update indexes for InternalTransfer");

  const idList =
    (await getIdListOfInternalTransferByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getInternalTransferById(chunk);
    if (dataList.length) {
      await internalTransferIndexer.indexBulkData(dataList);
      await internalTransferIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexInternalTransferLineData = async () => {
  const internalTransferLineIndexer = new ElasticIndexer(
    "internalTransferLine",
    { isSilent: true },
  );
  console.log("Starting to update indexes for InternalTransferLine");

  const idList =
    (await getIdListOfInternalTransferLineByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getInternalTransferLineById(chunk);
    if (dataList.length) {
      await internalTransferLineIndexer.indexBulkData(dataList);
      await internalTransferLineIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexInternalTransferLogData = async () => {
  const internalTransferLogIndexer = new ElasticIndexer("internalTransferLog", {
    isSilent: true,
  });
  console.log("Starting to update indexes for InternalTransferLog");

  const idList =
    (await getIdListOfInternalTransferLogByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getInternalTransferLogById(chunk);
    if (dataList.length) {
      await internalTransferLogIndexer.indexBulkData(dataList);
      await internalTransferLogIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexTransferFlowShareTokenData = async () => {
  const transferFlowShareTokenIndexer = new ElasticIndexer(
    "transferFlowShareToken",
    { isSilent: true },
  );
  console.log("Starting to update indexes for TransferFlowShareToken");

  const idList =
    (await getIdListOfTransferFlowShareTokenByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getTransferFlowShareTokenById(chunk);
    if (dataList.length) {
      await transferFlowShareTokenIndexer.indexBulkData(dataList);
      await transferFlowShareTokenIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexInternalTransferData();
    console.log(
      "InternalTransfer agregated data is indexed, total internalTransfers:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing InternalTransfer data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexInternalTransferLineData();
    console.log(
      "InternalTransferLine agregated data is indexed, total internalTransferLines:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing InternalTransferLine data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexInternalTransferLogData();
    console.log(
      "InternalTransferLog agregated data is indexed, total internalTransferLogs:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing InternalTransferLog data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexTransferFlowShareTokenData();
    console.log(
      "TransferFlowShareToken agregated data is indexed, total transferFlowShareTokens:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing TransferFlowShareToken data",
      err.toString(),
    );
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;

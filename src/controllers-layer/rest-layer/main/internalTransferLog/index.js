const express = require("express");

// InternalTransferLog Db Object Rest Api Router
const internalTransferLogRouter = express.Router();

// add InternalTransferLog controllers

// getInternalTransferLog controller
internalTransferLogRouter.get(
  "/internaltransferlogs/:internalTransferLogId",
  require("./get-internaltransferlog"),
);
// createInternalTransferLog controller
internalTransferLogRouter.post(
  "/internaltransferlogs",
  require("./create-internaltransferlog"),
);
// updateInternalTransferLog controller
internalTransferLogRouter.patch(
  "/internaltransferlogs/:internalTransferLogId",
  require("./update-internaltransferlog"),
);
// deleteInternalTransferLog controller
internalTransferLogRouter.delete(
  "/internaltransferlogs/:internalTransferLogId",
  require("./delete-internaltransferlog"),
);
// listInternalTransferLogs controller
internalTransferLogRouter.get(
  "/internaltransferlogs",
  require("./list-internaltransferlogs"),
);

module.exports = internalTransferLogRouter;

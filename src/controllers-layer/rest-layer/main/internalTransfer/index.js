const express = require("express");

// InternalTransfer Db Object Rest Api Router
const internalTransferRouter = express.Router();

// add InternalTransfer controllers

// getInternalTransfer controller
internalTransferRouter.get(
  "/internaltransfers/:internalTransferId",
  require("./get-internaltransfer"),
);
// getInternalTransferByStatus controller
internalTransferRouter.get(
  "/internaltransferbystatus/:internalTransferId",
  require("./get-internaltransferbystatus"),
);
// createInternalTransfer controller
internalTransferRouter.post(
  "/internaltransfers",
  require("./create-internaltransfer"),
);
// updateInternalTransfer controller
internalTransferRouter.patch(
  "/internaltransfers/:internalTransferId",
  require("./update-internaltransfer"),
);
// deleteInternalTransfer controller
internalTransferRouter.delete(
  "/internaltransfers/:internalTransferId",
  require("./delete-internaltransfer"),
);
// listInternalTransfers controller
internalTransferRouter.get(
  "/internaltransfers",
  require("./list-internaltransfers"),
);

module.exports = internalTransferRouter;

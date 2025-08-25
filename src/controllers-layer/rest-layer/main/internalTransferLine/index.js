const express = require("express");

// InternalTransferLine Db Object Rest Api Router
const internalTransferLineRouter = express.Router();

// add InternalTransferLine controllers

// getInternalTransferLine controller
internalTransferLineRouter.get(
  "/internaltransferlines/:internalTransferLineId",
  require("./get-internaltransferline"),
);
// createInternalTransferLine controller
internalTransferLineRouter.post(
  "/internaltransferlines",
  require("./create-internaltransferline"),
);
// updateInternalTransferLine controller
internalTransferLineRouter.patch(
  "/internaltransferlines/:internalTransferLineId",
  require("./update-internaltransferline"),
);
// deleteInternalTransferLine controller
internalTransferLineRouter.delete(
  "/internaltransferlines/:internalTransferLineId",
  require("./delete-internaltransferline"),
);
// listInternalTransferLines controller
internalTransferLineRouter.get(
  "/internaltransferlines",
  require("./list-internaltransferlines"),
);

module.exports = internalTransferLineRouter;

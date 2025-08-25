module.exports = (headers) => {
  // InternalTransferLog Db Object Rest Api Router
  const internalTransferLogMcpRouter = [];
  // getInternalTransferLog controller
  internalTransferLogMcpRouter.push(
    require("./get-internaltransferlog")(headers),
  );
  // createInternalTransferLog controller
  internalTransferLogMcpRouter.push(
    require("./create-internaltransferlog")(headers),
  );
  // updateInternalTransferLog controller
  internalTransferLogMcpRouter.push(
    require("./update-internaltransferlog")(headers),
  );
  // deleteInternalTransferLog controller
  internalTransferLogMcpRouter.push(
    require("./delete-internaltransferlog")(headers),
  );
  // listInternalTransferLogs controller
  internalTransferLogMcpRouter.push(
    require("./list-internaltransferlogs")(headers),
  );
  return internalTransferLogMcpRouter;
};

module.exports = (headers) => {
  // InternalTransfer Db Object Rest Api Router
  const internalTransferMcpRouter = [];
  // getInternalTransfer controller
  internalTransferMcpRouter.push(require("./get-internaltransfer")(headers));
  // getInternalTransferByStatus controller
  internalTransferMcpRouter.push(
    require("./get-internaltransferbystatus")(headers),
  );
  // createInternalTransfer controller
  internalTransferMcpRouter.push(require("./create-internaltransfer")(headers));
  // updateInternalTransfer controller
  internalTransferMcpRouter.push(require("./update-internaltransfer")(headers));
  // deleteInternalTransfer controller
  internalTransferMcpRouter.push(require("./delete-internaltransfer")(headers));
  // listInternalTransfers controller
  internalTransferMcpRouter.push(require("./list-internaltransfers")(headers));
  return internalTransferMcpRouter;
};

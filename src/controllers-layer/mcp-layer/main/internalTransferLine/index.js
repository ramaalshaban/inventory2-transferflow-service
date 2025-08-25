module.exports = (headers) => {
  // InternalTransferLine Db Object Rest Api Router
  const internalTransferLineMcpRouter = [];
  // getInternalTransferLine controller
  internalTransferLineMcpRouter.push(
    require("./get-internaltransferline")(headers),
  );
  // createInternalTransferLine controller
  internalTransferLineMcpRouter.push(
    require("./create-internaltransferline")(headers),
  );
  // updateInternalTransferLine controller
  internalTransferLineMcpRouter.push(
    require("./update-internaltransferline")(headers),
  );
  // deleteInternalTransferLine controller
  internalTransferLineMcpRouter.push(
    require("./delete-internaltransferline")(headers),
  );
  // listInternalTransferLines controller
  internalTransferLineMcpRouter.push(
    require("./list-internaltransferlines")(headers),
  );
  return internalTransferLineMcpRouter;
};

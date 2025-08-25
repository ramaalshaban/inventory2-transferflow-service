module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    internalTransferMcpRouter: require("./internalTransfer")(headers),
    internalTransferLineMcpRouter: require("./internalTransferLine")(headers),
    internalTransferLogMcpRouter: require("./internalTransferLog")(headers),
    transferFlowShareTokenMcpRouter: require("./transferFlowShareToken")(
      headers,
    ),
  };
};

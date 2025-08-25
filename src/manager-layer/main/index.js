module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // InternalTransfer Db Object
  GetInternalTransferManager: require("./internalTransfer/get-internaltransfer"),
  GetInternalTransferByStatusManager: require("./internalTransfer/get-internaltransferbystatus"),
  CreateInternalTransferManager: require("./internalTransfer/create-internaltransfer"),
  UpdateInternalTransferManager: require("./internalTransfer/update-internaltransfer"),
  DeleteInternalTransferManager: require("./internalTransfer/delete-internaltransfer"),
  ListInternalTransfersManager: require("./internalTransfer/list-internaltransfers"),
  // InternalTransferLine Db Object
  GetInternalTransferLineManager: require("./internalTransferLine/get-internaltransferline"),
  CreateInternalTransferLineManager: require("./internalTransferLine/create-internaltransferline"),
  UpdateInternalTransferLineManager: require("./internalTransferLine/update-internaltransferline"),
  DeleteInternalTransferLineManager: require("./internalTransferLine/delete-internaltransferline"),
  ListInternalTransferLinesManager: require("./internalTransferLine/list-internaltransferlines"),
  // InternalTransferLog Db Object
  GetInternalTransferLogManager: require("./internalTransferLog/get-internaltransferlog"),
  CreateInternalTransferLogManager: require("./internalTransferLog/create-internaltransferlog"),
  UpdateInternalTransferLogManager: require("./internalTransferLog/update-internaltransferlog"),
  DeleteInternalTransferLogManager: require("./internalTransferLog/delete-internaltransferlog"),
  ListInternalTransferLogsManager: require("./internalTransferLog/list-internaltransferlogs"),
  // TransferFlowShareToken Db Object
};

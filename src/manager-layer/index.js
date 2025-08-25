module.exports = {
  TransferFlowServiceManager: require("./service-manager/TransferFlowServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // InternalTransfer Db Object
  GetInternalTransferManager: require("./main/internalTransfer/get-internaltransfer"),
  GetInternalTransferByStatusManager: require("./main/internalTransfer/get-internaltransferbystatus"),
  CreateInternalTransferManager: require("./main/internalTransfer/create-internaltransfer"),
  UpdateInternalTransferManager: require("./main/internalTransfer/update-internaltransfer"),
  DeleteInternalTransferManager: require("./main/internalTransfer/delete-internaltransfer"),
  ListInternalTransfersManager: require("./main/internalTransfer/list-internaltransfers"),
  // InternalTransferLine Db Object
  GetInternalTransferLineManager: require("./main/internalTransferLine/get-internaltransferline"),
  CreateInternalTransferLineManager: require("./main/internalTransferLine/create-internaltransferline"),
  UpdateInternalTransferLineManager: require("./main/internalTransferLine/update-internaltransferline"),
  DeleteInternalTransferLineManager: require("./main/internalTransferLine/delete-internaltransferline"),
  ListInternalTransferLinesManager: require("./main/internalTransferLine/list-internaltransferlines"),
  // InternalTransferLog Db Object
  GetInternalTransferLogManager: require("./main/internalTransferLog/get-internaltransferlog"),
  CreateInternalTransferLogManager: require("./main/internalTransferLog/create-internaltransferlog"),
  UpdateInternalTransferLogManager: require("./main/internalTransferLog/update-internaltransferlog"),
  DeleteInternalTransferLogManager: require("./main/internalTransferLog/delete-internaltransferlog"),
  ListInternalTransferLogsManager: require("./main/internalTransferLog/list-internaltransferlogs"),
  // TransferFlowShareToken Db Object
};

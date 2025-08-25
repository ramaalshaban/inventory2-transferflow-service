const TransferFlowServiceGrpcController = require("./TransferFlowServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new TransferFlowServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};

const InternalTransferManager = require("./InternalTransferManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbGetInternaltransfer } = require("dbLayer");

class GetInternalTransferManager extends InternalTransferManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getInternalTransfer",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: false,
      hasShareToken: false,
    });

    this.dataName = "internalTransfer";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.internalTransferId = this.internalTransferId;
  }

  readRestParameters(request) {
    this.internalTransferId = request.params?.internalTransferId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.internalTransferId = request.mcpParams.internalTransferId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.internalTransferId == null) {
      throw new BadRequestError("errMsg_internalTransferIdisRequired");
    }

    // ID
    if (
      this.internalTransferId &&
      !isValidObjectId(this.internalTransferId) &&
      !isValidUUID(this.internalTransferId)
    ) {
      throw new BadRequestError("errMsg_internalTransferIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.internalTransfer?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbGetInternaltransfer function to get the internaltransfer and return the result to the controller
    const internaltransfer = await dbGetInternaltransfer(this);

    return internaltransfer;
  }

  async getRouteQuery() {
    return { $and: [{ id: this.internalTransferId }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }
}

module.exports = GetInternalTransferManager;

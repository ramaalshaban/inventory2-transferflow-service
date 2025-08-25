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
const { dbGetInternaltransferbystatus } = require("dbLayer");

class GetInternalTransferByStatusManager extends InternalTransferManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getInternalTransferByStatus",
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
    jsonObj.status = this.status;
    jsonObj.internalTransferId = this.internalTransferId;
  }

  readRestParameters(request) {
    this.status = request.query?.status;
    this.internalTransferId = request.params?.internalTransferId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.status = request.mcpParams.status;
    this.internalTransferId = request.mcpParams.internalTransferId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

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
    // make an awaited call to the dbGetInternaltransferbystatus function to get the internaltransferbystatus and return the result to the controller
    const internaltransferbystatus = await dbGetInternaltransferbystatus(this);

    return internaltransferbystatus;
  }

  async getRouteQuery() {
    return { $and: [{ status: { $eq: this.status } }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }
}

module.exports = GetInternalTransferByStatusManager;

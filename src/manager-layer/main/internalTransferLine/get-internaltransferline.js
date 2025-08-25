const InternalTransferLineManager = require("./InternalTransferLineManager");
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
const { dbGetInternaltransferline } = require("dbLayer");

class GetInternalTransferLineManager extends InternalTransferLineManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getInternalTransferLine",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: false,
      hasShareToken: false,
    });

    this.dataName = "internalTransferLine";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.internalTransferLineId = this.internalTransferLineId;
  }

  readRestParameters(request) {
    this.internalTransferLineId = request.params?.internalTransferLineId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.internalTransferLineId = request.mcpParams.internalTransferLineId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.internalTransferLineId == null) {
      throw new BadRequestError("errMsg_internalTransferLineIdisRequired");
    }

    // ID
    if (
      this.internalTransferLineId &&
      !isValidObjectId(this.internalTransferLineId) &&
      !isValidUUID(this.internalTransferLineId)
    ) {
      throw new BadRequestError("errMsg_internalTransferLineIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.internalTransferLine?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbGetInternaltransferline function to get the internaltransferline and return the result to the controller
    const internaltransferline = await dbGetInternaltransferline(this);

    return internaltransferline;
  }

  async getRouteQuery() {
    return { $and: [{ id: this.internalTransferLineId }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }
}

module.exports = GetInternalTransferLineManager;

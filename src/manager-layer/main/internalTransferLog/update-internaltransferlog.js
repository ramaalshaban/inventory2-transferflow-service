const InternalTransferLogManager = require("./InternalTransferLogManager");
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
const { dbUpdateInternaltransferlog } = require("dbLayer");

class UpdateInternalTransferLogManager extends InternalTransferLogManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateInternalTransferLog",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: false,
      hasShareToken: false,
    });

    this.dataName = "internalTransferLog";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.internalTransferLogId = this.internalTransferLogId;
  }

  readRestParameters(request) {
    this.internalTransferLogId = request.params?.internalTransferLogId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.internalTransferLogId = request.mcpParams.internalTransferLogId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getInternalTransferLogById } = require("dbLayer");
    this.internalTransferLog = await getInternalTransferLogById(
      this.internalTransferLogId,
    );
    if (!this.internalTransferLog) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameters() {
    if (this.internalTransferLogId == null) {
      throw new BadRequestError("errMsg_internalTransferLogIdisRequired");
    }

    // ID
    if (
      this.internalTransferLogId &&
      !isValidObjectId(this.internalTransferLogId) &&
      !isValidUUID(this.internalTransferLogId)
    ) {
      throw new BadRequestError("errMsg_internalTransferLogIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.internalTransferLog?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbUpdateInternaltransferlog function to update the internaltransferlog and return the result to the controller
    const internaltransferlog = await dbUpdateInternaltransferlog(this);

    return internaltransferlog;
  }

  async getRouteQuery() {
    return { $and: [{ id: this.internalTransferLogId }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async getDataClause() {
    const { hashString } = require("common");

    const dataClause = {};

    return dataClause;
  }
}

module.exports = UpdateInternalTransferLogManager;

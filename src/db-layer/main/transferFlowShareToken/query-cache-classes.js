const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class TransferFlowShareTokenQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("transferFlowShareToken", [], Op.and, Op.eq, input, wClause);
  }
}
class TransferFlowShareTokenQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("transferFlowShareToken", []);
  }
}

module.exports = {
  TransferFlowShareTokenQueryCache,
  TransferFlowShareTokenQueryCacheInvalidator,
};

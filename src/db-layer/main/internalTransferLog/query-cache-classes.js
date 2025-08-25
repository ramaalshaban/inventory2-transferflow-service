const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class InternalTransferLogQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("internalTransferLog", [], Op.and, Op.eq, input, wClause);
  }
}
class InternalTransferLogQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("internalTransferLog", []);
  }
}

module.exports = {
  InternalTransferLogQueryCache,
  InternalTransferLogQueryCacheInvalidator,
};

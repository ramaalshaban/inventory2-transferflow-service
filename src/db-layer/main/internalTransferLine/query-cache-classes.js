const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class InternalTransferLineQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("internalTransferLine", [], Op.and, Op.eq, input, wClause);
  }
}
class InternalTransferLineQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("internalTransferLine", []);
  }
}

module.exports = {
  InternalTransferLineQueryCache,
  InternalTransferLineQueryCacheInvalidator,
};

const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class InternalTransferQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("internalTransfer", [], Op.and, Op.eq, input, wClause);
  }
}
class InternalTransferQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("internalTransfer", []);
  }
}

module.exports = {
  InternalTransferQueryCache,
  InternalTransferQueryCacheInvalidator,
};

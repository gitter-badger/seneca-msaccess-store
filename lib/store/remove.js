var assert = require('assert');

//lib
var sqlBuilder = require('../sqlBuilder');
var connectionPool = require('../connectionPool');
var error = require('../error');

//the seneca instance
var seneca;

/**
 * Does a DELETE sql query
 *
 * @method remove
 * @param args {Object} In of the form { ent: { id: , ..entitiy data..} }
 * @param cb {Function} recieves (err, result)
 */
module.exports = function remove(args, cb) {
  assert(args);
  assert(cb);
  assert(args.qent);
  assert(args.q);

  seneca = seneca || (seneca = this);

  var qent = args.qent;
  var q = args.q;
  var query = sqlBuilder.delete(qent, q);

  connectionPool.query(query, function(err, result) {
    if (!error.call(seneca, args, err, cb)) {
      cb(null, result);
    }
  });
};

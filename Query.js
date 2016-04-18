/**
 * Created by linmengbo on 16/3/11.
 */
function Query(option, method, database, serveraddress, callback) {


    var couchbase = require ('couchbase');
    var cluster = new couchbase.Cluster (serveraddress);
    var bucket = cluster.openBucket (database);

    var N1qlQuery = couchbase.N1qlQuery;


    if (method == 'query') {
        var sql = N1qlQuery.fromString (option);
        bucket.query (sql, function (err, result) {

            if (err)throw err;
            callback (result);


        });
    } else if (method == 'get') {
        bucket.get (option, function (err, result) {


            callback (result);

        });
    } else if (method == 'remove') {
        bucket.remove (option, function (err, result) {


            callback (result);
        });
    }

}

module.exports = Query;
/**
 * Created by linmengbo on 16/4/18.
 */

var test = {


    APP_URL: {
        couchbase8091: 'http://120.27.199.93:8091',
        SyncUrl: "http://114.55.35.31:4985/test/",
        APP_API_DOC: "http://114.55.34.204:3000",
        APP_API_HOME: "http://114.55.34.204:5000"

    },

    AMD_URL: "http://120.55.189.100:9090",

    FTP_URL: "http://120.27.199.165"



}

var pro =  {


    APP_URL: {
        couchbase8091: 'http://127.0.0.1:8091',
        SyncUrl: "http://121.196.244.95:4985/test/",
        APP_API_DOC: "http://120.27.199.222:3000",
        APP_API_HOME: "http://120.27.199.222:5000"
    },

    AMD_URL: "121.196.244.129",
    FTP_URL: "114.55.36.11"


}



function ENV(env) {

    switch (env) {
        case "test":

            return test

            break;

        case "pro":

            return pro

            break;
    }
}

module.exports = ENV ;
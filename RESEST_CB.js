/**
 * Created by linmengbo on 16/4/15.
 */


//清空测试Couchbase(核心&AMD)

var ENV = require ("./ENV.js");

var Query = require ("./Query");

var Promise = require ('bluebird');

var request = Promise.promisifyAll (require ("request"));

var co = require ('co');

var IntialConfig = require ('./IntialConfig');

function promise_request(option) {
    return new Promise (function (resolve, reject) {
        request (option, function (err, res, body) {
            if (err) {
                reject (err);
            } else {
                console.log (body)
                resolve ({
                    body: body,
                    response: res
                })
            }
        })
    })
}


var exec = require ('child_process').exec;

var CMD_TESTSYNC_RESET = 'open ./reset_testsync.app';

var CMD_PROSYNC_RESET = 'open ./reset_prosync.app';

var CMD_TEST_APP_CLEAN = 'curl -X POST -u Administrator:yiyiTEST93 http://120.27.199.93:8091/pools/default/buckets/test/controller/doFlush';

var CMD_PRO_APP_CLEAN = 'curl -X POST -u Administrator:1@3456  http://121.196.244.129:8091/pools/default/buckets/test/controller/doFlush';

var CMD_TEST_AMD_CLEAN = 'curl -X POST -u Administrator:yiyiTEST93  http://120.27.199.93:8091/pools/default/buckets/test_amd/controller/doFlush';

var CMD_PRO_AMD_CLEAN = 'curl -X POST -u Administrator:1@3456  http://120.27.199.93:8091/pools/default/buckets/test/controller/doFlush';

var CMD_TEST_UPLOAD = 'open ./upload_test.app';

var CMD_PRO_UPLOAD = 'open ./upload_pro.app';


var env = "test";  //test为测试环境production为生产环境


//插入验证码
var SecurityCode = {
    method: 'POST',
    url: ENV (env).APP_URL.APP_API_HOME + '/users/send_security_code',
    body: {
        "phone_number": "13636694202",
        "role_type": 0,
        "sms_category": 2
    },
    json: true
};

//插入邀请码
var InvitationCode = {
    method: 'POST',
    url: ENV (env).APP_URL.SyncUrl,
    body: {code: '1234', type: 'InvitationCode'},
    json: true
};


//插入医院
var City_list = {
    method: 'POST',
    url: ENV (env).APP_URL.SyncUrl,
    body: IntialConfig.City_list,
    json: true
};


//插入医院
var Department_list = {
    method: 'POST',
    url: ENV (env).APP_URL.SyncUrl,
    body: IntialConfig.Department_list,
    json: true
};

//插入amd管理员
var adminCreate = {
    method: 'POST',
    url: ENV (env).AMD_URL + "/user/create",
    body: {
        realname: "admin",
        username: "admin",
        password: "admin",
        role: 1
    },
    json: true


}


function wait(ms) {
    return new Promise ((resolve, reject) => {
        setTimeout (resolve, ms);
    });
}


co (function*() {


    try {

        yield  cb => exec (CMD_TEST_APP_CLEAN, cb)
        console.log ("数据库清空完毕正在重启SyncGateway")
        yield  cb => exec (CMD_TESTSYNC_RESET, cb)
        yield wait (15000);
        yield cb => request (SecurityCode, cb);
        yield cb => request (InvitationCode, cb);
        yield cb => request (City_list, cb);
        yield cb => request (Department_list, cb);
        var result = yield cb => Query ("security_code_doctor_13636694202_2", 'get', 'test', ENV (env).APP_URL.couchbase8091, cb);

        var Doctor_Option = {
            method: 'POST',
            url: ENV (env).APP_URL.APP_API_DOC + '/users/register',
            body: {
                "phone_number": "13636694202",
                "password": "1234",
                "role_type": 0,
                "security_code": result.value.code,
                "invitation_code": "1234"
            },
            json: true
        };

        yield cb => request (Doctor_Option, cb);
        yield  cb => exec (CMD_TEST_AMD_CLEAN, cb)
        yield wait (10000);
        yield cb => request (adminCreate, cb);
        yield  cb => exec (CMD_TEST_UPLOAD, cb)
    }catch (e){

        console.log(e)
    }
})
    .catch (e => {
        console.error (e);
        console.error (e.stack);
    });


////AMD
//
//
//exec (CMD_TEST_AMD_CLEAN, function (err, stdout, stderr) {
//    if (err) throw err;
//    console.log ("AMD数据库清空完毕")
//
//
//})
//
//
//yield cb => request (adminCreate, cb);
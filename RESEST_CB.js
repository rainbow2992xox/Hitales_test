/**
 * Created by linmengbo on 16/4/15.
 */


//清空测试Couchbase(核心&AMD)

var ENV = require ("./ENV.js");

var Query = require ("./Query");

var Promise = require ('bluebird');

var request = Promise.promisifyAll (require ("request"));

var IntialConfig = require ('./IntialConfig');

function promise_request(option) {
    return new Promise (function (resolve, reject) {
        request (option, function (err, body, response) {
            if (err) {
                reject (err);
            } else {
                resolve ({
                    body: body,
                    response: response
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

var CMD_TEST_AMD_CLEAN = 'curl -X POST -u Administrator:yiyiTEST93  http://121.196.244.129:8091/pools/default/buckets/test_amd/controller/doFlush';

var CMD_PRO_AMD_CLEAN = 'curl -X POST -u Administrator:1@3456  http://121.196.244.129:8091/pools/default/buckets/test/controller/doFlush';

var CMD_TEST_UPLOAD = 'open ./upload_test.app';

var CMD_PRO_UPLOAD = 'open ./upload_pro.app';










var env = "test";

//核心数据库
exec (CMD_TEST_APP_CLEAN, function (err, stdout, stderr) {
    if (err) throw err;
    console.log ("数据库清空完毕正在重启SyncGateway")

    exec (CMD_TESTSYNC_RESET, function (err, stdout, stderr) {
        if (err) throw err;

        //插入验证码
        var SecurityCode = {
            method: 'POST',
            url: ENV (env).Test.APP_URL.APP_API_HOME + '/users/send_security_code',
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

        promise_request (SecurityCode)

            .then (function () {
                promise_request (InvitationCode)
            })

            .then (function () {

                Query ("security_code_doctor_13636694202_2", 'get', 'test', ENV (env).APP_URL.couchbase8091, function (result) {

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

                    //注册医生
                    request (Doctor_Option, function (err, res, body) {
                        if (err) throw err;
                        console.log (body);
                        //上传数据
                        exec (CMD_TEST_UPLOAD, function (err, stdout, stderr) {
                            if (err) throw err;
                        })
                    })
                });
            })
    })
})


//AMD
exec (CMD_TEST_AMD_CLEAN, function (err, stdout, stderr) {
    if (err) throw err;
    console.log ("AMD数据库清空完毕")


})



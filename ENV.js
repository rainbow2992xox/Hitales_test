/**
 * Created by linmengbo on 16/4/18.
 */

var test = require ('./TEST_CONFIG')
var pro = require ('./PRO_CONFIG')

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
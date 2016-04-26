/**
 * Created by linmengbo on 16/4/11.
 */
var fs = require ("fs");
var chai = require ("chai");
var chaiAsPromised = require ("chai-as-promised");
chai.use (chaiAsPromised);
chai.should ();

require('colors');
var wd;
try {
    wd = require ('wd');
} catch (err) {
    wd = require ('../../lib/main');
}

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

function reg(data) {

    var regdata = data
        .replace (/<(\w+)[^>]+visible="false"[^>]+>[\W\w]*?<\/\1>/g, "")
        .replace (/<UIAStatusBar[\W\w]*UIAStatusBar>/, "")
        .replace ("获取", "")
        .replace (/\w+s/, "")
        .replace (/\r\n/, "")


    return regdata;


}


function CompareXml(source, testsetp) {

    fs.readFile ("./testresult/Expect/" + testsetp, function (err, data) {

        var expect = Reg (data)

        assert.deepEqual (source, expect);

    })


}


// adding custom promise chain method
wd.addPromiseChainMethod (
    'PageHandle',
    function (driver, testsetp, mode, sleeptime) {
        return this
            .sleep (sleeptime)

            .then (function () {

                switch (mode) {
                    case Save:
                        driver
                            .sleep (100)
                            .then (function () {

                                console.log (testcase.flow_testcae.log[testsetp])


                            })
                            .source (function (err, source) {
                                if (err) throw err;
                                var actual = reg (source);
                                fs.writeFile ("./testresult/Expect/" + testcase.flow_testcae.log[testsetp], actual, 'Utf-8')

                            })
                            .saveScreenshot ("./testresult/Expect/" + testcase.flow_testcae.log[testsetp], function (err) {
                                if (err) throw err;

                            })

                        break;

                    case Compare:

                        driver
                            .sleep (100)
                            .then (function () {

                                console.log (testcase.flow_testcae.log[testsetp])


                            })
                            .source (function (err, source) {
                                if (err) throw err;

                                CompareXml (source, testcase.flow_testcae.log[testsetp])

                            })
                            .saveScreenshot ("./testresult/Actual/" + testcase.flow_testcae.log[testsetp], function (err) {
                                if (err) throw err;

                            })


                        break;


                }


            })
            .sleep (2 * sleeptime)

    }
);
/**
 * Created by linmengbo on 16/4/12.
 */

var fs = require ("fs");
var chai = require ("chai");
var chaiAsPromised = require ("chai-as-promised");
chai.use (chaiAsPromised);
chai.should ();
var assert = require ("assert");

require ('colors');
var wd;
try {
    wd = require ('wd');
} catch (err) {
    wd = require ('../../lib/main');
}

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var Page = {};


function reg(data) {

    var regdata = data
        .replace (/<(\w+)[^>]+visible="false"[^>]+>[\W\w]*?<\/\1>/g, "")
        .replace (/<UIAStatusBar[\W\w]*UIAStatusBar>/g, "")
        .replace ("获取", "")
        .replace (/\w+s/g, "")
        .replace (/\n?\s/g, "");


    return regdata;


}


function CompareXml(source, testsetp) {

    fs.readFile ("./testresult/Expect/" + testcase.flow_testcase.log[testsetp], "Utf-8", function (err, data) {

        var expect = reg (data)
        assert.equal (source, expect);

    })


}


Page.findElement = function findElement(testcase, testsetp) {

    return this
        .sleep (100)
        .then (function () {

            console.log (testcase.flow_testcase.log[testsetp])

        })
        .waitForElement ("xpath", testcase.flow_testcase.Xpath[testsetp], 8000, 100)


}

Page.Handle = function (driver, testcase, testsetp, mode, sleeptime) {

    return this
        .sleep (sleeptime)

        .then (function () {

            switch (mode) {

                case "Expect":
                    driver
                        .sleep (100)
                        .saveScreenshot ("./testresult/Expect/" + testcase.flow_testcase.log[testsetp], function (err) {
                            if (err) throw err;

                        })
                        .source (function (err, source) {
                            if (err) throw err;
                            var actual = reg (source);
                            fs.writeFile ("./testresult/Expect/" + testcase.flow_testcase.log[testsetp] + ".txt", actual, 'Utf-8')

                        })

                    break;

                case "Actual":

                    driver
                        .sleep (100)

                        .saveScreenshot ("./testresult/Actual/" + testcase.flow_testcase.log[testsetp], function (err) {
                            if (err) throw err;

                        })
                        .source (function (err, source) {
                            if (err) throw err;

                            var actual = reg (source);
                            fs.writeFile ("./testresult/Actual/" + testcase.flow_testcase.log[testsetp] + ".txt", actual, 'Utf-8')

                        })

                    break;


            }


        })
        .sleep (sleeptime)

}


module.exports = Page;
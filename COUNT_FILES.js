/**
 * Created by linmengbo on 16/4/15.
 */
var glob = require ("glob")
var fs = require("fs")
var pdftoJson = require("pdf2json")
//var pdf = require("./test.pdf");

var pdfParser = new pdftoJson();

fs.readFile("./test.pdf", (err, pdfBuffer) => {
    if (!err) {
        console.log(pdfBuffer);
        var xx = pdfParser.parseBuffer(pdfBuffer);
        console.log(xx);
    }
})


var keypath = "./汤予双强直793病案/file1/**";

var filetype = ['.png', '.jpeg', '.jpg', '.xps', '.doc', '.docx', '.pdf'];

//var filetype = ['.jpg', '.jpeg', '.png'];

var fileNum = 0;

var HY = []

var OTHER = []

function check(path) {


    filetype.forEach (function (result) {

        var type = "/*" + result

        glob (path + type, {nodir: true}, function (err, files) {


            //files.forEach (function (result) {
            //
            //    if (result.indexOf ("02 化验记录") > 0) {
            //
            //        HY.push (result)
            //
            //    } else {
            //
            //        OTHER.push (result)
            //
            //    }
            //
            //
            //})
            //
            //console.log (HY)
            console.log (files)


            console.log (fileNum + files.length)

            //
            //files.forEach (function (result) {
            //
            //    var isMathDoc;
            //    console.log(result);
            //    if (result != "") {
            //        for (var i = 0; i < filetype.length; i++) {
            //            if (result.toLowerCase ().indexOf (filetype[i]) > 0) {
            //                isMathDoc = true;
            //                break;
            //            }
            //        }
            //
            //    }
            //    else {
            //        isMathDoc = false;
            //    }
            //
            //    if (isMathDoc) {
            //
            //        fileNum++;
            //
            //    } else {
            //
            //        check (result + "/**")
            //
            //    }
            //
            //
            //})
            //
            //console.log(fileNum);
            //
            //if (err)
            //    console.log (err);
            //else
            //    console.log (files);


        })


    })


}

//check (keypath)

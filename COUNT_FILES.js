/**
 * Created by linmengbo on 16/4/15.
 */
var glob = require ("glob")


var keypath = "./testdir2/**";

var filetype = ['.xps', '.doc', '.docx', '.pdf'];

var fileNum = 0;

var HY = []

var OTHER = []

function check(path) {


    filetype.forEach (function (result) {

        var type = "/*" + result

        glob (path + type, {nodir: true}, function (err, files) {





            files.forEach (function (result) {

                if (result.indexOf ("02 化验记录") > 0) {

                    HY.push(result)

                }else{

                    OTHER.push(result)

                }


            })

            console.log (HY)
            console.log (OTHER)


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


check (keypath)

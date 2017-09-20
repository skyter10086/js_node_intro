//var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");


function start(response) {
    console.log("Request handler 'start' was called.");
    
    /*
    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime()< startTime + milliSeconds);
    }
    
    sleep(10000);
    */
    
    //var content = " ";
    //return function() {
        
    /*
    exec("tree c:/ ", 
        {timeout: 10000, maxBuffer: 20000*1024},
        function(error, stdout, stderr) {
        //content = stdout;    
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(stdout);
            response.end();
    });
    */
      var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    
    
}


function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    //return "Hello Upload";
    var formid = new formidable.IncomingForm();
    console.log("about to parse");
    formid.parse(request, function(error, fields, files){
    fs.renameSync(files.upload.path,"./test.png");
    response.writeHead(200, {"Content-Type": "text/html", "charset": "UTF-8"});
    response.write("You've sent image:</br><img src='/show' />" );
    response.end();
    });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}


exports.start = start;
exports.upload = upload;
exports.show = show;



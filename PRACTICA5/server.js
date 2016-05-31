// node server.js
var http = require('http');
var fs = require('fs'); // sistema de archivo
var path = require('path');
var formidable = require('formidable');
console.log("Sever listening at 8080")
var server = http.createServer(function(request, response) {
	var headers = request.headers;
	var ruta = '.' + ((request.url=='/') ? '/index.html' : request.url); //si la ruta esta vacia carga index.html
	var extension = path.extname(ruta); // obtiene la extension del archivo 
	if (request.method == "GET"){
			var check_root = ruta.split("?");
		if (check_root.length > 1){
			check_root = check_root[1].split("&");
			processForm(response,check_root,"GET");
		}else{
			showContent(ruta,response,request);
		}

	}else if(request.method == "POST"){
				processForm(response,request,"POST");
     		
	}
	
}).listen(8080);

function showContent(ruta,response,request){
	if (ruta == "./purchase.html"){
			response.writeHead(200, {'content-type': 'text/html'});
	        response.end(purchaseHtml(request));
	}else{
		fs.exists(ruta,function(exist){
			if (exist){
				fs.readFile(ruta,function(error,content){
					if (error){
						response.statusCode = 500;
						response.setHeader('Content-Type','text/plain');
						response.write("error interno");
						response.end();

					}else{
						response.setHeader('Content-Type','text/html');
						response.write(content); //content sale de ruta,la funcion readfile lo lee.
						response.end();
					}
				});
			}else{
				response.statusCode = 404;
				response.setHeader('Content-Type','text/plain');
				response.write('Content not found');
				response.end();
			}
		
			});
	}
}

function processForm(response,request,method){
	var fields = [];
	if (method == "GET"){
		for (var i = 0; i < request.length; i++) {
			field = request[i].split("=");
			fields[field[0]] = field[1]
		};
		response.writeHead(200, {'content-type': 'text/html'});
		response.end(createHtml(fields));

	}else{
		var form = new formidable.IncomingForm();
	    form.parse(request);
	    form.on('field', function (field, value) {
	        fields[field] = value;
	    }); 
	    form.on('end', function () {
        	response.writeHead(200, {'content-type': 'text/html'});
        	response.end(createHtml(fields));
   		 });
	}    
}


function createHtml(info){
	var html = '<html>'+
                '       <head> ' +
                '               <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">' +
                '               <link rel="stylesheet" type="text/css" href="style.css">' +
                '       </head>' +
                '       <body>' +
                '		<div class="form_response">' +
                '			<h1> Thank´s for your purchase ' + info["gender"] + ' ' + info["name"] + '<br> </h1> ' +
                '           Check your data: <br> Email: ' + info["email"] + "<br> date: " + info["date"] + '<br>' +
                '           purchase: ' + info["product"] + " / " + info["item"] + "<br>" +
                '			Phone Number: ' + info["phone"] + '<br>' +
                '           comments: ' + info["opinion"] + '<br>' + 'urgency of order: ' + info["points"] + '<br>'+
                '			qualification: ' + info["qualification"]  +
                '			<br> color: ' + info["color"] +
                '			<br> <a href="index.html"> Return Home page </a> '+
                '		</div>' +
                '       </body>';
                ' </html>';
	return html;
}




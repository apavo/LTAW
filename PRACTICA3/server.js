// node server.js
var http = require('http');
var fs = require('fs'); // sistema de archivo
var path = require('path');
var server = http.createServer(function(request, response) {
	var headers = request.headers;
	var ContentType;
	var ruta = '.' + ((request.url=='/') ? '/index.html' : request.url); //si la ruta esta vacia carga index.html
	var extension = path.extname(ruta); // obtiene la extension del archivo 
	switch(extension){
		case '.html':
			ContentType = 'text/html';
			break;
		case '.css':
			ContentType = "text/css";
			break;
		case '.png':
			ContentType = "image/png"
			break;
		case '.mp4':
			ContentType = "video/mp4";
			break;
		default:
			ContentType = 'text/html';
	}
	if (request.method == "GET"){
			showContent(ruta,ContentType,response,request);
		}
}).listen(8080);

function showContent(ruta,ContentType,response,request){
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
						response.writeHead(200,{
							'content-type' : "text/html"
						});
						response.write(content); // content sale de ruta,la funcion readfile lo lee.
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
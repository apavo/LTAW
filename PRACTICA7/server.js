// node server.js
console.log("Sever listening at 8080")
var http = require('http');
var fs = require('fs'); // sistema de archivo
var path = require('path');
var formidable = require('formidable')
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
			if (ruta == "./search"){
				processAjax(request,response);
			}else{
				processForm(response,request,"POST");
			}

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
						if(ruta == "./index.html"){
							checkCookie(request,response,content); //compruebo cookies para cualquier ruta
						}else{
							response.writeHead(200,{
								'content-type' : "text/html"
							});
							response.write(content); //content sale de ruta,la funcion readfile lo lee.
							response.end();
					}
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
function purchaseHtml(request){
	order=getCookies(request);
	var html=	'<html>'+
                '       <head> ' +
                '               <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">' +
                '               <link rel="stylesheet" type="text/css" href="style.css">' +
                '       </head>' +
                '       <body>' +
                '		<div class="products">' +
                '			<table class="listproducts" >			' ;
                for (var i = 0; i < order.length; i++) {
					html += '<tr>' +
							'	<td> <img class="photo" src=" ' + order[i].image +' "></td>' +
							'	<td style= "width: 500px;">' + order[i].name + '<br>' + order[i].price +
							'		<br> Quantity: ' + order[i].quantity + '<br> <br> </td>' +
							'</tr>';
				}
	html += 	'			<a href="index.html" style="font-size:30px;color:black"> Back to home page <br><br> </a></tr>'
				' </div>' +
				'</body> ' +
				'</html>';
	return html;
};

function checkCookie(request,response,content){
	var cookie = request.headers["cookie"]
	var comment = "Welcome Again "
	if (typeof(cookie) == "undefined"){
		var username = random_str();
		var d = new Date();
		d.setTime(d.getTime() + (10*24*60*60*1000)); // el primer valor los dias que dura
		var expires = "expires=" + d.toGMTString();
		carrito = JSON.stringify([]);
		comment = "Welcome your ID is: "
		response.writeHead(200,{
			"Set-Cookie": username + "=" + carrito + ";" + expires, 
			"content-type": "text/html"
		})
	}else{
		response.writeHead(200,{
			'content-type' : "text/html"
		});
	}
	response.write(content); 
	response.write(comment); //content sale de ruta,la funcion readfile lo lee.
	response.end();
	
}

function random_str() {
			//genera cadenas aleatorias de longitud 4
		    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";//caracteres válidos
		    var str= "us";
		    for (var i = 0; i < 4; i++) {
		        str += chars[ Math.floor(Math.random() * chars.length)];
    		}
    		return str;
		}

function getCookies(request){
	var cookie_values = request.headers.cookie;
	cookie_values = cookie_values.split("=");
	purchase = JSON.parse(cookie_values[1]);
	return purchase;
}


function processAjax(request,response){
	var body = [];
	request.on('data', function(chunk) {
  		body.push(chunk);
	}).on('end', function() {
  		body = Buffer.concat(body).toString();
  		fs.readFile("sugerencias.json",function(error,data){
	  		data = JSON.parse(data)
	  		if (body == "bik"){
	  			data = data.suggestions[0]
	  		}else if(body=="boo"){
	  			data = data.suggestions[1]
	  		}else{
	  			data = data.suggestions[2]
	  		}
	  		data = JSON.stringify(data);
			response.setHeader('Content-Type','applicatio/JSON');
			response.end(data);
	});

	});
	
}

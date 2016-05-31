//la primera cookie la tiene que crear el servidor

function setCookie(user,user_value) {
			//Paso como parametros nombre de usuario y su compra
		    var d = new Date();
		    d.setTime(d.getTime() + (10*24*60*60*1000)); // el primer valor los dias que dura
		    var expires = "expires=" + d.toGMTString();
		    user_purchase = JSON.stringify(user_value);//Json para convertirlo a stirng
			console.log(document.cookie)
		    document.cookie = user + "=" + user_purchase + ";" + expires;
			console.log(document.cookie)

		}

		function getCookie() {
			//procesa la cookie
		    var cookie = document.cookie.split(';');
		    return cookie; //si esta vacio va a devolver undefined

		}
		
		function checkCookie() {
			//compruebo si hay una cookie creada
			var cookie = getCookie();
			var coment = document.body.childNodes
			coment = coment[coment.length - 1];
			coment_value = coment.nodeValue
			document.body.removeChild(coment)
			alert(coment_value + cookie[0].split("=")[0]);

		}

		function add_buy(p_image,p_name,p_price){
			var objs = getCookie()
			user = objs[0].split("=")[0];
			objs = JSON.parse(objs[0].split("=")[1]); //paso de string a array el carrtio y lo uso luego vuelvo a convertirlo
			if (!checkPurchase(objs,p_image)){ 
				product = {image:p_image, name :p_name, price : p_price, quantity:1}
				objs.push(product);
			}
			setCookie(user,objs)	
		}

		function checkPurchase(obj,p_image){
			//Comparo el carrito con un campo de la nueva compra
			for (var i = 0; i < obj.length; i++) {
				if (obj[i].image == p_image){
					obj[i].quantity += 1; //aumento la cantidad
					return true;
				}
			}
			return false;

		}
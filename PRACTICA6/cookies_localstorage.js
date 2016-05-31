function setCookie(name,value) {
		    var d = new Date();
		    d.setTime(d.getTime() + (10*24*60*60*1000)); // el primer valor los dias que dura
		    var expires = "expires=" + d.toGMTString();
		    var user_value= [];
		    localStorage.setItem(value,JSON.stringify(user_value)); //uso json para pasarlo a string
		    document.cookie = name + "=" + value + ";" + expires;
		}

		function random_str() {
			//genera cadenas aleatorias de longitud 4
		    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";    //caracteres válidos
		    var str= "us";
		    for (var i = 0; i < 4; i++) {
		        str += chars[ Math.floor(Math.random() * chars.length)];
    		}
    		return str;
		}

		function getCookie() {
		    var cookie = document.cookie.split(';');
		    var value_cookie = cookie[0].split("=");
		    return value_cookie[1]; //si esta vacio va a devolver undefined
		}

		function checkCookie() {
			var user= getCookie();
			if (typeof(user) == "undefined") {
				setCookie("username", random_str());
			} else {
				alert("Welcome again " + user);
			}
		}

		function add_buy(p_image,p_name,p_price){
			user = getCookie();
			obj= JSON.parse(localStorage.getItem(user)); //paso de string a array y lo uso luego vuelvo a convertirlo
			if (!checkLocalStorage(obj,p_image)){
				product = {image:p_image, name :p_name, price : p_price, quantity:1}
				obj.push(product);
			}
			localStorage.setItem(user,JSON.stringify(obj));
			
		}

		function finish_purchase(){
			//con mas de una cookie el array lo ordena bien
			username = getCookie()
			purch = localStorage.getItem(username);
			setCookie(username,purch)
		}

		function checkLocalStorage(obj,p_image){
			//compruebo si esta repetida la compra en el local storage
			for (var i = 0; i < obj.length; i++) {
				if (obj[i].image == p_image){
					obj[i].quantity += 1; //aumento la cantidad
					return true;
				}
			}
			return false;

		}
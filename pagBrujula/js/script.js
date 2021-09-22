
$(".flotante").hide(10);

$(window).scroll(function () {
    if($(document).scrollTop()>280 && $(window).width()>360){
		$(".flotante").show(1000);
		$("nav").css({'position':'fixed','top':'0px','opacity':'0.9','width': '870px','z-index':'9999'});
		//$("nav").animate({width: "870px"}, 1000);
	}else{
		$("nav").css({'position':'relative','opacity':'1','width': '100%'});
		$(".flotante").hide(1000);
		//$("nav").animate({width: "100%"}, 1000);
	}
});

function sub(){
	$("nav").css({'position':'absolute'});
	$("html, body").animate({scrollTop: 0}, 1000);
}

function hide(){
	$(".pA1").hide(10);
	$(".pA2").hide(10);
	$(".pA5").hide(10);
	$(".pA4").hide(10);
	$(".pA3").hide(10);
}

function sv(){
	$("nav").animate({height: "188px"}, 1000)
	$("nav ul").show(1000);
	$("#ver").hide(1000);
}

$(window).load(function() {
	$('.flexslider').flexslider({
		prevText: "",
		nextText: "",
		animation: "slide",
		slideshowSpeed: 5000,
	});
});

$(document).ready(function(){
	hide();
	$("header").css({'opacity':'0.3'});
	$("header").animate({opacity: "1"}, 1200)

	if($(window).width()>360){
		$(".2048").show(1000);
		$("nav").css({'height':'1px'});
		$("nav").animate({height: "33px"}, 1200)
		$("#ver").hide(1);
	}else{
		$("nav").css({'height':'1px'});
		$("nav").animate({height: "40px"}, 1200)
		$("nav ul").hide(10);
		window.ChatraSetup = {
			startHidden: true
		};
		//$(".2048").hide(1);
	}


	$(".tA1").click(function() {
		hide();
		$(".pA1").show(1000)
	});
	$(".tA2").click(function() {
		hide();
		$(".pA2").show(1000)
	});
	$(".tA3").click(function() {
		hide();
		$(".pA3").show(1000)
	});
	$(".tA4").click(function() {
		hide();
		$(".pA4").show(1000)
	});
	$(".tA5").click(function() {
		hide();
		$(".pA5").show(1000)
	});


	//$("a.in").mouseover(function() {
	//	$("a.in").animate({width: "150"}, 1200)
	//});

});

(function(d, w, c) {
    w.ChatraID = 'KpkHvManzaxScYGRq';
    var s = d.createElement('script');
    w[c] = w[c] || function() {
        (w[c].q = w[c].q || []).push(arguments);
    };
    s.async = true;
    s.src = 'https://call.chatra.io/chatra.js';
    if (d.head) d.head.appendChild(s);
})(document, window, 'Chatra');

window.ChatraSetup = {
    colors: {
        buttonText: '#ffffff', /* chat button text color */
        buttonBg: '#EC3E33'    /* chat button background color */
    }
};
window.ChatraSetup = {
	buttonSize: 50,
	chatWidth: 300,
	chatHeight: 450
};
var t;
function myFunction() {
	btn=document.getElementById("boton");
	t=setInterval(move(btn),100);


	var usuario = prompt('¿Cuál es tu nombre?');
	var element=document.getElementById("gr");
	var e=document.getElementById("fo");
	//var e=document.getElementsByTagName("footer");
	alert(element.value);
	/*
	var anclaTexto = document.createTextNode("Actualidad");
	var nuevoAncla = document.createElement("a");
	nuevoAncla.appendChild(anclaTexto);

	nuevoAncla.setAttribute('style', 'background-color: blue');

	var anclaExistente = document.getElementById("fo");
	var padre = anclaExistente.parentNode;
	var nuevoHijo = padre.replaceChild(nuevoAncla, anclaExistente);

	nuevoHijo.setAttribute('className', 'pie1');
	nuevoHijo.classList.toggle("pie1");
	*/
	//e.className="pie1";
	//e.setAttribute('style', 'background-color: blue');
	//e.style.backgroundColor= "blue";

	//e.innerHTML="hola";

	e.classList.toggle("pie1");


	var tabla = '<table border="0">';
	tabla += '<tr><td>Celda 1</td><td>Celda 2</td><td> Celda 3</td></tr>';
	tabla += '</table>';
	document.getElementById("fo").innerHTML = tabla;

	element.addEventListener('focus',alert("Hola"),false);
}


var pos=0;
function move(obj){

	if(pos>=150){
		clearInterval(t);
	}else{
		pos+=1;
		obj.style.right=pos+"px";
	}

}

//

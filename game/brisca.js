class Carta{
	constructor(t,n,p){
		this.tipo=t;
		this.num=n;
		this.punt=p;
	}
}

function getRan(n) {
	return Math.round(Math.random()*(n));
}

var tip=new Array(4);
tip[0]="Basto";
tip[1]="Espada";
tip[2]="Copa";
tip[3]="Oro";


var barajaU=new Array(3);
var gbarajaU=new Array(40);
var barajaC=new Array(3);
var gbarajaC=new Array(40);
var triun="";
var ind=0;

function llenar(){
	var mazo=new Array(40);
	for (i = 0; i < tip.length; i++){
		for (x = 1;x < 11;x++){
			if(x==8) mazo[ind]=new Carta(tip[i],10,x);
			else if(x==9) mazo[ind]=new Carta(tip[i],11,x);
			else if(x==10) mazo[ind]=new Carta(tip[i],12,x);
			else{ 
				if(x==1)mazo[ind]=new Carta(tip[i],x,15);
				else if(x==3)mazo[ind]=new Carta(tip[i],x,14);
				else mazo[ind]=new Carta(tip[i],x,x);
			}
			//console.log(ind+"-"+mazo[ind].tipo+"-"+mazo[ind].num);
			ind++;
			
		}
	}
	return mazo;
}
//ver(mazo);

function Arras(baraja,mazo){
	for (i = 0; i < baraja.length; i++){
		do{
			indCan=getRan(39);
			if(mazo[indCan]!=null){
				baraja[i]=mazo[indCan];
				//console.log(baraja[i].tipo+"-"+barajaU[i].num);
				mazo[indCan]=null;
				break;
			}
		}while(mazo[indCan]==null)
	}
}

function contCa(mazo){
	var est=false;
	for (i = 0; i < mazo.length; i++){
		if(mazo[i]!=null)est=true;
	}
	//alert(est);
	return est;
}

function Rep(baraja,mazo){
	if(contCa(mazo)){
		for (i = 0; i < baraja.length; i++){
			if(baraja[i]==null){
				//
				do{
					indCan=getRan(39);
					if(mazo[indCan]!=null){
						baraja[i]=mazo[indCan];
						//console.log(barajaU[i].tipo+"-"+barajaU[i].num);
						mazo[indCan]=null;
						break;
					}
				}while(mazo[indCan]==null)
				//}
			}
		}
	}
}

function ver(baraja){
	for (i = 0; i < baraja.length; i++)console.log(i+"-"+baraja[i].tipo+"-"+baraja[i].num+"-"+baraja[i].punt);
}

function Duelo(at,de,tri){
	//console.log(at.tipo+"-"+tri);
	var gan;
	if(at.tipo==tri && de.tipo==tri){
		if(at.punt>de.punt){
			gan="at";
		}else gan="de";
	}else if(at.tipo==tri && de.tipo!=tri){
		gan="at";
	}else if(at.tipo!=tri && de.tipo==tri){
		gan="de";
	}else{
		if(at.tipo==de.tipo){
			if(at.punt>de.punt){
				gan="at";
			}else gan="de";
		}else gan="at";
	}
	return gan;
}

function pCar(gan,at,de){
	for (i = 0; i < gan.length; i++){
		if(gan[i]==null){
			gan[i]=at;
			break;
		}
	}
	for (i = 0; i < gan.length; i++){
		if(gan[i]==null){
			gan[i]=de;
			break;
		}
	}
}

var at,de,indat,indde,tur=1,indt;

function game(us){
	if(tur==1){
		indat=us;
		indde=getRan(2);

		console.log(indat+"-"+indde);

		at=barajaU[indat];
		de=barajaC[indde];
		barajaU[indat]=null;
		barajaC[indde]=null;
		
		console.log(at.tipo+"-"+at.punt);
		console.log(de.tipo+"-"+de.punt);

		//alert(Duelo(at,de,triun.tipo));

		if(Duelo(at,de,triun.tipo)=="at"){
			pCar(gbarajaU,at,de);
		}else{
			pCar(gbarajaC,at,de);
		}
		tur=2;
	}else{
		indat=getRan(2);
		at=barajaC[indat];
		console.log(at.tipo+"-"+at.punt);
		indde=prompt()-1;

		de=barajaU[indde];
		barajaU[indde]=null;
		barajaC[indat]=null;
		
		console.log(at.tipo+"-"+at.punt);
		console.log(de.tipo+"-"+de.punt);

		//alert(Duelo(at,de,triun.tipo));

		if(Duelo(at,de,triun.tipo)=="at"){
			pCar(gbarajaC,at,de);
		}else{
			pCar(gbarajaU,at,de);
		}
		tur=1;
	}
	Rep(barajaU,mazo);
	Rep(barajaC,mazo);

	console.log("**--------");
	ver(barajaU);
	console.log("--------");
	ver(barajaC);
}

function punt(arr){
	var sum=0;
	for (i = 0; i < arr.length; i++){
		if(arr[i]!=null){
			if(arr[i].num==1)sum+=11;
			if(arr[i].num==3)sum+=10;
			if(arr[i].num==12)sum+=4;
			if(arr[i].num==11)sum+=3;
			if(arr[i].num==10)sum+=2;
		}
	}
	return sum;
}

function ia(arr,de,tri){
	var opt=null;
	for (i = 0; i < arr.length; i++){
		
		if(Duelo(de,arr[i],tri)=="de"){
			opt=i;
			//alert(tri);
			//alert(arr[i].tipo+"-"+arr[i].punt);
			//alert(de.tipo+"-"+de.punt);
			break;
		}
	}
	if(opt==null)opt=getRan(2);
	return opt;
}


$(document).ready(function(){
	var mazo=new Array(40);
	mazo=llenar();

	indt=getRan(39);
	console.log(indt);
	triun=mazo[indt];
	dibU(mazo,"vi",indt);
	//ver(barajaU);
	console.log("-----"+triun.tipo);
	//ver(barajaC);
	Arras(barajaU,mazo);
	Arras(barajaC,mazo);
	//Rep(barajaU,mazo);

	console.log("**--------");
	ver(barajaU);
	console.log("--------");
	ver(barajaC);
	$(".1u").click(function(){
		Rep(barajaU,mazo);
		Rep(barajaC,mazo);
		$(".1u").html(" ");
		//$(".1u").css({'position': 'absolute'});
		//$(".1u").animate({"top": "1"}, 1200);
		if(tur==1){
			dibU(barajaU,"cu",0);
			indat=0;
			at=barajaU[indat];
			indde=ia(barajaC,at,triun.tipo);
			de=barajaC[indde];
			//alert(Duelo(at,de,triun.tipo));
			dibU(barajaC,"cc",indde);
			$(".1c").html(" ");
			barajaU[indat]=null;
			barajaC[indde]=null;
		}else{
			indde=0;
			de=barajaU[indde];
			dibU(barajaU,"cu",0);
			barajaU[indde]=null;
			
			//alert(Duelo(at,de,triun.tipo));
			
			//if(Duelo(at,de,triun.tipo)=="at"){
				//pCar(gbarajaC,at,de);
				//tur=2;
				//indat=getRan(2);
				//at=barajaC[indat];
				//dibU(barajaC,"cc",indat);
				//barajaC[indat]=null;
			//}else{
				//pCar(gbarajaU,at,de);
				//tur=1;
			//}
		}
	});
	$(".2u").click(function(){
		Rep(barajaU,mazo);
		Rep(barajaC,mazo);
		$(".2u").html(" ");
		if(tur==1){
			dibU(barajaU,"cu",1);
			indat=1;
			at=barajaU[indat];
			indde=ia(barajaC,at,triun.tipo);
			de=barajaC[indde];
			dibU(barajaC,"cc",indde);
			$(".2c").html(" ");
			barajaU[indat]=null;
			barajaC[indde]=null;
		}else{
			indde=1;
			de=barajaU[indde];
			dibU(barajaU,"cu",1);
			barajaU[indde]=null;
			

		}
	});
	$(".3u").click(function(){
		Rep(barajaU,mazo);
		Rep(barajaC,mazo);
		$(".3u").html(" ");
		if(tur==1){
			dibU(barajaU,"cu",2);
			indat=2;
			at=barajaU[indat];
			indde=ia(barajaC,at,triun.tipo);
			de=barajaC[indde];
			dibU(barajaC,"cc",indde);
			$(".3c").html(" ");
			barajaU[indat]=null;
			barajaC[indde]=null;
		}else{
			indde=2;
			de=barajaU[indde];
			dibU(barajaU,"cu",2);
			barajaU[indde]=null;

		}
	});
	
	$(".due").click(function(){
		Rep(barajaU,mazo);
		Rep(barajaC,mazo);
		if(tur==1){
			console.log(at.tipo+"-"+at.punt);
			console.log(de.tipo+"-"+de.punt);

			

			if(Duelo(at,de,triun.tipo)=="at"){
				pCar(gbarajaU,at,de);
				tur=1;
				$(".cu").html(" ");
				$(".cc").html(" ");
				alert("Ganas");
			}else{
				pCar(gbarajaC,at,de);
				tur=2;
			indat=getRan(2);
			at=barajaC[indat];
			dibU(barajaC,"cc",indat);
			barajaC[indat]=null;
			$(".cu").html(" ");
			alert("Pierdes");
			}
		}else{
			
			//alert(Duelo(at,de,triun.tipo));
			
			if(Duelo(at,de,triun.tipo)=="at"){
				pCar(gbarajaC,at,de);
				tur=2;
				indat=getRan(2);
				at=barajaC[indat];
				dibU(barajaC,"cc",indat);
				barajaC[indat]=null;
				$(".cu").html(" ");
				alert("Pierdes");
			}else{
				pCar(gbarajaU,at,de);
				tur=1;
				$(".cu").html(" ");
				$(".cc").html(" ");
				alert("Ganas");
			}

		}

		Rep(barajaU,mazo);
		Rep(barajaC,mazo);
		console.log("**--------");
		ver(barajaU);
		console.log("--------");
		//ver(barajaC);
		
		$(".punU").text(punt(gbarajaU));
		$(".punC").text(punt(gbarajaC));
		
		dibU(barajaU,"1u",0);
		dibU(barajaU,"2u",1);
		dibU(barajaU,"3u",2);
		$(".1c").html("<img src='cartas/r.jpg' >");
		$(".2c").html("<img src='cartas/r.jpg' >");
		$(".3c").html("<img src='cartas/r.jpg' >");
		dibU(mazo,"vi",indt);
	});
	console.log("pU");
	//ver(gbarajaU);
	console.log("pC");
	//ver(gbarajaC);

	//for (i = 0; i < mazo.length; i++){
		//if(mazo[i]!=null)console.log(mazo[i].tipo);
	//}

	dibU(mazo,"vi",indt);
	dibU(barajaU,"1u",0);
	dibU(barajaU,"2u",1);
	dibU(barajaU,"3u",2);

});


function dibU(barajaU,cl,ind){
	
	//$(document).ready(function(){
	if(barajaU[ind]!=null){
		//$("."+cl).html("<img src='cartas/oro/1.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==1)$("."+cl).html("<img src='cartas/oro/1.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==2)$("."+cl).html("<img src='cartas/oro/2.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==3)$("."+cl).html("<img src='cartas/oro/3.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==4)$("."+cl).html("<img src='cartas/oro/4.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==5)$("."+cl).html("<img src='cartas/oro/5.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==6)$("."+cl).html("<img src='cartas/oro/6.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==7)$("."+cl).html("<img src='cartas/oro/7.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==10)$("."+cl).html("<img src='cartas/oro/10.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==11)$("."+cl).html("<img src='cartas/oro/11.jpg'>");
		if(barajaU[ind].tipo=="Oro"&&barajaU[ind].num==12)$("."+cl).html("<img src='cartas/oro/12.jpg'>");
		
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==1)$("."+cl).html("<img src='cartas/copa/1.jpg'>");
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==2)$("."+cl).html("<img src='cartas/copa/2.jpg'>");
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==3)$("."+cl).html("<img src='cartas/copa/3.jpg'>");
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==4)$("."+cl).html("<img src='cartas/copa/4.jpg'>");
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==5)$("."+cl).html("<img src='cartas/copa/5.jpg'>");
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==6)$("."+cl).html("<img src='cartas/copa/6.jpg'>");
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==7)$("."+cl).html("<img src='cartas/copa/7.jpg'>");
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==10)$("."+cl).html("<img src='cartas/copa/10.jpg'>");
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==11)$("."+cl).html("<img src='cartas/copa/11.jpg'>");
		if(barajaU[ind].tipo=="Copa"&&barajaU[ind].num==12)$("."+cl).html("<img src='cartas/copa/12.jpg'>");
		
		
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==1)$("."+cl).html("<img src='cartas/espada/1.jpg'>");
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==2)$("."+cl).html("<img src='cartas/espada/2.jpg'>");
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==3)$("."+cl).html("<img src='cartas/espada/3.jpg'>");
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==4)$("."+cl).html("<img src='cartas/espada/4.jpg'>");
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==5)$("."+cl).html("<img src='cartas/espada/5.jpg'>");
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==6)$("."+cl).html("<img src='cartas/espada/6.jpg'>");
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==7)$("."+cl).html("<img src='cartas/espada/7.jpg'>");
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==10)$("."+cl).html("<img src='cartas/espada/10.jpg'>");
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==11)$("."+cl).html("<img src='cartas/espada/11.jpg'>");
		if(barajaU[ind].tipo=="Espada"&&barajaU[ind].num==12)$("."+cl).html("<img src='cartas/espada/12.jpg'>");
		
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==1)$("."+cl).html("<img src='cartas/basto/1.jpg'>");
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==2)$("."+cl).html("<img src='cartas/basto/2.jpg'>");
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==3)$("."+cl).html("<img src='cartas/basto/3.jpg'>");
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==4)$("."+cl).html("<img src='cartas/basto/4.jpg'>");
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==5)$("."+cl).html("<img src='cartas/basto/5.jpg'>");
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==6)$("."+cl).html("<img src='cartas/basto/6.jpg'>");
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==7)$("."+cl).html("<img src='cartas/basto/7.jpg'>");
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==10)$("."+cl).html("<img src='cartas/basto/10.jpg'>");
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==11)$("."+cl).html("<img src='cartas/basto/11.jpg'>");
		if(barajaU[ind].tipo=="Basto"&&barajaU[ind].num==12)$("."+cl).html("<img src='cartas/basto/12.jpg'>");
	}
	//});
	//if(barajaU[ind].tipo=="oro"&&barajaU[ind].num==1)$("."+cl).attr("cartas/oro/1.jpg", "square");
}
//alert(Duelo(new Carta("Oro",2,2),new Carta("Oro",6,6),"Espada"));



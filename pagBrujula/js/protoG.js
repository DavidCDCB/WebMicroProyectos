var apunt=0,est,est1;
var punt=0,puntT=0,puntM;
var und=false;

$(document).ready(function(){
	//	localStorage["puntM"]=0;
	var matrizR=new Array(4);
	var matrizH=new Array(4);
	var matrizHT=new Array(4);
	var mTo=new Array(10),ind=0;
	var mTo1=new Array(10),ind1=0;
	for (i = 0; i < 4; i++){
		matrizR[i]=new Array(4);
		matrizH[i]=new Array(4);
		matrizHT[i]=new Array(4);
	}
	for (i = 0; i < 4; i++){
		for (x = 0; x < 4; x++){
			matrizR[i][x]=0;
		}
	}

	if(localStorage["puntM"]==undefined){
		localStorage["puntM"]=0;
	}

	$(".punt").text(punt);
	$(".puntM").text(localStorage["puntM"]+"");
	matrizR=llenar(llenar(matrizR)[0])[0];
	mostrar(met(matrizH),matrizR);
	
	$(document).ready(function(){
	   $(document).keypress(function(e){
			e.preventDefault();
			if(String.fromCharCode(e.which)=="d"){
				matrizHT=save(matrizHT,matrizR);
				anim1(update(derN3(matrizR,matrizH)),matrizH);
			}
			if(String.fromCharCode(e.which)=="a"){
				matrizHT=save(matrizHT,matrizR);
				anim1(update(izN3(matrizR,matrizH)),matrizH);
			}
			if(String.fromCharCode(e.which)=="s"){
				matrizHT=save(matrizHT,matrizR);
				anim1(update(abN3(matrizR,matrizH)),matrizH);
			}
			if(String.fromCharCode(e.which)=="w"){
				matrizHT=save(matrizHT,matrizR);
				anim1(update(arN3(matrizR,matrizH)),matrizH);
			}
			if(String.fromCharCode(e.which)=="z"){
				if(und){
					matrizR=save(matrizR,matrizHT);
					punt=punt-apunt;
					$(".punt").text(punt);
					und=false;
				}
			}
			
			mostrar(met(matrizH),matrizR);
	   });
	   document.getElementById("2048").addEventListener('touchmove', function(event){
		if (event.targetTouches.length >= 1) {
				var touch = event.targetTouches[0]; 
				mTo[ind]= Math.round(touch.pageX);
				mTo1[ind1]= Math.round(touch.pageY);
				if(ind<mTo.length){
					ind++;
				}
				if(ind1<mTo1.length){
					ind1++;
				}
			}

		}, false);

	   document.getElementById("2048").addEventListener('touchend', function(event){
	   	for (i = 0; i < mTo.length; i++){
			console.log(mTo.length+"-"+mTo[i]);
		}
		if(tDe(mTo)){
				matrizHT=save(matrizHT,matrizR);
				anim1(update(derN3(matrizR,matrizH)),matrizH);
		}

		if(tIz(mTo)){
				matrizHT=save(matrizHT,matrizR);
				anim1(update(izN3(matrizR,matrizH)),matrizH);
		}

		if(tDe(mTo1)){
				matrizHT=save(matrizHT,matrizR);
				anim1(update(abN3(matrizR,matrizH)),matrizH);
		}

		if(tIz(mTo1)){
				matrizHT=save(matrizHT,matrizR);
				anim1(update(arN3(matrizR,matrizH)),matrizH);
		}


		for (i = 0; i < mTo.length; i++){
			mTo[i]=0;
		}
		for (i = 0; i < mTo1.length; i++){
			mTo1[i]=0;
		}
		ind=0;
		ind1=0;
		mTo=new Array(10);
		mTo1=new Array(10);
		mostrar(met(matrizH),matrizR);
		}, false);

	})
		
});


function tDe(arr){
	var val=false;
	if((arr[0]-arr[arr.length-1])<-30){
		//alert((arr[0]-arr[arr.length-1]));
		val=true;
	}
	return val;
}

function tIz(arr){
	var val=false;
	if((arr[0]-arr[arr.length-1])>30){
		val=true;
	}
	return val;
}


function anim(f,c,mH){
	mH[f][c].css({'fontSize':'5px'});
	mH[f][c].animate({fontSize: '30px'}, 500).animate({fontSize: '25px'}, 500)
}



function anim1(cor,mH){
	mH[cor[0]][cor[1]].css({'opacity':'0'});
	mH[cor[0]][cor[1]].animate({opacity: "1"}, 1200)
}

function met(m){
	var cont=1;
	
	for (i = 0; i < 4; i++){
		for (x = 0; x < 4; x++){
			
			m[i][x]=$("."+cont);
			cont++;
			//console.log(ltd[i].text()+"---");
		}
	}
	return m;
}

function getRan() {
	return Math.round(Math.random()*(3));
}

function compp(m) {//Comprovacion de perdida
	var est = true;
		for ( f = 0; f < 4; f++) {
			
			for ( c = 0; c < 4; c++) {
				if (m[f][c] == 0) {
					est = false;
				}
			}
		}
	return est;
}

function llenar(numeros) {
	var cor=new Array(2);
	var re=new Array(2);
	var n = 0, m = 0;
	for (i = 0; i < 1; i++) {
		
		if (!compp(numeros)) {
			do {
				n = getRan();
				m = getRan();
				console.log(n+"-"+m);
			} while (numeros[n][m] != 0);

		}
		numeros[n][m] = 2;
		cor[0]=n;
		cor[1]=m;
	}
	re[0]=numeros;
	re[1]=cor;
	return re;
}
function mostrar(mH,mR) {
	for (i = 0; i < 4; i++){
		for (x = 0; x < 4; x++){

			if(mR[i][x]==2){

				mH[i][x].css({'color':'blue'});
			}else if(mR[i][x]>2){
				mH[i][x].css({'color':'red'});
			}else{
				mH[i][x].css({'color':'black'});
			}
			if(mR[i][x]>4){
				mH[i][x].css({'color':'green'});
			}
			if(mR[i][x]==0){
				mH[i][x].text("0");
				mH[i][x].css({'color':'#E3E3E3'});

			}else
				mH[i][x].text(mR[i][x]+"");
		}
	}
}



function cerosd(m) {//iz 0 Barrido de ceros a la Izquierda
	for (f = 0; f < 4; f++) {
		for (c = 4 - 1; c >= 0; c--) {
			if (c > 0) {
				if (m[f][c] == 0 && m[f][c - 1] != 0) {
					est1 = true;
					m[f][c] = m[f][c - 1];
					m[f][c - 1] = 0;
				}
			}
		}
	}
	return m;
}


function cerosi(m) {//de 0
	for ( f = 0; f < 4; f++) {
		for ( c = 0; c < 4; c++) {
			if (c < 3) {
				if (m[f][c] == 0 && m[f][c + 1] != 0) {
					est1 = true;
					m[f][c] = m[f][c + 1];
					m[f][c + 1] = 0;
				}
			}
		}
	}
	return m;
}

function cerosab(m) {//arr 0
	for ( f = 4 - 1; f >= 0; f--) {
		for ( c = 4 - 1; c >= 0; c--) {
			if (f > 0) {
				if (m[f][c] == 0 && m[f - 1][c] != 0) {
					est1 = true;
					m[f][c] = m[f - 1][c];
					m[f - 1][c] = 0;
				}
			}
		}
	}
	return m;
}

function cerosar(m) {//ab 0
	for ( f = 0; f < 4; f++) {
		for ( c = 0; c < 4; c++) {
			if (f < 3) {
				if (m[f][c] == 0 && m[f + 1][c] != 0) {
					est1 = true;
					m[f][c] = m[f + 1][c];
					m[f + 1][c] = 0;
				}
			}
		}
	}
	return m;
}


function derN3(m,mH) {//Suma de Iguales hacia la derecha
	var b = 0;
		cerosd(m);
		cerosd(m);
	for ( f = 0; f < 4; f++) {
		for ( c = 3; c >= 0; c--) {
			if (c > 0) {
				if (m[f][c] == m[f][c - 1] && (m[f][c] != 0 && m[f][c - 1] != 0)) {
					b = 1;
					m[f][c] = m[f][c] + m[f][c - 1];
					anim(f,c,mH);
					apunt=m[f][c];
					est=true;
					m[f][c - 1] = 0;
				} else
				if (b == 0)
					 est = false;
			}
		}
	}
	
		cerosd(m);
		cerosd(m);
	return m;
}


function izN3(m,mH) {
	var b = 0;
		cerosi(m);
		cerosi(m);
	for ( f = 0; f < 4; f++) {
		for ( c = 0; c < 4; c++) {
			if (c < 3) {
				if (m[f][c] == m[f][c + 1] && (m[f][c] != 0 && m[f][c + 1] != 0)) {
					b = 1;
					m[f][c] = m[f][c] + m[f][c + 1];
					anim(f,c,mH);
					apunt=m[f][c];
					est=true;
					m[f][c + 1] = 0;
				} else if (b == 0)
					est = false;
			}
		}
	}

	
		cerosi(m);
		cerosi(m);
	return m;
}

function abN3(m,mH) {
	var b = 0;
	cerosab(m);
	cerosab(m);
	for ( f = 4 - 1; f >= 0; f--) {
		for ( c = 4 - 1; c >= 0; c--) {
			if (f > 0) {
				if (m[f][c] == m[f - 1][c] && (m[f][c] != 0 && m[f - 1][c] != 0)) {
					b = 1;
					m[f][c] = m[f][c] + m[f - 1][c];
					anim(f,c,mH);
					apunt=m[f][c];
					est=true;
					m[f - 1][c] = 0;
				} else if (b == 0)
					est = false;
			}
		}
	}

	cerosab(m);
	cerosab(m);
	return m;
}

function arN3(m,mH) {
	var b = 0;
		cerosar(m);
		cerosar(m);
	for ( f = 0; f < 4; f++) {
		for ( c = 0; c < 4; c++) {
			if (f < 3) {
				if (m[f + 1][c] == m[f][c] && (m[f][c] != 0 && m[f + 1][c] != 0)) {
					b = 1;
					m[f][c] = m[f][c] + m[f + 1][c];
					anim(f,c,mH);
					apunt=m[f][c];
					est=true;
					m[f + 1][c] = 0;
				} else if (b == 0)
					est = false;
			}
		}
	}
		cerosar(m);
		cerosar(m);
	return m;
}

function save(m,ma){
	puntT=punt;
	for (i = 0; i < 4; i++){
		for (x = 0; x < 4; x++){
			m[i][x]=ma[i][x];
		}
	}
	return m;
}

function update(m){
	console.log(est+"--"+est1);
	var cor;
	if(est){
		punt=punt+apunt;
		if(punt>parseInt(localStorage["puntM"])){
			localStorage["puntM"]=punt;
		}
		$(".punt").text(punt+"");
		$(".puntM").text(localStorage["puntM"]+"");
		//m=llenar(m)[0];
		cor=llenar(m)[1];
	}else if(est1) {
		//m=llenar(m)[0];
		cor=llenar(m)[1];
	}

	est=false;
	est1=false;
	
	und=true;
	return cor;

}




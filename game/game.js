var Velocidad=50;
var vSal=5,nSal=0;
var Desplazamiento=8;
var bucle;
var superficie=175;
var canvas=document.getElementById("canvas");
var ctx= canvas.getContext("2d");

var ancho=canvas.width;
var alto=canvas.height;
var modal=document.getElementById("modal");

class Objeto{
	constructor(){
		this.img=document.createElement("img");
	}
	choque(otro){
		if(this.fondo < otro.techo || this.techo > otro.fondo || this.derecha < otro.izquierda || this.izquierda > otro.derecha){
			return false;
		}else return true;
	}
}

class Mundo{
	constructor(){
		this.x=0;
		this.xf=0;
		this.y=superficie;
		this.tamanio=15000;
		this.espacio=61;//tamaño imagen
		this.img=document.createElement("img");
		this.img.src="imagenes/plat.png";
		this.imgf=document.createElement("img");
		this.imgf.src="imagenes/fn.png";
	}
	
	dibujar(){
		ctx.drawImage(this.imgf,this.xf,0,1000,200);
		var tx=this.x;
		for(var i=0;i<=this.tamanio;i++){
			ctx.drawImage(this.img,tx,this.y);
			tx+=this.espacio;
		}
	}
	mover(){
		this.x-=Desplazamiento;
		this.xf-=3;
		if(this.xf<-700){
			this.xf=0;
		}
	}
}

class Dinosaurio extends Objeto{
	constructor(){
		super();
		this.x=50;
		this.w=30;
		this.h=23;
		this.y=superficie-this.h;
		this.img.src="imagenes/pd.png";
		this.techo=this.y;
		this.fondo=this.y+this.h;
		this.derecha=this.x+this.w;
		this.izquierda=this.x;
	}
	dibujar(){
		ctx.drawImage(this.img,this.x,this.y);
	}
	ActualizarCol(){
		this.techo=this.y;
		this.fondo=this.y+this.h;
	}
}

class Ene extends Objeto{
	constructor(x){
		super();
		this.x=x;
		this.hmin=25;
		this.hmax=40;
		this.h=this.aleatorio(this.hmin,this.hmax);
		this.w= this.h*(0.63);
		this.y=superficie-this.h;
		this.img.src="imagenes/es.png";
		this.nmin=1;
		this.nmax=3;
		this.n=this.aleatorio(this.nmin,this.nmax);
		this.dmin=500;
		this.dmax=1000;
		this.d=this.aleatorio(this.dmin,this.dmax);
		this.siguiente=null;
		this.techo=this.y;
		this.fondo=this.y+this.h;
		
		this.izquierda=this.x;
	}
	
	actualizar(){
				this.techo=this.y;
		this.fondo=this.y+this.h;
		
		this.izquierda=this.x;
	}
	dibujar(){
		var tx=this.x;
		for(var i=0;i<this.n;i++){
			ctx.drawImage(this.img,tx,this.y,this.w,this.h);
			tx+=this.w;
			//this.derecha=this.tx;
			
		}
		if(this.siguiente!=null)this.siguiente.dibujar();
	}
	mover(){
		this.x-=Desplazamiento;
		if(this.siguiente!=null)this.siguiente.mover();
	}
	agregar(){
		if(this.siguiente==null){
			this.siguiente=new Ene(this.x+this.d);
		}else this.siguiente.agregar();
	}
	getSig(){
		return this.siguiente;
	}
	aleatorio(a,b){
		return Math.floor((Math.random()*b)+a);
	}
}


var mundo=new Mundo();
var dinosaurio=new Dinosaurio();
var enem=new Ene(300);
for(var i=0;i<600;i++){
	enem.agregar();
}


function Dibujar(){
	ctx.clearRect(0,0,ancho,alto);
	mundo.dibujar();
	dinosaurio.dibujar();
	enem.dibujar();
	ctx.fillStyle="#48A";
	ctx.font="25px Ubuntu";
	ctx.fillText(nSal.toString(),0,20);
	
}

function Frame(){
	Dibujar();
	enem.mover();
	mundo.mover();
	
	Colisiones();
}

function Iniciar(){
	modal.style.display="none";
	bucle=setInterval("Frame()",Velocidad);
}
var salto;

function Colisiones(){
	var temp=enem;
	temp.actualizar();
	while(temp!=null){
		if(temp.choque(dinosaurio)){
			alert();
			break;
		}else temp=temp.getSig();
	}
}

function subir(){
	
	dinosaurio.ActualizarCol();
	dinosaurio.img.src="imagenes/pd1.png";
	dinosaurio.y-=vSal;
	if(dinosaurio.y<=60){
		clearInterval(salto);
		salto=setInterval("bajar()",25);
	}
}
function bajar(){
	
	dinosaurio.ActualizarCol();
	dinosaurio.img.src="imagenes/p2.png";
	dinosaurio.y+=vSal;
	if(dinosaurio.y>=superficie-dinosaurio.h){
		clearInterval(salto);
		dinosaurio.img.src="imagenes/pd.png";
	}
}
function IniciarSalto(){
	
	if(dinosaurio.y==superficie-dinosaurio.h)salto=setInterval("subir()",25);
}


$(document).ready(function(){
	$(document).keypress(function(e){
		e.preventDefault();
		if(String.fromCharCode(e.which)==" "){
			IniciarSalto();
			nSal++;
		}
	});
});

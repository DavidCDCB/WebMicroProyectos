// https://pixijs.download/release/docs/index.html
// https://github.com/kittykatattack/learningPixi#introduction

import { Personaje, Enemy } from "./Clases.js";


let resources = PIXI.Loader.shared.resources;
let app = new PIXI.Application({
	width: 500, 
	height: 300
});
app.renderer.backgroundColor = 0xffffff;
document.querySelector("#app").appendChild(app.view);



window.addEventListener('keydown', (event) => {
	const keyName = event.key;
	//console.log(keyName);
	if(keyName == "ArrowRight"){
		obj.setDirection("r");
	}
	if(keyName == "ArrowLeft"){
		obj.setDirection("l");
	}
	if(keyName == "ArrowUp"){
		obj.setDirection("u");
	}
	if(keyName == "ArrowDown"){
		obj.setDirection("d");
	}

	if(keyName == " "){
		if(obj.estado == "")
			obj.estado = "subida";
	}

	event.preventDefault();
},false);


window.addEventListener('keyup', (event) => {
	obj.setDirection("");
	event.preventDefault(); 
},false);

let renderText = (text)=>{ 
	let style = new PIXI.TextStyle({
		fontFamily: "Arial",
		fontSize: 36,
		fill: "black",
		stroke: '#ff3300',
	});
	let message = new PIXI.Text(text,style);
	message.position.set(0, 10);
	app.stage.addChild(message);
}

let random = (a,b)=>{
	return Math.floor((Math.random()*b)+a);
}

let renderImage = (src,x,y)=>{
	let piso = new PIXI.Sprite(resources[src].texture);
	piso.width = 500
	piso.x = x;
	piso.y = y-piso.height;
	app.stage.addChild(piso);
}


let obj;
let distances = [200,300,400];
let height = [50,60,20] ;
let posicion = 500;
let listEnemy = [];
let countFrames = 0;
let fail = false;
let nSprite = 1;

let gameLoop = ()=>{

	if(!fail){
		countFrames += 1

		// Cambio de sprites segun numero de frames
		if(countFrames % 10 == 0  && obj.estado== ""){
			obj.setImage(resources["src/img/p"+nSprite+".png"].texture);
			if(nSprite < 3){
				nSprite += 1;
			}else{
				countFrames = 0; 
				nSprite = 1;
			}
		}

		// Verifica las etapas del salto
		obj.checkJump()
		// Monitoreo de Movimiento
		obj.move()

		let altura = 0;
		// Verifica coliciones y reutilizacion
		for (const enemy of listEnemy) {
			enemy.move();
			if(obj.colicion(enemy.getRect())){
				fail = true;
			}   

			if(enemy.getPosX() <= 0){

				listEnemy.splice(0,1);
				app.stage.removeChild(enemy.getRect());

				altura = height[random(0,height.length)];
				posicion = listEnemy[listEnemy.length-1].getPosX()+distances[random(0,distances.length)];
				listEnemy.push(new Enemy(app,new PIXI.Sprite(resources["src/img/e1.png"].texture),posicion,300-altura,[20,altura]));
			}
		} 
		
		// Establece el movimiento y renderiza los enemigos
		for (const enemy of listEnemy) {
			enemy.getRect().vx = -5;
			enemy.render();
		}
	}
}

let setup = ()=>{
	//Creacion de elementos
	obj = new Personaje(app,new PIXI.Sprite(resources["src/img/p1.png"].texture),100,300-60,[50,60]);
	
	let altura = 0;
	for (let i = 0; i < 5; i++) {
		altura = height[random(0,height.length)];
		if(listEnemy.length>0){
			posicion = listEnemy[listEnemy.length-1].getPosX()+distances[random(0,distances.length)];
		}	
		listEnemy.push(new Enemy(app,new PIXI.Sprite(resources["src/img/e1.png"].texture),posicion,300-altura,[20,altura]));
	}
	
	// Renderizado inicial
	renderImage("src/img/piso.png",0,300);
	obj.render();
	renderText("Trex Game");

	app.ticker.add(delta => gameLoop(delta));
}

//Carga de recursos de imagenes
PIXI.Loader.shared.add([
	"src/img/p1.png",
	"src/img/p2.png",
	"src/img/p3.png",
	"src/img/e1.png",
	"src/img/piso.png",
	"src/img/target.bmp"
]).load(setup);

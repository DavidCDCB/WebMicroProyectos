export class Object {
	constructor(game,src,posX,posY,size){
		this.rect = src;
		this.rect.x = posX;
		this.rect.y = posY;
		this.rect.width = size[0];
		this.rect.height = size[1];
		this.rect.vx = 0;
		this.rect.vy = 0;
		this.game = game;
	}

	getRect(){
		return this.rect;
	}

	setImage(img){
		this.rect.texture = img;
	}
 
	getPosX(){
		return this.rect.x;
	}
	getPosY(){
		return this.rect.y;
	}
	setPosX(x){
		this.rect.x = x;
	}
	setPosY(y){
		this.rect.y = y;
	}

	render(){
		this.game.stage.addChild(this.getRect());
	}
	
	move(){
		this.setPosX(this.getPosX()+this.getRect().vx)
		this.setPosY(this.getPosY()+this.getRect().vy)
	}

	setDirection(dir){
		switch (dir) {
			case "r":
				this.getRect().vx = 1;
				break;
			case "l":
				this.getRect().vx = -1;
				break;
			case "d":
				this.getRect().vy = 1;
				break;
			case "u":
				this.getRect().vy = -1;
				break;
			default:
				this.getRect().vx = 0;
				this.getRect().vy = 0;
		}
	}


	colicion(r2){
		let r1 = this.getRect();
		// Numero de reduccion del campo de colicion
		let space = 10;

		//Define the variables we'll need to calculate
		let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
		
		//hit will determine whether there's a collision
		hit = false;
	
		//Find the center points of each sprite
		r1.centerX = r1.x + r1.width / 2;
		r1.centerY = r1.y + r1.height / 2;
		r2.centerX = r2.x + r2.width / 2;
		r2.centerY = r2.y + r2.height / 2;
	
		//Find the half-widths and half-heights of each sprite
		r1.halfWidth = r1.width / 2;
		r1.halfHeight = r1.height / 2;
		r2.halfWidth = r2.width / 2;
		r2.halfHeight = r2.height / 2;
	
		r1.halfWidth -= space;
		r1.halfHeight -= space;
	
	
		//Calculate the distance vector between the sprites
		vx = r1.centerX - r2.centerX;
		vy = r1.centerY - r2.centerY;
	
		//Figure out the combined half-widths and half-heights
		combinedHalfWidths = r1.halfWidth + r2.halfWidth;
		combinedHalfHeights = r1.halfHeight + r2.halfHeight;
	
		//Check for a collision on the x axis
		if (Math.abs(vx) < combinedHalfWidths) {
			//A collision might be occurring. Check for a collision on the y axis
			if (Math.abs(vy) < combinedHalfHeights) {
				//There's definitely a collision happening
				hit = true;
			} else {
				//There's no collision on the y axis
				hit = false;
			}
		} else {
			//There's no collision on the x axis
			hit = false;
		}
		//`hit` will be either `true` or `false`
		return hit;
	};

}


export class Personaje extends Object{

	constructor(game,r,posX,posY,size){
		super(game,r,posX,posY,size);
		this.estado = "";
		this.disMove = 1;
		this.suspendido = 0;
	}

	checkJump(){
		let speed = 4 ;
		if(this.estado == "subida"){
			if(this.disMove <= 100){
				this.getRect().vy = -1*speed;
				this.disMove += speed;
			}else{
				this.estado = "suspendido";
			}
		}
		if(this.estado == "suspendido"){
			if(this.suspendido <= 50 ){
				this.getRect().vy = 0;
				this.suspendido += speed;
			}else{
				this.estado = "caida";
				this.suspendido = 0;
			}
		}
		if(this.estado == "caida"){
			if(this.disMove >= 5 ){
				this.getRect().vy = speed;
				this.disMove -= speed;
			}else{
				this.estado = "";
				this.getRect().vy = 0;
			}
		}
	}
}


export class Enemy extends Object{

	constructor(game,r,posX,posY,size){
		super(game,r,posX,posY,size);
	}
}
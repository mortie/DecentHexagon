var tree = new Object();
tree.x = canvas.width/2;
tree.y = canvas.height;
tree.size = 20;
tree.vely= 0;
tree.velx = 0;
tree.canShoot = true;
//s er på bildet
tree.sx = 0;
tree.sy = 0;
tree.sWidth = 320;
tree.sHeight = 180;
//d er på canvasen
tree.dx = 0;
tree.dy = 0;
tree.dWidth = 120;
tree.dHeight = 67;
tree.isBurning = false;
tree.type = "tree";
tree.damage = 0.8;
tree.dead = false;

tree.draw = function() {
    this.y += this.vely;
    this.x += Math.round(this.velx);
    ctx.save();
    ctx.beginPath();
    //trunk
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y+tree.size*3);
    ctx.lineTo(this.x+tree.size*2, this.y+tree.size*3);
    ctx.lineTo(this.x+this.size*2, this.y);
    ctx.fillStyle = "rgb(142, 128, 58)";
    ctx.fill();
    //halfTree
    ctx.beginPath();
    ctx.moveTo(this.x+this.size*2, this.y);
    ctx.lineTo(this.x+tree.size*3, this.y+tree.size*-1);
    ctx.lineTo(this.x+tree.size*4, this.y+tree.size*-1);
    ctx.lineTo(this.x+tree.size*4, this.y+tree.size*-3);
    ctx.lineTo(this.x+tree.size*3, this.y+tree.size*-3);
    ctx.lineTo(this.x+tree.size*3, this.y+tree.size*-4);
    ctx.lineTo(this.x+tree.size*2, this.y+tree.size*-4);
    ctx.lineTo(this.x+tree.size*2, this.y+tree.size*-5);
    //otherHalfTree
    ctx.lineTo(this.x+tree.size*0, this.y+tree.size*-5);
    ctx.lineTo(this.x+tree.size*0, this.y+tree.size*-4);
    ctx.lineTo(this.x+tree.size*-1, this.y+tree.size*-4);
    ctx.lineTo(this.x+tree.size*-1, this.y+tree.size*-3);
    ctx.lineTo(this.x+tree.size*-2, this.y+tree.size*-3);
    ctx.lineTo(this.x+tree.size*-2, this.y+tree.size*-1);
    ctx.lineTo(this.x+tree.size*-1, this.y+tree.size*-1);
    ctx.lineTo(this.x, this.y);
    ctx.fillStyle = "rgb(29, 196, 65)";
    ctx.fill();

    ctx.restore();
}
tree.update = function() {
    this.gravity();
    this.dx = this.x-this.dWidth/2+this.size/1.5;
    this.dy = this.y-this.dHeight/2-this.size*4-(this.size*(this.damage-1));
    tree.dWidth = 120+(120*(tree.damage-1));
    tree.dHeight = 67+(76*(tree.damage-1));
    tree.makeVec();
    this.burn();
    this.attack();
}
tree.attack = function() {
    if (this.canShoot == true) {
        entities.push(makeBullet(this.x+tree.size*1, this.y+tree.size*-3, this.normTree2HexVecy, this.normTree2HexVecx, "tree"));
        this.canShoot = false;
        setTimeout(function() {
            this.canShoot = true;
        }.bind(this), 400);
    }
}
tree.makeVec = function() {
    tree.tree2HexVecx = Math.round(hexagon.x - (this.x - this.size/2));
    tree.tree2HexVecy = Math.round((hexagon.y + hexagon.height/2)- (this.y+tree.size*-3));
    tree.length = Math.sqrt((this.tree2HexVecx*this.tree2HexVecx)+(this.tree2HexVecy*this.tree2HexVecy));
    tree.normTree2HexVecx = this.tree2HexVecx/this.length*20;
    tree.normTree2HexVecy = this.tree2HexVecy/this.length*20;
    ctx.beginPath();
    ctx.moveTo((this.x - this.size/2), (this.y+tree.size*-3));
    ctx.lineTo(hexagon.x, hexagon.y + hexagon.height/2)
    ctx.lineWidth = 10;
    ctx.closePath();
    ctx.stroke();
}
tree.burn = function() {
    for (var i in entities) {
        if (entities[i].type == "bullet" && entities[i].canExplode == false && !entities[i].hasExploded && entities[i].shooterType == "hexagon") {
            if (entities[i].x + entities[i].size + entities[i].hexOut >= this.x+this.size*-2-(entities[i].size+entities[i].hexOut*2) &&
                this.x+this.size*4-(entities[i].size+entities[i].hexOut*2) >= entities[i].x-entities[i].hexOut) {
                if (entities[i].y > this.y+this.size*-5 && this.y+this.size*3 >= entities[i].y) {
                    entities[i].startExploding();
                    tree.damage += 0.2;
                }
            }
        }
        if (entities[i].type == "bullet") {
        }
    }
    if (this.damage >= 1) {
        ctx.drawImage(treeFlame, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
    }
    if (this.damage >=3) {
        this.damage = 0.8;
        this.y = 0 - this.size*4;
        this.vely= 0;
    }
}

tree.gravity = function() {
    if (this.y + this.size*-5 < canvas.height) {
        this.vely+= 0.1;
    }
    if (this.y + this.size*3 > canvas.height) {
        this.vely= this.vely*-0.25;
        this.y = canvas.height - this.size*3;
    }
}

setInterval(burnTree, 25)
function burnTree() {
    if (tree.sx < 4800) {
        tree.sx += 320
    }
    else {tree.sx = 320}
}

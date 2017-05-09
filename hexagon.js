var hexagon = new Object();
  hexagon.x = 100;
  hexagon.y = 100;
  hexagon.size = 50;
  hexagon.hexOut = Math.round(Math.sqrt((hexagon.size*hexagon.size)-(((1.72*hexagon.size)/2)*((1.72*hexagon.size)/2))));
  hexagon.height = Math.round((1.72*hexagon.size));
  hexagon.halfheight = Math.round(hexagon.height/2);
  hexagon.keys = [];
  hexagon.vely= 0;
  hexagon.velx = 0;
  //s er på bildet
  hexagon.sx = 0;
  hexagon.sy = 0;
  hexagon.sWidth = 78;
  hexagon.sHeight = 96;
  //d er på canvasen
  hexagon.dx = 0;
  hexagon.dy = 0;
  hexagon.dWidth = hexagon.size*2.6;
  hexagon.dHeight = 1.23*hexagon.dWidth;
  hexagon.type = "hexagon";
  hexagon.dead = false;
  hexagon.canShoot = true;
  //pew pew

  hexagon.draw = function() {
    this.y += this.vely;
    this.x += Math.round(this.velx);
    if ((this.keys && this.keys[87]) || (this.keys && this.keys[38])){
      this.dx = this.x+this.size/2-this.dWidth/2;
      this.dy = this.y+this.height-(this.dHeight/7.95);
      ctx.drawImage(image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
    }
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x+this.size, this.y);
    ctx.lineTo(this.x+this.size+this.hexOut, this.y+this.halfheight);
    ctx.lineTo(this.x+this.size, this.y+this.height);
    ctx.lineTo(this.x, this.y+this.height);
    ctx.lineTo(this.x-this.hexOut, this.y+this.halfheight);
    ctx.lineTo(this.x, this.y);
    var b = Math.floor(Math.abs(Math.sin(this.x / 300)) * 255);
    var g = Math.floor(Math.abs(Math.sin(this.y / 300)) * 255);
    ctx.fillStyle = "rgb(0, "+g+", "+b+")";
    ctx.fill();
    ctx.restore();
  }
  hexagon.update = function() {
    hexagon.gravity();
    hexagon.airResistance();
    hexagon.movement();
    hexagon.shoot();
    hexagon.getShot();
    for (var i in entities) {
      if (this.canExplode == true) {
      }
    }
  }
  hexagon.gravity = function() {
    if (this.y + this.height < canvas.height) {
      this.vely+= 0.1;
    }
    if (this.y + this.height > canvas.height) {
      this.vely= this.vely*-0.5;
      this.y = canvas.height - this.height;
    }
    if (this.y < 0) {
      this.y = 0;
      this.vely= 0;
    }
  }
  hexagon.airResistance = function() {
    if (this.x + this.size +this.hexOut > canvas.width) {
      this.x = canvas.width - this.size - this.hexOut;
      this.velx = this.velx*-0.5;
    }
    if (this.x - this.hexOut < 0) {
      this.x = this.hexOut;
      this.velx = this.velx*-0.5;
    }
    if (this.velx < 0) {this.velx += 0.05; }
    if (this.velx > 0) {this.velx -= 0.05; }
  }
  hexagon.movement = function() {
    if (this.keys && this.keys[87]) {this.vely-= 0.2;} //W
    if (this.keys && this.keys[65]) {this.velx += -0.2;} //A
    if (this.keys && this.keys[68]) {this.velx += 0.2;} //D
    if (this.keys && this.keys[38]) {this.vely-= 0.2;} //opp
    if (this.keys && this.keys[37]) {this.velx += -0.2;} //venstre
    if (this.keys && this.keys[39]) {this.velx += 0.2;} //høyre
    if ((this.keys && this.keys[87]) && (this.y + this.height >= canvas.height)) {
      this.vely= -1;
    }
    if ((this.keys && this.keys[38]) && (this.y + this.height >= canvas.height)) {
      this.vely= -1;
    }
  }
  hexagon.shoot = function() {
    if (this.keys[32] && this.canShoot) {
      entities.push(makeBullet(this.x+this.size, this.y+this.halfheight, this.vely, 30, "hexagon"));
      this.canShoot = false;
      setTimeout(function() {
        this.canShoot = true;
      }.bind(this), 200);
    }
  }
  hexagon.getShot = function() {
    for (var i in entities) {
      if (entities[i].type == "bullet" && entities[i].shooterType == "tree") {
       if (entities[i].x + entities[i].size + 2*entities[i].hexOut >= this.x && this.x + this.size + 2*this.hexOut >= entities[i].x) {
         if (entities[i].y + entities[i].Halfheight-10 >= this.y && this.y+this.height >= entities[i].y-entities[i].Halfheight) {
           entities[i].startExploding();
           if (this.size > 10 && false) {
            this.size -= 5;
            this.hexOut = Math.round(Math.sqrt((hexagon.size*hexagon.size)-(((1.72*hexagon.size)/2)*((1.72*hexagon.size)/2))));
            this.height = Math.round((1.72*hexagon.size));
            this.halfheight = Math.round(hexagon.height/2);
           }
           //this.damage += 0.2;
          }
        }
      }
    }
  }

  setInterval(animateFiah, 50)
    function animateFiah() {
      if (hexagon.sx < 624) {
        hexagon.sx += 78
      }
      else {hexagon.sx = 78}
    }

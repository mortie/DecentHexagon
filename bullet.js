function makeBullet(x, y, vely, velx, shooterType) {
  var bullet = new Object();
    bullet.size = 20;
    bullet.hexOut = Math.round(Math.sqrt((bullet.size*bullet.size)-(((1.72*bullet.size)/2)*((1.72*bullet.size)/2))));
    bullet.height = Math.round((1.72*bullet.size));
    bullet.Halfheight = Math.round(bullet.height/2);
    bullet.vely= 0;
    bullet.velx = 0;
    //s er på bildet
    bullet.sx = 0;
    bullet.sy = 0;
    bullet.sWidth = 96;
    bullet.sHeight = 96;
    //d er på canvasen
    bullet.dx = 0;
    bullet.dy = 0;
    bullet.dWidth = 192;
    bullet.dHeight = 192;
    bullet.canExplode = false;
    bullet.hasExploded = false;
    bullet.isExploding = false;
    bullet.a = 1;
    bullet.type = "bullet";
    bullet.shooterType = shooterType;
    bullet.x = 0;
    bullet.y = 0;
    bullet.dead = false;

    bullet.startExploding = function() {
      this.vely= 0;
      this.velx = 0;
      this.a = 0;
      this.canExplode = true;
      setTimeout(function(i) {
        this.canExplode = false;
        this.dead = true;
      }.
      bind(this), 300);
      this.hasExploded = true;
    }

    bullet.makeBoom = function() {
      if (this.canExplode == true) {
        if (this.isExploding == false) {
          this.isExploding = true;
          setTimeout(function() {
            this.isExploding = false;
          }.bind(this), 300);
        }
      }
    };

    bullet.stop = function() {
        //rightBoom
        if (x + bullet.size +bullet.hexOut > canvas.width) {
          x = canvas.width - this.size - this.hexOut - 1;
          this.velx = 0;
          this.startExploding();
          this.hasExploded = true;
        }
        //leftBoom
        if (x - this.hexOut < 0) {
          x = this.hexOut + 1;
          this.velx = 0;
          this.startExploding();
          this.hasExploded = true;
        }
        //stahp
        if (this.velx < 0) {this.velx += 0; }
        if (this.velx > 0) {this.velx -= 0; }
        //falling
        if (y + this.height < canvas.height) {
          this.vely+= 0.3;
        }
        //groundBoom
        if (y+this.Halfheight > canvas.height) {
          y = canvas.height - this.height + bullet.Halfheight;
          this.startExploding();
          this.hasExploded = true;
        }
        //probNotGoingToApplyButRoofBoomJustInCase
        if (y < 0) {
          y = 0;
          this.vely= 0;
          this.startExploding();
          this.hasExploded = true;
        }
    };

    bullet.update = function() {
      bullet.y = y;
      bullet.x = x;
      this.vely+= vely;
      this.velx+= velx;
      x += Math.round(this.velx);
      y += this.vely;
      vely= 0;
      velx= 0;
      bullet.stop();

      if (this.hasExploded) {
        this.dx = this.x-this.dWidth/2+this.size/2;
        this.dy = this.y-this.dHeight/2;
        ctx.drawImage(explosion, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
      }
    };

    bullet.draw = function() {
      ctx.beginPath();
      ctx.moveTo(x, y-bullet.Halfheight);
      ctx.lineTo(x+bullet.size, y-bullet.Halfheight);
      ctx.lineTo(x+bullet.size+bullet.hexOut, y);
      ctx.lineTo(x+bullet.size, y+bullet.height-bullet.Halfheight);
      ctx.lineTo(x, y+bullet.height-bullet.Halfheight);
      ctx.lineTo(x-bullet.hexOut, y);
      ctx.lineTo(x, y-bullet.Halfheight);
      var b = Math.floor(Math.abs(Math.sin(x / 200)) * 255);
      var g = Math.floor(Math.abs(Math.sin(y / 200)) * 255);
      ctx.fillStyle = "rgba(0, "+g+", "+b+", "+this.a+")";
      ctx.fill();
      bullet.makeBoom();
    };

    setInterval(animateExplosion, 16)
      function animateExplosion() {
        if (bullet.canExplode == true) {
        if (bullet.sx < 1824) {
          bullet.sx += 96
        }
        else {bullet.sx = 96}
        }
      }

    return bullet;
  }

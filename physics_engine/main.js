const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let BALLZ = [];
let LEFT, RIGHT, UP, DOWN;
let friction = 0.9;



class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static add(vec1, vec2) {
    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
  }
  static sub(vec1, vec2) {
    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
  }
  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  mult(n) {
    this.x *= n;
    this.y *= n;
  }
  unit(){
      if (this.mag() == 0){
          return new Vector(0,0);
      }
      return new Vector(this.x/this.mag(),this.y/this.mag());
  }
  normal(){
      return new Vector(-this.y,this.x).unit();
  }
  static dot(vec1,vec2){
      return vec1.x*vec2.x + vec1.y+vec2.y;
  }
}


class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.acceleration = 1;
    this.acc = new Vector(0,0);
    this.vel = new Vector(0,0);
    this.player = false;
    BALLZ.push(this);
  }
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fcacbc";
    ctx.fill();
  }
}

function keyControl(ball) {
  document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight") {
      RIGHT = true;
    }
    if (e.code == "ArrowLeft") {
      LEFT = true;
    }
    if (e.code == "ArrowUp") {
      UP = true;
    }
    if (e.code == "ArrowDown") {
      DOWN = true;
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowRight") {
      RIGHT = false;
    }
    if (e.code == "ArrowLeft") {
      LEFT = false;
    }
    if (e.code == "ArrowUp") {
      UP = false;
    }
    if (e.code == "ArrowDown") {
      DOWN = false;
    }
  });
  if (RIGHT) {
    ball.acc.x = ball.acceleration;
  }
  if (LEFT) {
    ball.acc.x = -ball.acceleration;
  }
  if (UP) {
    ball.acc.y = -ball.acceleration;
  }
  if (DOWN) {
    ball.acc.y = ball.acceleration;
  }
  //stop the ball
  if(!UP && !DOWN){
      ball.acc.y = 0;
  }
  if (!LEFT && !RIGHT) {
    ball.acc.x = 0;
  }
  //move the ball
  let accelerationVector = ball.acc.unit();
  accelerationVector.mult(ball.acceleration)
  ball.vel = Vector.add(ball.vel, accelerationVector);
  ball.vel.mult(friction);

  ball.x += ball.vel.x;
  ball.y += ball.vel.y;
}


function mainLoop() {
  requestAnimationFrame(mainLoop);
  keyControl(ball1);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  BALLZ.forEach((ball) => {
    ball.drawBall();
  });
}
let ball1 = new Ball(100, 100, 20);
mainLoop();

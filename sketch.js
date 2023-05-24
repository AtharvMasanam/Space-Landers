let ground;
let lander;
var lander_img;
var bg_img;
var meteor, meteorGroup, meteor_img;
var gameState = "play";
var moon;

var edges;

var frameCount = frameCount;
var meteorVelocityX = 0;

var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  meteor_img = loadImage("meteor.png");

}

function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  frameRate(80);

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.debug = false;
  lander.setCollider("circle",0,0,300);

  moon = createSprite(1620,275,150,150);
  moon.visible = false;

  meteorGroup = new Group();

  lander.velocityY = 0;

  edges = createEdgeSprites();

  rectMode(CENTER);
  textSize(15);
}

function draw() {
  background(51);
  lander.collide(edges[0]);
  lander.collide(edges[1]);
  lander.collide(edges[2]);
  imageMode(CENTER);
  console.log(meteorGroup.velocityX);
  

  image(bg_img,width/2, height/2, width, height);
  if(gameState === "play"){

    if(keyDown(LEFT_ARROW)){
    lander.x -= 5;
    }

    if(keyDown(RIGHT_ARROW)){
      lander.x += 5;
    }

    if(keyDown(UP_ARROW)){
      lander.velocityY -= 0.5;

    }

    if(lander.y > height){
      lander.y = 300;
    }

    if(frameCount%100 == 0){
      meteorVelocityX -= 0.5;
    }

    

    if(lander.isTouching(moon)){
      gameState = "win";
    }
    
    vy +=g;
    lander.position.y+=vy;

    createObstacles();

    if(meteorGroup.isTouching(lander)){
      gameState = "end";
    }
    
    
  }
   
  if(gameState === "win"){
     meteorVelocityX = 0;
      meteorGroup.setVelocityXEach(0);
      vy = 0;
      lander.position.x = 1620
      lander.position.y = 275;
      meteorGroup.destroyEach();
      meteorGroup.setLifetimeEach(-1)
      fill("white");
      textSize(70);
      text("Congratulations You Have Reached The Moon", width/2 - 700, height/2);
      
  }

  if(gameState === "end"){
    fill("white");
    textSize(35);
    text("You Died!", width/2 - 35, height/2);
    
    fill("white");
    textSize(40);
    text("Try not to touch the asteroid next time!", width/2 - 300, height-200)
    meteorGroup.destroyEach();
  }
  push()
  fill(255);
  pop();

  
 
  

  
  
  drawSprites();
}

function createObstacles(){
  if(frameCount%40==0){
    meteor = createSprite(random(width/4,width),random(20,height-20),20,20);
    meteor.addImage(meteor_img);
    meteor.velocityX = -3 + meteorVelocityX;
    meteor.scale = 0.4;
    meteorGroup.add(meteor)
    meteor.lifetime = 650;
  }

}

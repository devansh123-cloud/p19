var gameState = "play";
var spookySound;

var tower, towerImage;
var door , doorImg , doorsGroup;
var climber , climberImg;
var ghost , ghostImg;
var invisibleBlock , invisibleBlockGroup;
function preload() {
  
towerImage = loadImage("tower.png");
doorImg = loadImage("door.png");
climberImg = loadImage("climber.png")
ghostImg = loadImage("ghost-standing.png");
spookySound = loadSound("spooky.wav");

}


function setup () {
doorsGroup = new Group();
climberGroup = new Group();

invisibleBlockGroup = new Group();
createCanvas(600,600);
spookySound.loop();
tower = createSprite(300,300)
tower.addImage(towerImage);
tower.velocityY = 1;

ghost = createSprite(200,200,50,50);
ghost.addImage(ghostImg);
ghost.scale = 0.4;

}

function draw() {
background(0);

if(gameState === "play") {
   
   
if (tower.y > 400) {
  tower.y = 300;
    
    }
  
if(keyDown("LEFT_ARROW")) {
  ghost.x = ghost.x - 3;
  }
  
if(keyDown("RIGHT_ARROW")) {
ghost.x =  ghost.x + 3;
}

if(keyDown("space")) {
ghost.velocityY = -10;
}
ghost.velocityY = ghost.velocityY + 0.2;
  
if(climberGroup.isTouching(ghost)) {
  ghost.velocityY = 0;
}

if(invisibleBlockGroup.isTouching(ghost)) {
ghost.destroy(); 
gameState = "end";
   }
   
   
spawnDoors();
drawSprites();
  
}
if (gameState === "end") {
  text("GAME OVER", 230, 250);
  
}

}

function spawnDoors() {
if(frameCount % 240===0) {
  door =  createSprite(200, -50);
  door.addImage(doorImg);
  
  climber = createSprite(200,10);
  climber.addImage(climberImg);
  climber.velocityY = 1;
  climber.lifetime = 800;
  climber.x = door.x;
  
  climberGroup.add(climber);
  
  
  invisibleBlock = createSprite(200,15);
  invisibleBlock.height = 2;
  invisibleBlock.width = climber.width;
  invisibleBlock.x = door.x;
  invisibleBlock.velocityY = 1;
invisibleBlockGroup.add(invisibleBlock);
invisibleBlock.debug = true;
  ghost.depth = door.depth;
ghost.depth = ghost.depth + 1;
  
  door.x = Math.round(random(120,400));
  door.lifetime = 800;
  door.velocityY = 1;
  doorsGroup.add(door);
  
  

  
}
  
}


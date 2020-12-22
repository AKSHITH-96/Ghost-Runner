var tower,tower_im;
var door,door_im;
var climber,climber_im;
var ghost,ghost_st,ghost_jm;
var doorGroup,climberGroup;
var invisibleBlock,invisbleBlockGroup;
var gameState = "play";
var sound;

function preload(){
  tower_im = loadImage("tower.png");
  door_im = loadImage("door.png");
  climber_im = loadImage("climber.png");
  ghost_st = loadImage("ghost-standing.png");
  ghost_jm = loadImage("ghost-jumping.png");
  sound = loadSound("spooky.wav");
  
}
function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(tower_im);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghost_st);
  ghost.scale = 0.4;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleBlockGroup = createGroup();
  
  sound.loop();
  
}
function draw(){
  background("black");
  if(gameState === "play"){
    
  if(tower.y > 400){
    tower.y = 300;
   }
    if(keyDown("space")){
    ghost.velocityY = -6;
   }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(keyDown("left")){
    ghost.x = ghost.x-3;
   }
  if(keyDown("right")){
    ghost.x = ghost.x+3;
   }
     
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
   }
   if(invisibleBlockGroup.isTouching(ghost)||ghost.y >          600){
    ghost.destroy();
    gameState = "end";
  }
  
  spawnWindow();
  drawSprites();
  }
  
  if(gameState === "end"){
    textSize(50);
    fill("yellow");
    
    text("Game Over",200,300);
  }
 
  
}
function spawnWindow(){
  if(frameCount%250 == 0){
  door = createSprite(round(random(150,400),-50));
  door.addImage(door_im);
  door.velocityY = 1;  
  door.lifetime = width/1;
  doorGroup.add(door);
  
  climber = createSprite(door.x,50);
  climber.addImage(climber_im);
  climber.velocityY = 1;
  climber.lifetime = width/1;
  climberGroup.add(climber);
  
  invisibleBlock = createSprite(door.x,50,climber.width,2);
  invisibleBlock.velocityY = 1;
  invisibleBlock.debug = true;
  invisibleBlockGroup.add(invisibleBlock);
    
  ghost.depth = door.depth;  
  ghost.depth = ghost.depth+1;  
  }
}
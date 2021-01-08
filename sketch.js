var bananaImage,obstacleImage,obstacleGroup,backImage,score,playerRunning,backGround,player,banana,invisibleGround,ground,stones,playerImage,bananaGroup;
var gameOver, endGameImage;

function preload(){
backImage=loadImage("jungle2.jpg");
bananaImage=loadImage("Banana.png");
obstacleImage=loadImage("stone.png");
playerRunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
endGameImage=loadImage("Game over.png")
}


function setup() {
createCanvas(800,400);
backGround = createSprite(400,200,800,420);
backGround.addImage("background",backImage);
player = createSprite(100,340,20,50);
player.addAnimation("running",playerRunning);
player.scale=0.1;
score = 0;
ground = createSprite(400,350,800,10);
ground.x = ground.width/2;
ground.velocityX = -2;
ground.visible = false;
gameOver = createSprite(350,200,200,100);
gameOver.addImage("endGame", endGameImage);
gameOver.visible = false;
obstacleGroup = new Group();
bananaGroup = new Group();
}

function draw() {
  background(220);
  //makes the monkey jump when space key is pressed
  if (keyDown("space"))
  {
    player.velocityY=-12;
  }
  
  if (ground.x<0){
  ground.x=ground.width/2;
  }  
  //adds gravity and makes the monkey collide with the ground
  player.velocityY=player.velocityY+0.8;
  player.collide(ground);
  
  //makes the background infinity
  if (backGround.x<0)
  {
    backGround.x=backGround.width/2;
  }
  
  //destroys the banana
  if (bananaGroup.isTouching(player)){
  bananaGroup.destroyEach();
  score=score+2;
  }
  
  if (obstacleGroup.isTouching(player)){
  player.scale=0.08;
  score=0;
  gameOver.visible = true;
  bananaGroup.setVelocityXEach(0);
  bananaGroup.setVelocityYEach(0);
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityYEach(0);
  }
  
  switch(score){
  case 10:player.scale=0.12;
  break;
  case 20:player.scale=0.14;
  break;
  case 30:player.scale=0.16;
  break;
  case 40:player.scale=0.18;
  break;
  default:break;
  }
  
  
  //updates the survival time
  //survivalTime=survivalTime+Math.round(getFrameRate()/60);
  
  drawSprites();
  food();
  stone();
  
  //displays the score
  //survivalTime=Math.ceil(frameCount/getFrameRate());
  textSize(20);
  text("Score: "+score,500,50);
}

function stone()
{
  if (frameCount%300===0)
  {
    //creates the stones sprite and sets it animation and scales it and adds velocity
    var stones = createSprite(400,323,10,40);
    stones.addImage("obstacle",obstacleImage);
    stones.scale=0.1;
    stones.velocityX=-6;
    
    //adds liftime and adds stones to the stoneGroup
    stones.lifetime=70;
    obstacleGroup.add(stones);
  }
  
}

function food() 
{
  if (frameCount%80===0)
  {
    //creates the bannana sprite and sets its animation and scales it
    var bannana = createSprite(400,365,10,40);
    bannana.addImage("banana",bananaImage);
    bannana.scale=0.03;
    
    //sets the y position of the bannana to randomnumber and sets its velocity and       lifetime
    bannana.y=random(120,200);
    bannana.velocityX=-7;
    bannana.lifetime=100;
    
    //adds bannana to the bannanaGroup
    bananaGroup.add(bannana);
  }
}
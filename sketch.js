var monkeyImg;
var bananaImg, foodGroup;
var obstacleImg, obstacleGroup;
var backgroundImg
var score
var ran

function preload(){
// the image of the background
  backgroundImg = loadImage("jungle.jpg");

// the image of the obstacles  
  obstacleImg = loadImage("stone.png");

// the player avatar  
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

// the image of the food   
  bananaImg = loadImage("banana.png");
  
//sets the score
  score = 0;
}

function setup() {
  createCanvas(displayWidth, 400);
  
  backgroundSprite = createSprite(displayWidth-700, 200, 10, 10);
    backgroundSprite.addImage("background", backgroundImg);
    backgroundSprite.scale=1
  
 
  
  player = createSprite(60, 340, 10, 10);
    player.addAnimation("walkingPlayer", monkeyImg);
    player.scale = 0.1;
    player.velocityX = +5;
  
    ground = createSprite(player.x, 400, 100000000000000, 20);
    ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group(); 
  score = 0;
  
}

function draw() {
  background(220);
  
  backgroundSprite.x = 1702;

  player.velocityY = player.velocityY + 0.8      
  
  player.collide(ground); 
  obstacleGroup.collide(ground);
  
  camera.position.x = player.x;
  if (player.x > 3344){
    backgroundSprite.x = backgroundSprite.width;
  }
  
  if (backgroundSprite.x < -100){
    backgroundSprite.x = backgroundSprite.width/2;
  }
  
  if (keyDown("space") && player.y > 325){
   player.velocityY = -15           
  }
  
  score = score + Math.round(getFrameRate()/60);

/*  if (foodGroup.isTouching(player)){
   score = score + 2;
   foodGroup.destroyEach();
  }*/
  
  switch(score){
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;
      default: break;
  }
  
  if (obstacleGroup.isTouching(player)){
   score = 0; 
  }  
  if (foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score+5; 
  }
  
  spawnObstacles();
  drawSprites();
  spawnFood();
  stroke(rgb(255, 255, 255));
  textSize(20);
  fill(rgb(255, 255, 255));
  text("Score: " + score, player.x, 50);
}

function spawnFood(){
  if (frameCount % 457 === 0){
   var food = createSprite(player.x+500, 350, 10, 10);
    food.addImage("the food", bananaImg);
    food.collide(ground);
    food.scale = 0.05;
    food.velocityY = 5;
    food.lifetime = 300;
    foodGroup.add(food);
    food.setCollider("circle", 0, 0, 200);
  }
 }

function spawnObstacles(){
 if (frameCount % 100 === 0){
  var obstacle = createSprite(player.x+500, 350, 10, 10);
   obstacle.addImage("the obstacles", obstacleImg);
   obstacle.collide(ground);
   obstacle.scale = 0.145;
   obstacle.velocityY = 5;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
   obstacle.setCollider("circle", 0, 0, 200);
 }
}
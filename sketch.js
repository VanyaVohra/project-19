var monkey1
var scenery1
var obstacle1
var food1
var invisibleGround
var foodGroup
var obstaclesGroup
var score

function preload() {
  monkey1 = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  scenery1 = loadImage("jungle.jpg");
  obstacle1 = loadImage("stone.png");
  food1 = loadImage("banana.png");
}
function setup() {
  createCanvas(600, 400);
  scenery = createSprite(100,200);
  monkey = createSprite(60,360);
  
  score = 0;
  
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  invisibleGround = createSprite(200,370,400,5);
  invisibleGround.visible = false;
  
  monkey.addAnimation("monkey1", monkey1);
  scenery.addImage("scenery1", scenery1);
  
  
  
  monkey.scale = 0.17;
  scenery.scale=1;
 
  
}

function draw() {
  background(220);
  
  
  
  scenery.velocityX = -4
  if(scenery.x<150){
    scenery.x = scenery.width/3
  }
  
  monkey.collide(invisibleGround);
  
  if(monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    score = score+2;
  }
  
  if(keyDown("space")&&monkey.y>315) {
    monkey.velocityY = -6;
  }
  
  if(monkey.isTouching(obstaclesGroup)){
    monkey.scale = 0.17
  }
  
  switch(score){
    case 10: monkey.scale = 0.2;
      break;
      case 20: monkey.scale = 0.25;
      break;
      case 30: monkey.scale = 0.3;
      break;
      case 40: monkey.scale = 0.35;
      break;
      default: break;
  }
  
  console.log(monkey.y);
  
  monkey.velocityY = monkey.velocityY + 0.1;
  
  spawnFood();
  spawnObstacles();
  
  drawSprites();
  
  textSize(40);
  fill("red");
  text("score:"+score, 400,50);
}

function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    food = createSprite(620,100);
    food.addImage("food1", food1);
    food.scale = 0.08;
    food.y = random(100,200);
    food.velocityX = -4;
    
     //assign lifetime to the variable
    food.lifetime = 334;
    
    //adjust the depth
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(food);
  
  }
  
}


function spawnObstacles() {
  if(frameCount % 150 === 0) {
   
     obstacle = createSprite(620,360);
     obstacle.addImage("obstacle1", obstacle1);
     obstacle.scale=0.28;
    obstacle.velocityX = -4;
    
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 150;
    obstaclesGroup.add(obstacle);
  }
}

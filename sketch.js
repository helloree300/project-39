var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("Road.png");
  
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  
  mainRacerImg3 = loadAnimation("mainPlayer3.png");
  
  opponet1Image = loadImage("opponent1.png")
  
  opponet4Image = loadImage("opponent4.png");
  
  opponet7Image = loadImage("opponent7.png");
  
  opponet8Image = loadImage("opponent8.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  opponet1Image = loadImage("opponent1.png");
  
  bellSound = loadSound("sound/bell.mp3");
}

function setup(){
  
canvas = createCanvas(displayWidth - 40, displayHeight-30);
  
// Moving background
path=createSprite(150,260);
path.addImage(pathImg);
path.velocityX = -5;

  
// creting game over 
  gameOver = createSprite(650,300);
  gameOver.addImage(gameOverImg);
  
  
//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.10;
  
//create cyclistsgroups
yellowCyclistsGroup = new Group();
pinkCyclistsGroup = new Group();
redCyclistsGroup = new Group();  
  
  gameOver.scale = 0.5;
}

function draw() {
  background(0);
  
  
  textSize(20);
  fill(255);
  text("Distance: "+ distance,70,300);
  
  
  if(gameState===PLAY){
    
    //add bell sounds
  if(keyDown("space")){
     bellSound.play();
    }
  
   mainCyclist.y = World.mouseY;
    
    gameOver.visible = false;
    
   distance = distance + Math.round(getFrameRate()/50);
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
    
   path.velocityX = -(6 + 2*distance/150);
   pinkCyclists.velocityX = -(6 + 2*distance/150);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
   var select_oppPlayer = Math.round(random(1,2));

  if(World.frameCount % 150 == 0){
    if (select_oppPlayer == 1){
     pinkCyclists();
   } else if(select_oppPlayer == 2){
     redCyclists();
  }
    else{
      yellowCyclists();
    }
    
  }
 
    if(mainCyclist.isTouching(redCyclistsGroup)||mainCyclist.isTouching(yellowCyclistsGroup)||mainCyclist.isTouching(pinkCyclistsGroup)){
      gameState = END
  }
  }
  
  
  if(gameState===END){
      pinkCyclistsGroup.destroyEach();
      redCyclistsGroup.destroyEach();
      yellowCyclistsGroup.destroyEach();
      
      gameOver.visible = true;
      
      path.velocityX=0;
    
      textSize(25);
      text("press space to restart", 300,100);
    
    if(mousePressedOver(gameOver)) {
      gameState=PLAY;
    }
    
   if(keyDown("UP_ARROW")) {
       reset();
    }
    
  }
  drawSprites();
}


function reset(){
    gameState = PLAY;
    distance=0
  }




function pinkCyclists(){
 opponet1 = createSprite(110,Math.round(random(50,250),10,10));
 opponet1.scale = 0.08;
 opponet1.addImage(opponet1Image);
 opponet1.lifetime=170; 
 pinkCyclistsGroup.add(opponet1);
}

function yellowCyclists(){
 opponet3 = createSprite(300,Math.round(random(70,250),60,30));
 opponet3.scale = 0.08;
 opponet3.addImage(opponet4Image);
 opponet3.lifetime=170;
 opponet3.Velocity=3
 yellowCyclistsGroup.add(opponet3);
 
}

function redCyclists(){
 opponet7 = createSprite(600,Math.round(random(70,250),60,30));
 opponet7.scale = 0.08;
 opponet7.addImage(opponet7Image);
 opponet7.lifetime=150; 
 opponet7.Velocity=3
 redCyclistsGroup.add(opponet7);
}


 

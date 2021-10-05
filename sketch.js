//Create variables here
var dog
var happyDog
var database
var foodS
var foodStock
var changeGameState
var readGameState
var bedroom
var garden
var washroom

function preload()
{
	//load images here
  dogImage = loadImage("dogImg.png")
  happyDogImage = loadImage("dogImg2.png")
  bedroom = loadImage("Bed Room.png")
  garden = loadImage("Garden.png")
  washroom = loadImage("Wash Room.png")
}

function setup() {
	createCanvas(500, 500);

  readState=databse.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })

  dog = createSprite(50,50,10,10)
  dog = addImage()
  food = new Food()
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed=createButton("Feed the dog");
  feed=position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.poisiton(800,95);
  addFood.mousePressed(addFoods);

  function feedDog(){
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  } 

  function addFoods(){
    foodS++;
    database.readStock('/').update({
      Food:foodS
    })
  }
}


function draw() {
  background(46,139,87)
  drawSprites();
  textSize(20)
  fill("lime")
  text("Note: Press UP_ARROW Key To Feed Drago Milk!")
  food.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  //add styles here 
  //if(keyWentDown(UP_ARROW)  ){
    //writeStock(foodS);
    //dog.addImage(dogHappy);
  //}
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })  

  fill(255,255,254); 
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30);
  }else{
    text("Lasst Feed"+ lastFed + "AM", 350,30);
  }

  if(gameState!="Hungry"){
      feed.hide();
      addFood.hide();
      dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function update(state){
  databse.ref('/').update({
    gameSate:state
  });
}
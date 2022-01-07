let h = window.innerHeight;

let w = window.innerWidth;


let myFont;
function preload() {
  myFont = loadFont('font.otf');
}

function setup() {
  textFont(myFont);
  createCanvas(w, h);
  background("#ff0066");
  frameRate(3);
  
}


function randomw() {
    let min = 0;
    let max = w;
    let size = 55;
    let random = Math.floor(Math.random() * (max - min)) + min;
    if (Math.round(random/size)*size > 55) {
      return Math.round(random/size)*size-110;
    } else {
      return Math.round(random/size)*size;
    }
}
function randomh() {
    let min = 0;
    let max = h;
    let size = 55;
    let random = Math.floor(Math.random() * (max - min)) + min;
    if (Math.round(random/size)*size > 55) {
      return Math.round(random/size)*size-110;
    } else {
      return Math.round(random/size)*size;
    }
    
}

x = 0;
y = 0;
size = 55
left_pressed = false;
right_pressed = false;
up_pressed = false;
down_pressed = false;

class Rectangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.next = -1;
  }
}
let k = new Rectangle(0,0);
let snakebody = [k];

// fuction that adds a new rectangle to the snakebody array
function addRectangle() {
    let newRectangle = new Rectangle(snakebody[snakebody.length - 1].x, snakebody[snakebody.length - 1].y);
    snakebody.push(newRectangle);
}

//fuction that sees if any of the snakebody rectangles are outside of the canvas
function checkCollision() {
    for (let i = 0; i < snakebody.length; i++) {
        if (snakebody[i].x < 0 || snakebody[i].x > w || snakebody[i].y < 0 || snakebody[i].y > h) {
            return true;
        }
    }
    return false;
}

// fuctions that check if the snake head had hit its own body
function checkSelfCollision() {
    for (let i = 0; i < snakebody.length - 1; i++) {
        if (snakebody[i].x == snakebody[snakebody.length - 1].x && snakebody[i].y == snakebody[snakebody.length - 1].y) {
            return true;
        }
    }
    return false;
}



// function that summons a food rectangle
function summonFood() {
    let food = new Rectangle(randomw(),randomh());
    console.log(food)
    return food;
}

let food = summonFood();

function draw() {
  clear();
  background("#333333");
  noStroke();
  let r = color("red");
  fill(r)
  rect(food.x,food.y,size,size)
  let w = color("white");
  fill(w)

  if (snakebody[0].x == food.x && snakebody[0].y == food.y) {
        addRectangle()
        food = summonFood()
    }

  if (left_pressed) {
    snakebody[0].next = 0
  } else if (right_pressed){
    snakebody[0].next = 1
  } else if (up_pressed){
    snakebody[0].next = 2
  } else if (down_pressed) {
    snakebody[0].next = 3
  }
  //for loop that draws each rectangle in the snakebody array
  
  snakebody.forEach(function (item, index){
    if (item.next === 0) {
      item.x-=size
    } else if (item.next === 1) {
      item.x+=size
    }  else if (item.next === 2) {
      item.y-=size
    }  else if (item.next === 3) {
      item.y+=size
    } 
    //console.log(part.x,part.y,size)
    rect(item.x,item.y,size,size)
  });
  // draw food rectangle
    

    // if the snake hits the food rectangle, add a new rectangle to the snakebody array
    
  //for loop that sets the next value of each rectangle in the snakebody array to the value of the previous rectangle
    for (let i = snakebody.length-1; i > 0; i--) {
        snakebody[i].next = snakebody[i-1].next
        }

    if (checkCollision()) {
        //display game over
        textSize(50);
        fill("#999999")
        text("Game Over", 0, 400);
        noLoop();
    }
    if (checkSelfCollision()) {
        //display game over
        textSize(50);
        fill("#999999")
        text("Game Over", 0, 400);
        noLoop();
    }
  
}




function keyPressed() {
  if (keyCode === LEFT_ARROW && right_pressed === false) {
    left_pressed = true;
    right_pressed = false;
    up_pressed = false;
    down_pressed = false;
  } 
  
  if (keyCode === RIGHT_ARROW && left_pressed === false) {
    right_pressed = true;
    left_pressed = false;
    up_pressed = false;
    down_pressed = false;
  }
  
  if (keyCode === UP_ARROW && down_pressed === false) {
    up_pressed = true;
    right_pressed = false;
    left_pressed = false;
    down_pressed = false;
  }

  if (keyCode === DOWN_ARROW && up_pressed === false) {
    down_pressed = true;
    right_pressed = false;
    up_pressed = false;
    left_pressed = false;
  }
}



window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
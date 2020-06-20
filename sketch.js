
// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 10;
let direction = 'right';

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem;
let bg;
let bh;
let bg2;
let bg3;
let bg4;
let lol;
function setup() {

  scoreElem = createDiv('Score = 0 '+'_ As the Score increase , the death toll due to COVID-19 increases ...');
  scoreElem.position(400,10);
  scoreElem.id = 'Score';
  scoreElem.style('color', 'white');
  bg = loadImage('LI.jpg');
  bg2 = loadImage('L2.jpg');
  bg3 = loadSound('lol.mp4');
  bg4 = loadImage('virus.png');


  createCanvas(1345, 695);
  frameRate(15);
  stroke(0,255,255);
  strokeWeight(10);
  

  updateFruitCoordinates();

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(bg); 
 
  
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  updateSnakeCoordinates();
  checkGameStatus();
  checkForFruit();
}


/*
 The segments are updated based on the direction of the snake.
 All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
 gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
 and this results in the movement of the snake.

 The last segment is added based on the direction in which the snake is going,
 if it's going left or right, the last segment's x coordinate is increased by a
 predefined value 'diff' than its second to last segment. And if it's going up
 or down, the segment's y coordinate is affected.
*/
function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

/*
 I always check the snake's head position xCor[xCor.length - 1] and
 yCor[yCor.length - 1] to see if it touches the game's boundaries
 or if the snake hits itself.
*/
function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop();
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('The COVID-19 pandemic, also known as the coronavirus pandemic, is an ongoing pandemic of coronavirus disease 2019 (COVID‑19), caused by severe acute respiratory syndrome coronavirus 2 (SARS‑CoV‑2). The outbreak was first identified in Wuhan, China, in December 2019 . The World Health Organization declared the outbreak a Public Health Emergency of International Concern on 30 January 2020, and a pandemic on 11 March . As of 20 June 2020, more than 8.68 million cases of COVID-19 have been reported in more than 188 countries and territories, resulting in more than 460,000 deaths; more than 4.27 million people have recovered . We are only at the beginning of this line , but it is challenging us in ways that are unprecedented us in modern times , not least of which because it is spreading everywhere at once . In life-and-death matters such as the COVID-19 pandemic, a focus on financial matters can seem misplaced. But for the world’s poor, the financial impacts of COVID-19 can be devastating and far more immediate . India currently has the largest number of confirmed cases in Asia, and has the fourth highest number of confirmed cases in the world with the number of total confirmed cases breaching the 100,000 mark on 19 May and 200,000 on 3 June. India,s case fatality rate is relatively lower at 2.80%, against the global 6.13%, as of 3 June.[11] Six cities account for around half of all reported cases in the country like Mumbai, Delhi, Ahmedabad, Chennai, Pune and Kolkata . As of 24 May 2020, Lakshadweep is the only region which has not reported a case. On 10 June, India,s recoveries exceeded active cases for the first time reducing 49% of total infections . We have seen it before with the microcredit sector during a financial crisis or after a natural disaster: As default rates increase and microfinance institutions appear to teeter on insolvency, the donor reaction is sometimes to compensate through subsidies. Subsidies may very well be the answer, but they should not distort incentives nor create longer term adverse effects. As CGAP pointed out nearly a decade ago, an interest rate subsidy to clients could potentially confuse borrowers and reduce credit discipline. This occurred in Sri Lanka after the 2004 tsunami when the government announced subsidies without any clarity on their duration and scope. Injections of cash into a community can also backfire if they are not carefully structured. When relief organizations in Sri Lanka began cash-for-work programs, they set wage rates above comparable rates in agriculture and other sectors; laborers understandably switched out of their agriculture jobs for the temporary, higher paying positions. Large farms responded by mechanizing their operations, which destroyed agricultural employment opportunities over the long term . So be Safe and secure ... COVID-19 ( Earth ) ');
    scoreElem.position(20,20);
    background(0);
    textSize(60);
    text('Stay Safe',430,430);
    textSize(60);
    text('COVID-19',500,500);
    stroke(0,0,0);
    bg3.play();
  }
}

/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}

/*
 Whenever the snake consumes a fruit, I increment the number of segments,
 and just insert the tail segment again at the start of the array (basically
 I add the last segment again at the tail, thereby extending the tail)
*/
function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  /*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */

  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case 37:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 39:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 38:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 40:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}

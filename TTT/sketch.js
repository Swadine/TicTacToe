let board = [
  ['','',''],
  ['','',''],
  ['','','']
];
let w;
let h;
let ai = 'X';
let human = 'O';
let CurrPlayer = human;


function setup() {
  createCanvas(400, 400);
  frameRate(1);
  w = width / 3 ;
  h = height / 3;
  bestMove();
}

function equals3(a,b,c){
  return (a==b && b==c && c==a && a!='');
}

function checkWinner() {
  let Winner = null;
  for(let i = 0; i<3; i++){
    if (equals3(board[i][0],board[i][1],board[i][2])){
      Winner = board[i][0];
    }
  }
  for(let j = 0; j<3; j++){
    if (equals3(board[0][j], board[1][j],board[2][j])){
      Winner = board[0][j];
    }
  }
  if(equals3(board[0][0],board[1][1],board[2][2] )){
    Winner = board[0][0];
  }
  if(equals3(board[0][2],board[1][1],board[2][0])){
    Winner = board[1][1];
  }
  
  let count = 0;
  for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
      if(board[i][j] == ''){
        count++;
      }
    }
  }
  if(Winner == null && count == 0){
    return 'tie';
  }
  else{
    return Winner;
  }
}
  
function mousePressed() {
  if( CurrPlayer ==  human){
    let x = floor(mouseX / w);
    let y = floor(mouseY / h);
    if(board[x][y] == ''){
      board[x][y] = human;
      CurrPlayer = ai;
      bestMove();
    }
  }
}

function draw() {
  background(500);
  strokeWeight(4);
  line(w,0,w,height);
  line(2*w,0,2*w,height);
  line(0,h,width,h);
  line(0,h*2,width,h*2);
  
  
  for(let j=0; j<3 ; j++){
    for(let i=0; i<3; i++){
      let x = w * i + w/2;
      let y = h * j + h/2;
      let block = board[i][j];
      textSize(32);
      if(block == human){
        noFill();
        ellipse(x,y,w/2,w/2);
      }
      else if(block == ai){
        let xw = w/4;
        let yh = h/4;
        line(x-xw,y-yh,x+xw,y+yh);
        line(x+xw,y-yh,x-xw,y+yh);
      }
    }
  }
  let check = checkWinner();
  if(check != null){
    noLoop();
    let CHECKP = createP('');
    CHECKP.style('font-size', '32pt');
    if (check == 'tie') {
      CHECKP.html('Tie!');
    } else {
      CHECKP.html(`${check} Wins`);
    }
  }
}
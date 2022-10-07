function bestMove() {
    let max = -Infinity;
    let move;
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(board[i][j] == ''){
          board[i][j] = ai;
          let score = minimax(board, Infinity, -Infinity, false);
          board[i][j] = '';
          if( score > max){
            max = score;
            move = {i, j};
          }
        }
      }
    }
    board[move.i][move.j] = ai;
    CurrPlayer = human;
  }

  let scores = {'tie': 0, 'O': 1, 'X' : -1};
  
  function minimax(board, alpha, beta, IsMax){
    let result = checkWinner(board);
    if(result != null){
      return scores[result];
    }
    if(IsMax){
      // Present Player is maximising - human
      let maxeval = -Infinity;
      BigLoop : for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(board[i][j] == ''){
            board[i][j] = ai;
            let eval = minimax(board, alpha, beta, false);
            board[i][j] = '';
            maxeval = max(maxeval, eval);
            alpha = max(eval, alpha);
            if(beta <= alpha){
              break BigLoop;
            }
          } 
        }
      }
      return maxeval;
    }
    else{
      // Present Player is minimising - ai
      let mineval = Infinity;
      BigLoop : for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(board[i][j] == ''){
            board[i][j] = human;
            let eval = minimax(board, alpha, beta, true);
            board[i][j] = '';
            mineval = min(mineval, eval);
            beta = min(beta, eval);
            if(alpha >= beta){
              break BigLoop;
            }
          } 
        }
      }
      return mineval;
    }
} 
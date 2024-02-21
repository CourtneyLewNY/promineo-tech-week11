// script.js

// When document is ready
$(document).ready(function() {
    // Define players
    const playerX = 'X';
    const playerO = 'O';
    // Initialize current player
    let currentPlayer = playerX;
    // Initialize moves counter
    let moves = 0;
    // Initialize game board
    let board = ['', '', '', '', '', '', '', '', ''];
    // Define winning combinations
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
  
    // Create game board
    for (let i = 0; i < 9; i++) {
      $('#gameBoard').append(`<div class="col-4 cell" data-index="${i}"></div>`);
    }
  
    // Handle cell click
    $('.cell').on('click', function() {
      const index = $(this).data('index');
      // Check if cell is empty
      if (!board[index]) {
        // Update board with current player's symbol
        board[index] = currentPlayer;
        // Display symbol on the clicked cell
        $(this).text(currentPlayer);
        // Increment moves counter
        moves++;
        // Check for winner
        if (checkWinner()) {
          // Display winner
          $('#result').text(`${currentPlayer} wins!`).show();
          // Disable further clicks
          $('.cell').off('click');
        } else if (moves === 9) {
          // Check for draw
          $('#result').text('It\'s a draw!').show();
        } else {
          // Switch players
          currentPlayer = currentPlayer === playerX ? playerO : playerX;
          // Update turn text
          $('#turn').text(`Player ${currentPlayer}'s turn`);
        }
      }
    });
  
    // Handle restart button click
    $('#restartBtn').on('click', function() {
      // Reset the game
      resetGame();
    });
  
    // Check for a winner
    function checkWinner() {
      // Loop through winning combinations
      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        // Check if any winning combination matches
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return true;
        }
      }
      return false;
    }
  
    // Reset the game
    function resetGame() {
      // Reset current player
      currentPlayer = playerX;
      // Reset moves counter
      moves = 0;
      // Reset game board
      board = ['', '', '', '', '', '', '', '', ''];
      // Clear cell text
      $('.cell').text('');
      // Update turn text
      $('#turn').text(`Player ${currentPlayer}'s turn`);
      // Hide game result
      $('#result').hide();
      // Re-enable cell clicks
      $('.cell').on('click', function() {
        const index = $(this).data('index');
        if (!board[index]) {
          board[index] = currentPlayer;
          $(this).text(currentPlayer);
          moves++;
          if (checkWinner()) {
            $('#result').text(`${currentPlayer} wins!`).show();
            $('.cell').off('click');
          } else if (moves === 9) {
            $('#result').text('It\'s a draw!').show();
          } else {
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
            $('#turn').text(`Player ${currentPlayer}'s turn`);
          }
        }
      });
    }
  });
  

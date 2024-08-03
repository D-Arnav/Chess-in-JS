<h1>Chess-in-JS</h1>

<h2>Introduction</h2>

Chess is a two player strategy game played on a 64 x 64 square chessboard, with the goal of capturing the opponent's king. Although this may seem simple, the underlying rules and strategies make chess a very complex game.

<h2>Moves</h2>

<h4>Pawn</h4>
<ul>
  <li> 1 or 2 squares forward on the first move </li>
  <li> 1 square forward on every other move </li>
  <li> Captures diagonally forwards </li>
</ul>
<h4>Rook</h4>
<ul>
  <li> Moves horizontally or vertical </li>
</ul>
<h4>Bishop</h4>
<ul>
  <li> Moves along the two diagonals </li>
</ul>
<h4>Knight</h4>
<ul>
  <li> Moves in a L shape 2 squares in 1 direction and 1 square in a perpendicular direction </li>
</ul>
<h4>Queen</h4>
<ul>
  <li> Moves horizontally, vertically or diagonally </li>
</ul>
<h4>King</h4>
<ul>
  <li> Moves one square either horizontally, vertically or diagonally </li>
</ul>
  
<h2>Plan</h2>

<h4>Key Point 1</h4>
Give an cell id based on the location of each cell. We can then mathematically determine the legality of a move based on the from-cell, to-cell and piece-type.
<h4>Key Point 2</h4>
Add special moves such as <i>enpassant</i>, castle, long castle, pawn promotion
<h4>Key Point 3</h4>
For every move, check for legality, see if the move checks the king, or if the game is won.

<h2>Developer Notes: Some Problems and Solutions</h2>

<h4>Problem</h4>
Castle cannot be done when a king moves once, this means that for the same board state, a move may or may not be possible. A similar but more challenging problem is also present for enpassant.
<h4>Solution</h4>
Add variables to store board data - kingMoved and enpassant. kingMoved will decide if castle() and longCastle() is possible and enpassant will decide if enpassant() is possible.
<hr>
<h4>Problem</h4>
Rook, Queen, Pawn, and Bishop moves require there to be no pieces in the way
<h4>Solution</h4>
Iterate through all the cells between fromCell and toCell and if a piece exists, the move is not possible.
<hr>
<h4>Problem</h4>
Pins and Discovered checks pose a huge problem in detecting checks.
<h4>Solution</h4>
create an isCheck() function to detect if the board is in a checked state, and also create a causesCheck() function to see if the particular move causes the board state to be in check. causesCheck() would move the piece, store the state, move back the piece, then return the state.

<h2>Setup Instructions</h2>
<ol>
  <li>Create any directory on your computer</li>
  <li>Download the 3 program files: index.html, Chess.css, Chess.js and place them in the directory</li>
  <li>Download all the png images in Chess Pieces, and create a directory called Chess Pieces within the previously created one and store all the images there</li>
  <li>Find the index.html file on your computer and right click and open it with a browser such as Chrome</li>
</ol>

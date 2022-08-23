// color -> B, W
// type -> P, R, N, B, Q, K
// cell -> a3, b4, e7, etc.

let B = "B",
  W = "W",
  P = "P",
  R = "R",
  N = "N",
  Q = "Q",
  K = "K";
let code = { 1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h" };
let anticode = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
let pieceName = {
  B: "Bishop",
  N: "Knight",
  R: "Rook",
  Q: "Queen",
  K: "King",
  P: "Pawn",
};
let colorName = { B: "Black", W: "White" };
let game = {
  Moves: [],
  White: {
    moveCounter: 0,
    castle: true,
    longcastle: true,
    enpassant: undefined,
  },
  Black: {
    moveCounter: 0,
    castle: true,
    longcastle: true,
    enpassant: undefined,
  },
};

function createPiece(color, type, cell) {
  let id;
  for (let i = 1; i <= 8; i++) {
    if (!document.getElementById(color + type + i)) {
      id = color + type + i;
    }
  } // Creating a unique id for each piece (e.g. WP1, BK2, etc.)

  let place = document.getElementById(cell);
  let piece = document.createElement("div");

  piece.style.backgroundImage =
    'url("Chess Pieces/' + colorName[color] + " " + pieceName[type] + '.png")';
  piece.style.width = 64 + "px";
  piece.style.height = 64 + "px";
  piece.style.margin = 1 + "px";
  piece.style.marginTop = 8 + "px";
  piece.style.marginLeft = 10 + "px";
  piece.style.position = "absolute";
  piece.className = "piece";
  piece.id = id;

  place.appendChild(piece);
}

function createBoard() {
  for (let i = 1; i <= 8; i++) {
    createPiece(W, P, code[i] + 2); // White Pawns
    createPiece(B, P, code[i] + 7); // Black Pawns
  }
  createPiece(W, R, "a1");
  createPiece(B, R, "a8");
  createPiece(W, R, "h1");
  createPiece(B, R, "h8");
  createPiece(W, N, "b1");
  createPiece(B, N, "b8");
  createPiece(W, N, "g1");
  createPiece(B, N, "g8");
  createPiece(W, B, "c1");
  createPiece(B, B, "c8");
  createPiece(W, B, "f1");
  createPiece(B, B, "f8");
  createPiece(W, Q, "d1");
  createPiece(B, Q, "d8");
  createPiece(W, K, "e1");
  createPiece(B, K, "e8");
}

function resetEnpassant() {
  if (game.White.enpassant != undefined) {
    if (game.White.moveCounter == 1) {
      game.White.moveCounter = 0;
      game.White.enpassant = undefined;
    } else {
      game.White.moveCounter++;
    }
  }

  if (game.Black.enpassant != undefined) {
    if (game.Black.moveCounter == 1) {
      game.Black.moveCounter = 0;
      game.Black.enpassant = undefined;
      lastEpPawn = game.Black.enpassant;
    } else {
      game.Black.moveCounter++;
    }
  }
}

function setEnpassant(from, to, color) {
  if (color == "W") {
    if (from.id[1] == "2" && to.id == from.id[0] + "4") {
      game.White.enpassant = to.id;
    }
  } else {
    if (from.id[1] == "7" && to.id == from.id[0] + "5") {
      game.Black.enpassant = to.id;
    }
  }
}

function doEnpassant(from, to, color) {
  if (color == "W") {
    if (
      to.id[1] == parseInt(from.id[1]) + 1 &&
      document.getElementById(to.id[0] + from.id[1]).hasChildNodes() &&
      document.getElementById(to.id[0] + from.id[1]).firstChild.id[0] !=
        color &&
      Math.abs(anticode[to.id[0]] - anticode[from.id[0]]) == 1 &&
      game.Black.enpassant == to.id[0] + from.id[1]
    ) {
      document.getElementById(to.id[0] + from.id[1]).innerHTML = "";
    }
  } else {
    if (
      to.id[1] == parseInt(from.id[1]) - 1 &&
      document.getElementById(to.id[0] + from.id[1]).hasChildNodes() &&
      document.getElementById(to.id[0] + from.id[1]).firstChild.id[0] !=
        color &&
      Math.abs(anticode[to.id[0]] - anticode[from.id[0]]) == 1 &&
      game.White.enpassant == to.id[0] + from.id[1]
    ) {
      document.getElementById(to.id[0] + from.id[1]).innerHTML = "";
    }
  }
}

function promotePawn(toCell) {
  let color = document.getElementById(toCell).firstChild.id[0];
  let place = document.getElementById(toCell);
  place.innerHTML = "";

  game.Moves[game.Moves.length - 1] += "(" + promPiece + ")";
  createPiece(color, promPiece, toCell);
}

function promoteMenu(to) {
  let color = to.firstChild.id[0];
  let menu = document.createElement("div");
  menu.className = "promoteSelectWhiteWrapper";
  menu.id = "promoteSelectWhiteWrapper";

  let boxq = document.createElement("div");
  let boxr = document.createElement("div");
  let boxb = document.createElement("div");
  let boxn = document.createElement("div");

  boxq.className = "box";
  boxr.className = "box";
  boxb.className = "box";
  boxn.className = "box";

  boxq.id = color + "q";
  boxr.id = color + "r";
  boxb.id = color + "b";
  boxn.id = color + "n";

  let q = document.createElement("img");
  let r = document.createElement("img");
  let b = document.createElement("img");
  let n = document.createElement("img");

  q.src =
    "Chess Pieces/" + (color == "W" ? "White" : "Black") + " Queen Small.png";
  r.src =
    "Chess Pieces/" + (color == "W" ? "White" : "Black") + " Rook Small.png";
  b.src =
    "Chess Pieces/" + (color == "W" ? "White" : "Black") + " Bishop Small.png";
  n.src =
    "Chess Pieces/" + (color == "W" ? "White" : "Black") + " Knight Small.png";

  q.style.marginLeft = "8px";
  r.style.marginLeft = "8px";
  b.style.marginLeft = "8px";
  n.style.marginLeft = "8px";

  q.style.marginTop = "6px";
  r.style.marginTop = "6px";
  b.style.marginTop = "6px";
  n.style.marginTop = "6px";

  q.className = "minipiece";
  r.className = "minipiece";
  b.className = "minipiece";
  n.className = "minipiece";

  q.id = color + "qi";
  r.id = color + "ri";
  b.id = color + "bi";
  n.id = color + "ni";

  boxq.appendChild(q);
  boxr.appendChild(r);
  boxb.appendChild(b);
  boxn.appendChild(n);

  menu.appendChild(boxq);
  menu.appendChild(boxr);
  menu.appendChild(boxb);
  menu.appendChild(boxn);

  let offset = to.getBoundingClientRect();

  menu.style.marginLeft = parseInt(offset.x) + 50 + "px";
  menu.style.marginTop = offset.y - 20 + "px";

  document.getElementById("chessboard").appendChild(menu);
}

function movePiece(fromCell, toCell) {
  let from = document.getElementById(fromCell);
  let to = document.getElementById(toCell);
  let check = false;
  let color = from.hasChildNodes() ? from.lastChild.id[0] : null;
  let moveName;
  let oppColor = color == "W" ? "B" : "W";

  if (to.className == "piece" || to.className == "legalMove")
    to = to.parentNode;

  if (from.firstChild == null || to == null) {
    console.log("Invalid cell");
    return;
  }
  if (isCastle(from, to, color)) {
    castle(fromCell, toCell, color);
  }

  if (!isLegalMove(fromCell, toCell)) {
    console.log("Illegal move");
    return;
  }

  if (to.hasChildNodes() && to.firstChild.id[1] == "K") return;

  setEnpassant(from, to, from.lastChild.id[0]);
  doEnpassant(from, to, from.lastChild.id[0]);

  if (causesCheck(fromCell, toCell, oppColor)) {
    check = true;
  }

  if (causesCheck(fromCell, toCell, color)) {
    return;
  }

  if (from.firstChild.className == "piece" && to.firstChild == null) {
    // Check if you are moving a piece to empty square.
    moveName =
      from.firstChild.id[1] == "P"
        ? to.id
        : from.firstChild.id[1] + to.id + (check ? "+" : "");
    console.log(moveName);
    game.Moves.push(moveName);
    to.appendChild(from.firstChild);
  } else if (
    from.firstChild.className == "piece" &&
    to.firstChild.className == "piece" &&
    to.firstChild.id[0] != from.firstChild.id[0]
  ) {
    // Check if you are moving a piece to another piece of different color.
    moveName =
      (from.firstChild.id[1] == "P"
        ? from.id[0] + "x" + to.id
        : from.firstChild.id[1] + "x" + to.id) + (check ? "+" : "");
    console.log(moveName);
    game.Moves.push(moveName);
    to.innerHTML = ""; // Remove the other piece from the square.
    to.appendChild(from.firstChild);
  } else {
    // If you are not moving a piece to empty square or another piece of different color, it is and invalid move.
    console.log("Invalid move");
    return;
  }

  if (
    (to.id[1] == 8 &&
      to.firstChild.id[1] == "P" &&
      to.firstChild.id[0] == "W") ||
    (to.id[1] == 1 && to.firstChild.id[1] == "P" && to.firstChild.id[0] == "B")
  ) {
    promoteMenu(to);
    promId = to.id[0] + to.id[1];
  }
  resetEnpassant();
}

function forceMove(fromCell, toCell) {
  from = document.getElementById(fromCell);
  to = document.getElementById(toCell);

  if (to.hasChildNodes()) {
    to.innerHTML = "";
  }

  to.appendChild(from.firstChild);

  from.innerHTML = "";
}

function isLegalPawnMove(from, to, color) {
  if (color == "W") {
    if (
      from.id[1] == "2" &&
      to.id == from.id[0] + "4" &&
      !document.getElementById(from.id[0] + "4").hasChildNodes() &&
      (!document.getElementById(from.id[0] + "3").hasChildNodes() ||
        document.getElementById(from.id[0] + "3").firstChild.className !=
          "piece")
    ) {
      //console.log('Pawn can move two squares on first move.');
      return true;
    }
    if (
      !to.hasChildNodes() &&
      from.id[0] == to.id[0] &&
      to.id[1] == parseInt(from.id[1]) + 1
    ) {
      return true;
    }
    if (
      to.id[1] == parseInt(from.id[1]) + 1 &&
      to.hasChildNodes() &&
      to.firstChild.id[0] != color &&
      Math.abs(anticode[to.id[0]] - anticode[from.id[0]]) == 1
    ) {
      //console.log('Pawn can capture diagonally.');
      return true;
    }
    if (
      to.id[1] == parseInt(from.id[1]) + 1 &&
      document.getElementById(to.id[0] + from.id[1]).hasChildNodes() &&
      document.getElementById(to.id[0] + from.id[1]).firstChild.id[0] !=
        color &&
      Math.abs(anticode[to.id[0]] - anticode[from.id[0]]) == 1 &&
      game.Black.enpassant == to.id[0] + from.id[1]
    ) {
      // en passant :/
      //console.log('En Passant');
      return true;
    }
    return false;
  } else {
    if (
      from.id[1] == "7" &&
      to.id == from.id[0] + "5" &&
      !document.getElementById(from.id[0] + "6").hasChildNodes() &&
      !document.getElementById(from.id[0] + "5").hasChildNodes()
    ) {
      //console.log('Pawn can move two squares on first move.');
      return true;
    }
    if (
      !to.hasChildNodes() &&
      from.id[0] == to.id[0] &&
      to.id[1] == parseInt(from.id[1]) - 1
    ) {
      return true;
    }
    if (
      to.id[1] == parseInt(from.id[1]) - 1 &&
      to.hasChildNodes() &&
      to.firstChild.id[0] != color &&
      Math.abs(parseInt(anticode[to.id[0]]) - parseInt(anticode[from.id[0]])) ==
        1
    ) {
      //console.log('Pawn can capture diagonally.');
      return true;
    }
    if (
      to.id[1] == parseInt(from.id[1]) - 1 &&
      document.getElementById(to.id[0] + from.id[1]).hasChildNodes() &&
      document.getElementById(to.id[0] + from.id[1]).firstChild.id[0] !=
        color &&
      Math.abs(anticode[to.id[0]] - anticode[from.id[0]]) == 1 &&
      game.White.enpassant == to.id[0] + from.id[1]
    ) {
      // en passant :/
      //console.log('En Passant');
      return true;
    }
    return false;
  }
}

function isLegalRookMove(from, to) {
  if (from.id[0] == to.id[0]) {
    if (parseInt(from.id[1]) < parseInt(to.id[1])) {
      for (let i = parseInt(from.id[1]) + 1; i < parseInt(to.id[1]); i++) {
        let node = document.getElementById(from.id[0] + i);
        if (node.hasChildNodes() && node.firstChild.className == "piece") {
          return false;
        }
      }
    } else {
      for (let i = parseInt(to.id[1]) + 1; i < parseInt(from.id[1]); i++) {
        let node = document.getElementById(from.id[0] + i);
        if (node.hasChildNodes() && node.firstChild.className == "piece") {
          return false;
        }
      }
    }
    return true;
  } else if (from.id[1] == to.id[1]) {
    if (anticode[from.id[0]] < anticode[to.id[0]]) {
      for (let i = anticode[from.id[0]] + 1; i < anticode[to.id[0]]; i++) {
        let node = document.getElementById(code[i] + from.id[1]);
        if (node.hasChildNodes() && node.firstChild.className == "piece") {
          return false;
        }
      }
    } else {
      for (let i = anticode[to.id[0]] + 1; i < anticode[from.id[0]]; i++) {
        let node = document.getElementById(code[i] + from.id[1]);
        if (node.hasChildNodes() && node.firstChild.className == "piece") {
          return false;
        }
      }
    }
    return true;
  } else {
    return false;
  }
}

function isLegalKnightMove(from, to) {
  if (
    parseInt(from.id[1]) - parseInt(to.id[1]) == 2 ||
    parseInt(from.id[1]) - parseInt(to.id[1]) == -2
  ) {
    if (
      anticode[from.id[0]] - anticode[to.id[0]] == 1 ||
      anticode[from.id[0]] - anticode[to.id[0]] == -1
    ) {
      return true;
    }
  } else if (
    parseInt(from.id[1]) - parseInt(to.id[1]) == 1 ||
    parseInt(from.id[1]) - parseInt(to.id[1]) == -1
  ) {
    if (
      anticode[from.id[0]] - anticode[to.id[0]] == 2 ||
      anticode[from.id[0]] - anticode[to.id[0]] == -2
    ) {
      return true;
    }
  }
  return false;
}

function isLegalBishopMove(from, to) {
  if (
    anticode[from.id[0]] - anticode[to.id[0]] ==
    parseInt(from.id[1]) - parseInt(to.id[1])
  ) {
    if (
      anticode[to.id[0]] > anticode[from.id[0]] &&
      parseInt(to.id[1]) > parseInt(from.id[1])
    ) {
      for (let i = 1; i < parseInt(to.id[1]) - parseInt(from.id[1]); i++) {
        let node = document.getElementById(
          code[anticode[from.id[0]] + i] + (parseInt(from.id[1]) + i)
        );
        if (node.hasChildNodes() && node.firstChild.className == "piece") {
          return false;
        }
      }
    } else if (
      anticode[to.id[0]] < anticode[from.id[0]] &&
      parseInt(to.id[1]) < parseInt(from.id[1])
    ) {
      for (let i = 1; i < parseInt(from.id[1]) - parseInt(to.id[1]); i++) {
        let node = document.getElementById(
          code[anticode[from.id[0]] - i] + (parseInt(from.id[1]) - i)
        );
        if (node.hasChildNodes() && node.firstChild.className == "piece") {
          return false;
        }
      }
    }
    return true;
  } else if (
    anticode[from.id[0]] - anticode[to.id[0]] ==
    parseInt(to.id[1]) - parseInt(from.id[1])
  ) {
    if (
      anticode[to.id[0]] < anticode[from.id[0]] &&
      parseInt(to.id[1]) > parseInt(from.id[1])
    ) {
      for (let i = 1; i < parseInt(to.id[1]) - parseInt(from.id[1]); i++) {
        let node = document.getElementById(
          code[anticode[from.id[0]] - i] + (parseInt(from.id[1]) + i)
        );
        if (node.hasChildNodes() && node.firstChild.className == "piece") {
          return false;
        }
      }
    } else {
      for (let i = 1; i < parseInt(from.id[1]) - parseInt(to.id[1]); i++) {
        let node = document.getElementById(
          code[anticode[from.id[0]] + i] + (parseInt(from.id[1]) - i)
        );
        if (node.hasChildNodes() && node.firstChild.className == "piece") {
          return false;
        }
      }
    }
    return true;
  } else {
    return false;
  }
}

function isLegalKingMove(from, to, color) {
  if (
    Math.abs(parseInt(to.id[1]) - parseInt(from.id[1])) <= 1 &&
    Math.abs(anticode[to.id[0]] - anticode[from.id[0]]) <= 1
  ) {
    return true;
  } else {
    return false;
  }
}

function causesCheck(fromCell, toCell, color) {
  let pieces = document.getElementsByClassName("piece");
  let oppColorPieces = [];
  let colorKingCell = document.getElementById(color + "K8").parentNode;
  let toCellPiece = null;
  let from = document.getElementById(fromCell);
  let to = document.getElementById(toCell);
  let oppColor = color == "W" ? "B" : "W";
  if (from.hasChildNodes() && from.firstChild.id[1] == "K") {
    colorKingCell = to;
  }

  if (to.hasChildNodes()) {
    toCellPiece = to.firstChild.id;
  }

  forceMove(fromCell, toCell);

  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].id[0] == oppColor) {
      oppColorPieces.push(pieces[i].id);
    }
  }

  for (let i = 0; i < oppColorPieces.length; i++) {
    if (document.getElementById(oppColorPieces[i]) == null) {
    }
    if (
      isLegalMove(
        document.getElementById(oppColorPieces[i]).parentNode.id,
        colorKingCell.id
      )
    ) {
      forceMove(toCell, fromCell);
      if (toCellPiece != null) {
        createPiece(toCellPiece[0], toCellPiece[1], to.id);
      }
      return true;
    }
  }

  forceMove(toCell, fromCell);
  if (toCellPiece != null) {
    createPiece(toCellPiece[0], toCellPiece[1], to.id);
  }
  return false;
}

function isCastle(from, to) {
  if (!from.hasChildNodes() || !from.lastChild.id[1] == "K") {
    return false;
  }

  if (from.id == "e1") {
    if (
      to.id == "g1" &&
      !document.getElementById("f1").hasChildNodes() &&
      !document.getElementById("g1").hasChildNodes() &&
      game.White.castle
    ) {
      if (!causesCheck("e1", "f1", "W") && !causesCheck("e1", "g1", "W")) {
        return true;
      }
    } else if (
      to.id == "c1" &&
      !document.getElementById("d1").hasChildNodes() &&
      !document.getElementById("c1").hasChildNodes() &&
      !document.getElementById("b1").hasChildNodes() &&
      game.White.longcastle
    ) {
      if (!causesCheck("e1", "d1", "W") && !causesCheck("e1", "c1", "W")) {
        return true;
      }
    }
  } else if (from.id == "e8") {
    if (
      to.id == "g8" &&
      !document.getElementById("f8").hasChildNodes() &&
      !document.getElementById("g8").hasChildNodes() &&
      game.Black.castle
    ) {
      if (!causesCheck("e8", "f8", "B") && !causesCheck("e8", "g8", "B")) {
        return true;
      }
    } else if (
      to.id == "c8" &&
      !document.getElementById("d8").hasChildNodes() &&
      !document.getElementById("c8").hasChildNodes() &&
      !document.getElementById("b8").hasChildNodes() &&
      game.Black.longcastle
    ) {
      if (!causesCheck("e8", "d8", "B") && !causesCheck("e8", "c8", "B")) {
        return true;
      }
    }
  }

  return false;
}

function castle(fromCell, toCell, color) {
  let from = document.getElementById(fromCell);
  let to = document.getElementById(toCell);

  from.innerHTML = "";

  if (toCell == "g1") {
    document.getElementById("h1").innerHTML = "";
    createPiece(color, "K", "g1");
    createPiece(color, "R", "f1");
    console.log("O-O");
    game.Moves.push("O-O");
  } else if (toCell == "c1") {
    document.getElementById("a1").innerHTML = "";
    createPiece(color, "K", "c1");
    createPiece(color, "R", "d1");
    console.log("O-O-O");
    game.Moves.push("O-O-O");
  } else if (toCell == "g8") {
    document.getElementById("h8").innerHTML = "";
    createPiece(color, "K", "g8");
    createPiece(color, "R", "f8");
    console.log("O-O");
    game.Moves.push("O-O");
  } else if (toCell == "c8") {
    document.getElementById("a8").innerHTML = "";
    createPiece(color, "K", "c8");
    createPiece(color, "R", "d8");
    console.log("O-O-O");
    game.Moves.push("O-O-O");
  }
}

function isLegalMove(fromCell, toCell) {
  let from = document.getElementById(fromCell);
  let to = document.getElementById(toCell);
  let color = from.lastChild.id[0];
  let type = from.lastChild.id[1];

  if (from.lastChild == null || to == null) {
    console.log("Invalid cell");
    return false;
  }
  if (from == to) return false;

  if (type == "P") {
    return isLegalPawnMove(from, to, color);
  } else if (type == "R") {
    return isLegalRookMove(from, to);
  } else if (type == "N") {
    return isLegalKnightMove(from, to);
  } else if (type == "B") {
    return isLegalBishopMove(from, to);
  } else if (type == "Q") {
    return isLegalRookMove(from, to) || isLegalBishopMove(from, to);
  } else if (type == "K") {
    return isLegalKingMove(from, to, color);
  } else {
    console.log("Unknown piece type");
    return false;
  }
}

let cell;
let unselectids = [];
let clicktwice = 0;
let prevclr = null;
let promPiece = null;
let promId = null;
let prevTo = null;

onmousedown = function (e) {
  if (e.target.className == "piece") {
    let color = e.target.id[0];
    for (let i = 0; i < unselectids.length; i++) {
      unselectids[i].removeChild(unselectids[i].lastChild);
    }
    unselectids = [];
    cell = e.target.parentNode;
    let l = 0;
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        let from = document.getElementById(cell.id),
          to = document.getElementById(code[i] + j);
        if (
          isLegalMove(cell.id, code[i] + j) &&
          ((from.firstChild.className == "piece" && to.firstChild == null) ||
            (from.firstChild.className == "piece" &&
              to.firstChild.className == "piece" &&
              to.firstChild.id[0] != from.firstChild.id[0])) &&
          !causesCheck(cell.id, code[i] + j, color) &&
          (!document.getElementById(code[i] + j).hasChildNodes() ||
            document.getElementById(code[i] + j).firstChild.id[1] != "K")
        ) {
          let select = document.createElement("div");
          select.className = "legalMove";
          document.getElementById(code[i] + j).appendChild(select);
          unselectids.push(document.getElementById(code[i] + j));
        }
      }
    }
  } else if (e.target.className == "minipiece" || e.target.className == "box") {
    let tgt = e.target;
    if (tgt.className == "minipiece") {
      tgt = tgt.parentNode;
    }
    promPiece = tgt.id[1].toUpperCase();
  }
};

onmouseup = function (e) {
  let tgt = e.target;
  if (tgt.className == "legalMove" || tgt.className == "piece") {
    tgt = tgt.parentNode;
  }

  if (tgt == cell) {
  } else {
    for (let i = 0; i < unselectids.length; i++) {
      unselectids[i].removeChild(unselectids[i].lastChild);
    }
    unselectids = [];
  }

  if (
    cell != null &&
    tgt != null &&
    e.target.parentNode != cell &&
    e.target.className != "box" &&
    e.target.className != "minipiece"
  ) {
    movePiece(cell.id, tgt.id);
    prevTo = tgt.id;
  } else if (e.target.className == "box" || e.target.className == "minipiece") {
    let tgt = e.target;
    if (tgt.className == "minipiece") {
      tgt = tgt.parentNode;
    }
    document
      .getElementById("chessboard")
      .removeChild(document.getElementById("promoteSelectWhiteWrapper"));
    promotePawn(prevTo);
  }
};

createBoard();

const domUtils = {
  addClass(el, className) {
    el?.classList?.add(className);
  },
  removeClass(el, className) {
    el?.classList?.remove(className);
  },
  hasClass(el, className) {
    return el?.classList?.contains(className);
  },
};

(function () {
  // dom references
  const doc = document;
  const board = doc.getElementsByClassName("board")[0];
  const allCells = doc.getElementsByClassName("cell");
  const gameStatusContainer =
    doc.getElementsByClassName("currentGameStatus")[0];

  const winingCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const palyerXClass = "cellX";
  const playerOClass = "cellO";

  let activePlayerClass = palyerXClass;

  const flipPlayer = () => {
    activePlayerClass =
      activePlayerClass === palyerXClass ? playerOClass : palyerXClass;
  };

  const markCell = (cellEl, className) => domUtils.addClass(cellEl, className);

  const resetBoardClickHandler = () => {
    [...allCells].forEach(cell => {
      domUtils.removeClass(cell, palyerXClass);
      domUtils.removeClass(cell, playerOClass);
    });
    activePlayerClass = palyerXClass;
    setGameStatusMessage("");
  };

  const checkWin = currentClass => {
    return winingCombinations.some(combination => {
      return combination.every(index => {
        return allCells[index].classList.contains(currentClass);
      });
    });
  };

  const isDraw = () => {};

  const updateGameStatus = activePlayerClass => {
    const nextPlayer =
      activePlayerClass === palyerXClass
        ? "Player O's turn"
        : "Player X's turn";

    setGameStatusMessage(nextPlayer);
  };

  const setGameStatusMessage = message => {
    gameStatusContainer.innerText = message;
  };

  const cellClickHandler = evt => {
    const cellEl = evt.target;

    if (
      domUtils.hasClass(cellEl, palyerXClass) ||
      domUtils.hasClass(cellEl, playerOClass)
    ) {
      return;
    }
    markCell(cellEl, activePlayerClass);

    if (checkWin(activePlayerClass)) {
      setGameStatusMessage(
        activePlayerClass === palyerXClass
          ? "Winner is  Player X."
          : "Winner is Player O."
      );
    } else {
      updateGameStatus(activePlayerClass);
    }

    flipPlayer();
  };

  board.addEventListener("click", cellClickHandler);
  resetButton.addEventListener("click", resetBoardClickHandler);
})();

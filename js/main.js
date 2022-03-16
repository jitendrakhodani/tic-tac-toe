const domeUtils = {
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
  const doc = document;
  const boardEl = doc.getElementById("board");
  const allCells = doc.getElementsByClassName("cell");
  const winingCombinations = [[]];
  const palyerXClass = "cellX";
  const playerOClass = "cellO";
  let activePlayerClass = palyerXClass;
  const flipPlayer = () => {
    if (activePlayerClass === palyerXClass) {
      activePlayerClass = playerOClass;
    } else {
      activePlayerClass = palyerXClass;
    }
  };
  const markCell = (cellEl, className) => domeUtils.addClass(cellEl, className);

  const resetBoard = () => {
    [...allCells].forEach(cell => {
      domeUtils.removeClass(cell, palyerXClass);
      domeUtils.removeClass(cell, playerOClass);
    });
  };

  const cellClickHandler = evt => {
    const cellEl = evt.target;

    if (
      domeUtils.hasClass(cellEl, palyerXClass) ||
      domeUtils.hasClass(cellEl, playerOClass)
    ) {
      return;
    }
    markCell(cellEl, activePlayerClass);
    flipPlayer();
  };

  boardEl.addEventListener("click", cellClickHandler);
  resetButton.addEventListener("click", resetBoard);
})();

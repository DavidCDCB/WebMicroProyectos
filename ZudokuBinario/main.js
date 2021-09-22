let getRandom = (min, max) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

let unSort = (array) => 
    array.sort(() => Math.random() - 0.5);

let newmMakeMatrix = () => {
  let matrix = [];
  let list = [1,1,1,0,0,0];
  
  for (let i = 0; i < 6; i++) {
    matrix.push([...unSort(list)]);
  }
  return matrix;
};

let checkCount = (m) => {
  let countCol = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (m[j][i] === 1) {
        countCol++;
      }
    }
    if (countCol !== 3) {
      return false;
    }
    countCol = 0;
  }
  return true;
};

let checkTri = () => {
  let strRow = "",
    strCol = "";
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      strRow += m[i][j];
      strCol += m[j][i];
    }
    if (strRow.includes("111") || strRow.includes("000")) {
      return false;
    }
    if (strCol.includes("111") || strCol.includes("000")) {
      return false;
    }
    strRow = "";
    strCol = "";
  }
  return true;
};

let checkRep = () => {
  let strRow = "",
    strCol = "";
  let listRow = [],
    listCol = [];
  let typeRow = {},
    typeCol = {};

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      strRow += m[i][j];
      strCol += m[j][i];
    }
    listRow.push(strRow);
    listCol.push(strCol);
    strRow = "";
    strCol = "";
  }

  for (let item of listCol) {
    if (typeCol[item] == null) {
      typeCol[item] = 0;
    } else {
      return false;
    }
  }

  for (let item of listRow) {
    if (typeRow[item] == null) {
      typeRow[item] = 0;
    } else {
      return false;
    }
  }
  return true;
};

let hideElements2 = (m, blockElements) => {
  let ci,
    cj,
    fail = 0;
  for (let i = 0; i < 26; i++) {
    ci = getRandom(0, 5);
    cj = getRandom(0, 5);

    if (m[ci][cj] !== -1) {
      m[ci][cj] = -1;
    } else {
      fail++;
    }
  }

  for (let i = 0; i < fail; i++) {
    do {
      ci = getRandom(0, 5);
      cj = getRandom(0, 5);
    } while (m[ci][cj] === -1);
    m[ci][cj] = -1;
  }

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (m[i][j] !== -1) {
        blockElements.push(i + "-" + j);
      }
    }
  }
  return m;
};

let init = () => {
  m = null;
  let fails = 0;
  mWin = [];
  blockElements = [];

  do {
    m = newmMakeMatrix();
    fails++;
  } while (!checkCount(m) || !checkTri(m) || !checkRep(m));

  for (let i = 0; i < 6; i++) {
    mWin.push([...[-1, -1, -1, -1]]);
  }

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      mWin[i][j] = m[i][j];
    }
  }

  m = hideElements2(m, blockElements);
  console.log(mWin);
  console.log(fails);
};

let m = null;
let mWin = [];
let blockElements = [];

var app = new Vue({
  el: "#app",
  mounted() {
    swal(
      "Reglas del puzzle:\n\n1- En cada fila y columna solo debe haber 3 unos y 3 ceros.\n2- En cada fila y columna, no puede haber más de 2 números consecutivos iguales.\n3- No puede haber filas o columnas repetidas."
    ).then((value) => {
      this.init();
    });
  },
  data: {
    matrix: null
  },
  methods: {
    coordenada(i, j) {
      if (!blockElements.includes(i + "-" + j)) {
        let auxM = [];
        if (this.matrix[i][j] === -1) {
          this.matrix[i][j] = 0;
        } else if (this.matrix[i][j] === 0) {
          this.matrix[i][j] = 1;
        } else {
          this.matrix[i][j] = 0;
        }

        for (let i = 0; i < 6; i++) {
          auxM.push([...[-1, -1, -1, -1, -1, -1]]);
        }

        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 6; j++) {
            auxM[i][j] = this.matrix[i][j];
          }
        }

        this.matrix = auxM;

        if (this.checkWin()) {
          swal("Puzzle resuelto!!!").then((value) => {
            this.init();
            this.matrix = m;
          });
        }
      }
    },
    getItem(i, j) {
      if (this.matrix[i][j] !== -1) {
        return this.matrix[i][j];
      } else {
        return " ";
      }
    },
    setBorder(num, i, j) {
      if (blockElements.includes(i + "-" + j)) {
        return "colorBlock";
      }
      if (num == 0) {
        return "colorCero";
      }
      if (num == 1) {
        return "colorUno";
      }
      if (num == -1) {
        return "colorVacio";
      }
    },

    checkWin() {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          if (this.matrix[i][j] !== mWin[i][j]) {
            return false;
          }
        }
      }
      return true;
    },
    init() {
      init();
      this.matrix = m;
    }
  }
});

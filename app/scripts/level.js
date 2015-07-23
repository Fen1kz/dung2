import Cell from './cell.js';
import Border from './border.js';

export default class Level {
  constructor(game) {
    this.game = game;
    this.cells = [];
    this.borders = [];
  }

  generate() {
    //let X = 0;
    //let Y = 0;
    //let SIZE = Math.floor(this.game.c.width / this.game.c.size);
    ////while (X < SIZE, Y < SIZE) {
    //  let cell = new Cell(this.game, this, X, Y, this.cells.length);
    //  cell.expand(SIZE);
    ////}
    let cells2d = [];
    let X = 0;
    let Y = 0;
    let SIZE = Math.floor(this.game.c.width / this.game.c.size);

    for (let X = 0; X < SIZE; ++X) {
      cells2d.push([]);
      for (let Y = 0; Y < SIZE; ++Y) {
        cells2d[X].push(void 0);
      }
    }

    for (let Y = 0; Y < SIZE; ++Y) {
      for (let X = 0; X < SIZE; ++X) {
        let cell = new Cell(this.game, this, X, Y, this.cells.length);
        cells2d[X][Y] = cell;
        this.cells.push(cell);
      }
    }
    this.cells.map((cell) => {
      let X = cell.X;
      let Y = cell.Y;
      if (cells2d[X][Y - 1]) {
        cell.cells[Cell.N()] = cells2d[X][Y - 1];

        let border = new Border(this.game, X, Y, true);
        cell.setBorder(Cell.N(), border);
        let anotherCell = cell.cells[Cell.N()];
        if (anotherCell) anotherCell.setBorder(Cell.S(), border);
        this.borders.push(border);
      }
      if (cells2d[X][Y + 1]) {
        cell.cells[Cell.S()] = cells2d[X][Y + 1];
      }
      if (cells2d[X][X - 1]) {
        cell.cells[Cell.W()] = cells2d[X - 1][Y];

        let border = new Border(this.game, X, Y, false);
        cell.setBorder(Cell.W(), border);
        let anotherCell = cell.cells[Cell.W()];
        if (anotherCell) anotherCell.setBorder(Cell.E(), border);

        this.borders.push(border);
      }
      if (cells2d[X][X + 1]) {
        cell.cells[Cell.E()] = cells2d[X + 1][Y];
      }
    });
    return this;
  }

  draw(ctx) {
    _.each(this.cells, (cell) => {
      //console.log(border);
      cell.draw(ctx);
    });
    _.each(this.borders, (border) => {
      //console.log(border);
      border.draw(ctx);
    });
    return this;
  }
}

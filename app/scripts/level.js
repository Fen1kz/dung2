import Cell from './cell.js';
import Border from './border.js';

export default class Level {
  constructor(game) {
    this.game = game;
  }

  generate() {
    this.game.o.cells1d = [];
    this.game.o.cells2d = [];
    this.game.o.borders1d = [];

    let SIZE = Math.floor(this.game.c.width / this.game.c.size);

    for (let X = 0; X < SIZE; ++X) {
      this.game.o.cells2d.push([]);
      for (let Y = 0; Y < SIZE; ++Y) {
        this.game.o.cells2d[X].push(void 0);
      }
    }

    for (let Y = 0; Y < SIZE; ++Y) {
      for (let X = 0; X < SIZE; ++X) {
        let cell = new Cell(this.game, X, Y, this.game.o.cells1d.length);
        this.game.o.cells2d[X][Y] = cell;
        this.game.o.cells1d.push(cell);

        if (Y != 0) {
          let border = new Border(this.game, X, Y, true);
          cell.setBorder(Cell.N(), border);
          let anotherCell = cell.findCell(Cell.N());
          if (anotherCell) anotherCell.setBorder(Cell.S(), border);
          this.game.o.borders1d.push(border);
        }
        if (X != 0) {
          let border = new Border(this.game, X, Y, false);
          cell.setBorder(Cell.W(), border);
          let anotherCell = cell.findCell(Cell.W());
          if (anotherCell) anotherCell.setBorder(Cell.E(), border);

          this.game.o.borders1d.push(border);
        }
      }
    }

    return this;
  }
}

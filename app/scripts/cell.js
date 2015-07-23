import _ from 'lodash';

export default class Cell {
  constructor(game, X, Y, group) {
    this.game = game;
    this.X = X;
    this.Y = Y;
    this.group = group;
    this.cells = [];
    this.borders = {};
  }

  static N() {
    return (1 << 0);
  }
  static S() {
    return (1 << 1);
  }
  static W() {
    return (1 << 2);
  }
  static E() {
    return (1 << 3);
  }

  static opposite(direction) {
    return (direction << 2) % 15;
  }

  setBorder(direction, border) {
    this.borders[direction] = border;
    border.cells[this.constructor.opposite(direction)] = this;
  }

  findCell(direction) {
    if (direction == this.constructor.N()) {
      return this.game.o.cells2d[this.X][this.Y - 1] ? this.game.o.cells2d[this.X][this.Y - 1] : void 0;
    } else if (direction == this.constructor.W()) {
      return this.game.o.cells2d[this.X - 1] && this.game.o.cells2d[this.X - 1][this.Y] ? this.game.o.cells2d[this.X - 1][this.Y] : void 0;
    } else {
      throw 'wrong direction ' + direction;
    }
  }

  merge(cell) {
    //console.log('merging', this, cell);
    if (this.group != cell.group) {
      this.group = cell.group;
      if (!_.some(this.cells, cell)) {
        this.cells.push(cell);
        cell.cells.push(this);
      }
      _.each(this.cells, (cell) => cell.merge(this));
    }
  }

  draw(ctx) {
    ctx.fillText(this.group, this.X * 20 + 0, this.Y * 20 + 10);
  }
}

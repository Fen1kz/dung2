import _ from 'lodash';

export default class Cell {
  constructor(game, level, X, Y, group) {
    this.game = game;
    this.level = level;
    this.X = X;
    this.Y = Y;
    this.group = group;
    this.cells = {};
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

  merge(cell) {
    //console.log('merging', this, cell);
    if (this.group != cell.group) {
      this.group = cell.group;
      //if (!_.some(this.cells, cell)) {
      //  this.cells.push(cell);
      //  cell.cells.push(this);
      //}
      _.values(this.cells, (cell) => cell.merge(this));
    }
  }

  draw(ctx) {
    //ctx.fillText(this.group, this.X * 20 + 0, this.Y * 20 + 10);
    this.offset = 1;
    this.x = this.X * this.game.c.size;
    this.y = this.Y * this.game.c.size;
    this.width = this.height = this.game.c.size;


    ctx.fillStyle = "#eee";
    ctx.fillRect(this.x + this.offset, this.y + this.offset, this.width -  this.offset, this.height - this.offset);

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + this.offset, this.y + this.offset, this.width -  this.offset, this.height - this.offset);
  }
}

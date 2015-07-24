import _ from 'lodash';

class Direction {
  constructor(str, num) {
    this.str = str;
    this.num = num;
  }

  opposite() {
    return this.constructor.fromNumber((this.num << 2) % 15);
  }

  toString() {
    return this.str;
  }
}

var N = new Direction('N', (1 << 0));
var E = new Direction('E', (1 << 1));
var S = new Direction('S', (1 << 2));
var W = new Direction('W', (1 << 3));
var Directions = {
  'N': N
  ,'E': E
  ,'S': S
  ,'W': W
};

Direction.fromNumber = function (num) {
  return _.find(Directions, (d) => num === d.num);
};

class Cell {
  constructor(game, level, X, Y, group) {
    this.game = game;
    this.level = level;
    this.X = X;
    this.Y = Y;
    this.group = group;
    this.$cells = {};
    this.$borders = {};
  }

  cell(direction) {
    direction = ((typeof direction === 'string') ? direction : direction.str);
    return this.$cells[direction];
  }

  setBorder(direction, border) {
    this.$borders[direction.str] = border;
    border.$cells[direction.opposite().str] = this;
  }

  merge(cell) {
    if (this.group != cell.group) {
      this.group = cell.group;
      _.values(this.$cells, (cell) => cell.merge(this));
    }
  }

  draw(ctx) {
    //ctx.fillText(this.group, this.X * 20 + 0, this.Y * 20 + 10);
    this.offset = 1;
    this.x = this.X * this.game.c.size;
    this.y = this.Y * this.game.c.size;
    this.width = this.height = this.game.c.size;

    ctx.fillStyle = this.color ? this.color : '#ddd';
    ctx.fillRect(this.x + this.offset, this.y + this.offset, this.width - this.offset, this.height - this.offset);

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + this.offset, this.y + this.offset, this.width - this.offset, this.height - this.offset);
  }
}

export {Directions, Cell, Direction};

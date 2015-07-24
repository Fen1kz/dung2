import _ from 'lodash';

class Direction {
  constructor(str, num, arrow) {
    this.str = str;
    this.num = num;
    this.arrow = arrow;
  }

  opposite() {
    return this.constructor.fromNumber((this.num << 2) % 15);
  }

  toString() {
    return `${this.str}:${this.arrow}}`;
  }
}

var Directions = {
  N: new Direction('N', (1 << 0), '↑')
  , E: new Direction('E', (1 << 1), '→')
  , S: new Direction('S', (1 << 2), '↓')
  , W: new Direction('W', (1 << 3), '←')
};

Direction.fromNumber = function (num) {
  return _.find(Directions, (d) => num === d.num);
};

Direction.fromString = function (str) {
  return _.find(Directions, (d) => str === d.toString());
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
    //direction = ((typeof direction === 'string') ? direction : direction.str);
    return this.$cells[direction];
  }

  addCell(direction, cell) {
    this.$cells[direction] = cell;
  }

  setBorder(direction, border) {
    this.$borders[direction] = border;
    border.$cells[direction.opposite()] = this;
  }

  merge(cell) {
    if (this.group != cell.group) {
      this.group = cell.group;
      _.values(this.$cells, (cell) => cell.merge(this));
    }
  }

  draw(ctx) {

    this.offset = 1;
    this.x = this.X * this.game.c.size;
    this.y = this.Y * this.game.c.size;
    this.width = this.height = this.game.c.size;


    ctx.fillStyle = this.color ? this.color : '#ddd';
    ctx.fillRect(this.x + this.offset, this.y + this.offset, this.width - this.offset, this.height - this.offset);

    if (this.arrow) {
      ctx.fillStyle = '#000';
      ctx.fillText(this.arrow, this.x + this.game.c.size * .3, this.y + this.game.c.size * .6);
    }

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + this.offset, this.y + this.offset, this.width - this.offset, this.height - this.offset);
  }
}

export {Directions, Cell, Direction};

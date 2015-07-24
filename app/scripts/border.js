import _ from 'lodash';
import Cell from './cell.js';

export default
class Border {
  constructor(game, X, Y, H) {
    this.game = game;
    this.X = X;
    this.Y = Y;
    this.H = H;
    this.$cells = {};
  }

  getCells() {
    return _.filter(_.values(this.$cells), (cell) => cell);
  }

  remove() {
    //console.log('removing', this);
    _.forIn(this.cells, (cell, direction) => {
      //console.log('cell', direction);
      _.remove(cell.$borders, this);
    });
    this.$cells = {};
  }

  draw(ctx) {
    this.x = this.X * this.game.c.size;
    this.y = this.Y * this.game.c.size;

    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.moveTo(this.x, this.y);
    if (this.H) {
      ctx.lineTo(this.x + this.game.c.size, this.y);
    } else {
      ctx.lineTo(this.x, this.y + this.game.c.size);
    }
    ctx.stroke();
  }
}

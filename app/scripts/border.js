import _ from 'lodash';
import Cell from './cell.js';

export default
class Border {
  constructor(game, X, Y, H) {
    this.game = game;
    this.X = X;
    this.Y = Y;
    this.H = H;
    this.cells = {};
  }

  draw(ctx) {
    this.x = this.X * 20;
    this.y = this.Y * 20;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    if (this.H) {
      ctx.lineTo(this.x + 20, this.y);
    } else {
      ctx.lineTo(this.x, this.y + 20);
    }
    ctx.stroke();
  }

  getCells() {
    return _.filter(_.values(this.cells), (cell) => cell);
  }

  remove() {
    //console.log('removing', this);
    _.forIn(this.cells, (cell, direction) => {
      //console.log('cell', direction);
      cell.borders[Cell.opposite(direction)] = void 0;

    });
    this.cells = {};
  }
}

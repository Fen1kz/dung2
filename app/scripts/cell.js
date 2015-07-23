import _ from 'lodash';

export default class Cell {
  constructor(X, Y, group) {
    this.X = X;
    this.Y = Y;
    this.group = group;
    this.cells = [];
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

import _ from 'lodash';

export default
class Border {
  constructor(X, Y, H) {
    this.X = X;
    this.Y = Y;
    this.H = H;
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

  cells() {
    return _.filter([
      this.leftCell
      , this.topCell
      , this.rightCell
      , this.bottomCell
    ], (cell) => cell);
  }

  remove() {
    console.log('removing', this);
    if (this.leftCell) {
      console.log('leftCell', this.leftCell);
      this.leftCell.rightBorder = void 0;
      this.leftCell = void 0;
    }
    if (this.topCell) {
      console.log('topCell', this.topCell);
      this.topCell.bottomBorder = void 0;
      this.topCell = void 0;
    }
    if (this.rightCell) {
      console.log('rightCell', this.rightCell);
      this.rightCell.leftBorder = void 0;
      this.rightCell = void 0;
    }
    if (this.bottomCell) {
      console.log('bottomCell', this.bottomCell);
      this.bottomCell.topBorder = void 0;
      this.bottomCell = void 0;
    }
  }
}

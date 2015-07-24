import MazeGenerator from './generator.js';
import _ from 'lodash';

export default class Wilson extends MazeGenerator {
  constructor(data) {
    super(data);
  }

  generate() {
    let cells = this.game.level.cells.slice();

    let target = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
    target.maze = 'true';
    target.color = '#fff';
    console.log(cells.length);
    console.log(target);


    let next = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
    next.color = '#ff0';
    console.log(cells.length);

    let path = [next];

    let direction;
    let i = 3;
    while (i-- > 0) {
      let directions = _.keys(next.$cells);
      console.log('pre-filter', direction, directions);
      _.remove(directions, (d) => d == direction);
      console.log('post-filter', directions);

      direction = _.sample(directions);
      console.log(next.X, next.Y, 'going to', direction);
      next = next.cell(direction);
      next.color = '#faa';
      path.push(next);
    }

    this.game.draw();
  }
}

import MazeGenerator from './generator.js';
import _ from 'lodash';
import {Direction} from '../cell.js';

export default class Wilson extends MazeGenerator {
  constructor(data) {
    super(data);
  }

  generate() {
    let game = this.game;
    let cells = this.game.level.cells.slice();

    let target = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
    target.maze = 'true';
    target.color = '#afa';

    target = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
    target.maze = 'true';
    target.color = '#afa';

    target = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
    target.maze = 'true';
    target.color = '#afa';
    console.log(target);


    let source;
    let next = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
    next.color = '#ff0';
    next.walk = true;
    console.log(cells.length);

    let path = [next];

    let direction;
    let i = 25;

    let speed = 50;

    game.draw();

    setTimeout(() => {
      walk(void 0, next);
    }, speed);

    function walk(direction, next) {
      let directions = _.keys(next.$cells);
      //console.log('pre-filter', direction, directions);
      if (direction) {
        _.remove(directions, (d) => d == direction.opposite());
      }
      //console.log('post-filter', directions);
      direction = Direction.fromString(_.sample(directions));

      next.arrow = direction.arrow;
      console.log(next.X, next.Y, 'going to', direction);
      source = next;
      next = next.cell(direction);
      console.log('went', next.walk);

      if (next.color === '#afa') {
        path.map((cell) => {
          cell.walk = false;
          cell.color = '#afa';
          _.remove(cells, (c) => c === cell);
          game.draw();
        });
        //path = [];
        return;
      }

      if (next.walk) {
        eraseWalk(next);
        setTimeout(() => {
          walk(void 0, next);
        }, speed)
        return;
      }

      next.color = '#faa';
      next.walk = true;
      path.push(next);

      game.draw();

      setTimeout(() => {
        walk(direction, next);
      }, speed)
    }

    function eraseWalk(next) {
      game.draw();
      console.log('erasingWalk');
      for (let i = path.length - 1; i > 0; --i) {
        let cell = path.pop();
        //cell.arrow = void 0;
        cell.color = '#aaf';
        cell.walk = false;
        game.draw();
        if (cell === next) {
          next.color = '#faa';
          next.walk = true;
          path.push(next);
          return;
        }
      }
    }
  }
}

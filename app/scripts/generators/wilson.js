import Promise from 'bluebird';
import _ from 'lodash';

import MazeGenerator from './generator.js';
import {Direction} from '../cell.js';

export default
class Wilson extends MazeGenerator {
  constructor(data) {
    super(data);
  }

  loop(fn, args) {
    let speed = 50;
    return fn.apply(this, args)
      .tap(() => this.game.draw())
      .delay(speed)
      .then((retObject) => {
        if (retObject.result === false) {
          return this.loop(fn, retObject.args);
        }
      });
  }

  generate() {
    let game = this.game;
    let cells = this.game.level.cells.slice();
    let path;

    let makeCellPlaced = (cell) => {
      cell.maze = true;
      cell.color = '#afa';
      cell.walk = false;
    };

    let makeCellWalk = (cell) => {
      cell.color = '#ff0';
      cell.walk = true;
    };


    //.then((data) => {
    //  //console.log(data);
    //});

    let walkToTarget = Promise.method(() => {
      game.draw();

      //let target = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
      let target = cells.shift();
      makeCellPlaced(target);

      let next = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
      makeCellWalk(next);

      path = [next];
      let direction;

      //this.loop(() => {
      //  return walk(void 0, next);
      //});

      let x = this.loop(walk, [void 0, next]);
      console.log(x)
      return x;
    });

    let walk = Promise.method((direction, next) => {
      let directions = _.keys(next.$cells);
      //console.log('pre-filter', direction, directions);
      if (direction) {
        _.remove(directions, (d) => d == direction.opposite());
      }
      //console.log('post-filter', directions);
      direction = Direction.fromString(_.sample(directions));

      next.arrow = direction.arrow;
      //console.log(next.X, next.Y, 'going to', direction);
      next = next.cell(direction);
      //console.log('went', next.walk);

      if (next.color === '#afa') {
        path.map((cell) => {
          makeCellPlaced(cell);
          _.remove(cells, (c) => c === cell);
        });
        path = [];
        return {
          result: true
        }
      }

      if (next.walk) {
        eraseWalk(next);
        return {
          result: false
          , args: [void 0, next]
        };
      }

      next.color = '#faa';
      next.walk = true;
      if (next.arrow) delete next.arrow;
      path.push(next);

      game.draw();

      return {
        result: false
        , args: [direction, next]
      };
    });

    this.loop(() => {
      return walkToTarget()
        .tap(() => {console.log('heh', cells.length)})
        .then(() => {
          return {
            result: cells.length < 2
          }
        })
    });

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

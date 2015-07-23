import MazeGenerator from './generator.js';
import _ from 'lodash';

export default class Kruskal extends MazeGenerator {
  constructor(game) {
    super(game);
  }

  generate() {
    let cells1d = this.game.o.cells1d;
    let borders1d = this.game.o.borders1d;
    let groups = cells1d.length;

    let removeBorders1d = borders1d.slice();

    while (groups > 1) {
      let randomIndex = Math.floor(Math.random() * removeBorders1d.length);
      removeBorder(randomIndex);
    }

    function removeBorder(randomIndex) {
      let cells = removeBorders1d[randomIndex].getCells();
      if (cells[0].group != cells[1].group) {
        cells[1].merge(cells[0]);
        let border = removeBorders1d[randomIndex];
        border.remove();
        _.remove(borders1d, border);
        groups--;
      }
      removeBorders1d.splice(randomIndex, 1);
    }

    return this;
  }
}

'use strict';
import _ from 'lodash';
import maze from './level.js';
import Game from './game.js';
import Level from './level.js';
import Kruskal from './generators/kruskal.js';

function ready(fn) {
  console.log(document.readyState);
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

console.log(document.readyState);

ready(() => {
  let game = new Game('canvas')
    .level(Level)
    .generate(Kruskal)
    .draw();
});























'use strict';
import _ from 'lodash';
import maze from './maze.js';
import Cell from './cell.js';
import Border from './border.js';

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
  var canvasEl = document.getElementById('canvas');

  canvasEl.width = 800;
  canvasEl.height = 800;
  //canvasEl.style.width = '400px';
  //canvasEl.style.height = '400px';

  var ctx = canvasEl.getContext('2d');
  ctx.font = "12px serif";

  let cells1d = [];
  let cells2d = [];
  let borders1d = [];

  let SIZE = 40;

  for (let X = 0; X < SIZE; ++X) {
    cells2d.push([]);
    for (let Y = 0; Y < SIZE; ++Y) {
      cells2d[X].push(void 0);
    }
  }

  for (let Y = 0; Y < SIZE; ++Y) {
    for (let X = 0; X < SIZE; ++X) {
      let cell = new Cell(X, Y, cells1d.length);
      cells2d[X][Y] = cell;
      cells1d.push(cell);

      if (Y != 0) {
        let topBorder = new Border(X, Y, true);
        let anotherCell = cells2d[X][Y - 1] ? cells2d[X][Y - 1] : void 0;
        if (anotherCell) {
          topBorder.topCell = anotherCell;
          anotherCell.bottomBorder = topBorder;
        }
        topBorder.bottomCell = cell;
        cell.topBorder = topBorder;
        borders1d.push(topBorder);
      }
      if (X != 0) {
        let leftBorder = new Border(X, Y, false);
        let anotherCell = cells2d[X - 1] && cells2d[X - 1][Y] ? cells2d[X - 1][Y] : void 0;
        if (anotherCell) {
          leftBorder.leftCell = anotherCell;
          anotherCell.rightBorder = leftBorder;
        }
        leftBorder.rightCell = cell;
        cell.leftBorder = leftBorder;
        borders1d.push(leftBorder);
        //console.log('created left border', X, leftBorder.leftCell.X, leftBorder.rightCell.X)
      }
    }
  }
  let groups = cells1d.length;
  //console.log(cells);
  //console.log(cells2d);

  _.each(borders1d, (border, i) => {
    //console.log(i, border);
    border.draw(ctx);
  });


  var removeBorders1d = borders1d.slice();
  //for (let i = 0; i < 30; ++i) {
  while (groups > 1) {
    let randomIndex = Math.floor(Math.random() * removeBorders1d.length);
    removeBorder(randomIndex);
  }
  //  removeBorder(0);
  //  removeBorder(0);
  //  removeBorder(1);
  //  removeBorder(1);
  //removeBorder(0);
  //}


  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  _.each(borders1d, (border) => {
    //console.log(border);
    border.draw(ctx);
  });
  _.each(cells1d, (cell) => {
    //console.log(border);
    //cell.draw(ctx);
  });
  //ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  function removeBorder(randomIndex) {
      let cells = removeBorders1d[randomIndex].cells();
      if (cells[0].group != cells[1].group) {
        cells[1].merge(cells[0]);
        let border = removeBorders1d[randomIndex];
        border.remove();
        _.remove(borders1d, border);
        groups--;
      }
    removeBorders1d.splice(randomIndex, 1);
      console.log(groups);
  }
});























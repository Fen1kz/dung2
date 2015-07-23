export default class Game {
  constructor() {
    this.canvasEl = document.getElementById('canvas');

    this.c = {
      width: 400
      , height: 400
      , size: 20
    };

    this.o = {};

    this.canvasEl.width = this.c.width;
    this.canvasEl.height = this.c.height;
    //canvasEl.style.width = '400px';
    //canvasEl.style.height = '400px';

    this.ctx = this.canvasEl.getContext('2d');
    this.ctx.font = "12px serif";
  }

  level(levelClass) {
    this.level = new levelClass(this)
      .generate();
    return this;
  }

  generate(generatorClass) {
    this.generator = new generatorClass(this)
        .generate();
    return this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.level.draw(this.ctx);
    return this;
  }
}

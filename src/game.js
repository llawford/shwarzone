import * as p5 from 'p5';

const setup = (sketch) => {
  sketch.setup = () => {
    sketch
      .createCanvas(800, 600)
      .parent(document.getElementById('game'));

    sketch.background(40);
  };

  sketch.draw = () => {
    // TODO
  };
};

new p5(setup);

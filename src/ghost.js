export class GhostParticle {
    static preload() {
        GhostParticle.image = loadImage('img/ghost.png');
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 0;
    }

    tick() {
        this.y -= 5;
        this.life++;
    }

    done() {
        this.life > 120;
    }

    draw() {
        image(GhostParticle.image, this.x + 15, this.y + 15);
    }
}

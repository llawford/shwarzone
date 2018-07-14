export class FireParticle {
    constructor(x, y) {
        this.x = x + Math.random() * 10 - 5;
        this.y = y + Math.random() * 10 - 5;
        this.life = 0;
        this.speed = Math.random() * 2;

        this.angleChange = Math.random() * 0.2 - 0.1;
        this.angle = Math.random() * 2 * Math.PI;
    }

    tick() {
        this.life++;

        this.angle += this.angleChange;
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }

    done() {
        return this.life > 45;
    }

    draw() {
        blendMode(ADD);
        noStroke();
        fill(`rgba(255, 150, 10, ${(45 - this.life)/45})`);
        ellipse(this.x + Math.random() * 4 - 2, this.y + Math.random() * 4 - 2, 20, 20);

        blendMode(BLEND);
    }
}

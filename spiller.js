class Spiller {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.hastighet = 0;
    this.w = 25;
    this.h = 25;
  }

  getCenter() {
    return createVector(this.pos.x + this.w/2, this.pos.y + this.h/2);
  }

  settHastighet(hastighet) {
    this.hastighet = hastighet;
  }

  show() {
    fill(255);
    //rect(this.pos.x, this.pos.y, 50, 50);
    tint(255, 255, 255);
    
    image(spillerImage, this.pos.x, this.pos.y);
    noTint();
  }

  isHit() {
    let hit = false;

    for (let index = 0; index < alienBullets.length; index++) {
      if (this.pos.dist(alienBullets[index].pos) < 18) {
        hit = true;
      }
    }

    return hit;
  }

  update() {
    if (this.hastighet > 0 && this.pos.x > width - 50) {
      this.hastighet = 0;
    }

    if (this.hastighet < 0 && this.pos.x < 0) {
      this.hastighet = 0;
    }

    this.pos.x += this.hastighet;
  }
}

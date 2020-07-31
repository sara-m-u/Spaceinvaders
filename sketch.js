let spiller;
let aliens = [];
let bullets = [];
let alienBullets = [];
let alienImage;
let spillerImage;
let backgrundImage;
let gameoverImage;
let gameover = false;
let score = 0;
let level = 1;
let myStorage = window.localStorage;

function getHighscore() {
  return myStorage.getItem("highscore");
}

function setHighscore() {
  if (getHighscore() == null || parseInt(getHighscore()) < score) {
    myStorage.setItem("highscore", "" + score);
  }
}

function preload() {
  alienImage = loadImage(alienPng);
  spillerImage = loadImage(spillerPng);
  backgrundImage = loadImage(backgroundPng);
  gameoverImage = loadImage(gameoverPng);
}

function setup() {
  createCanvas(400, 400);
  spiller = new Spiller(200, 360);
  setupAliens();
}

function setupAliens() {
  gameover = false;
  aliens = [];
  alienBullets = [];
  for (let index = 0; index < 7; index++) {
    for (let rad = 0; rad < 4; rad++) {
      aliens.push(new Alien(50 + index * 50, 50 + rad * 30));
    }
  }
}

function drawAliens() {
  let aliensKollidert = false;
  for (let index = 0; index < aliens.length; index++) {
    if (aliens[index].harKollidert()) {
      aliensKollidert = true;
    }

    if (aliens[index].pos.y >= 360) {
      gameover = true;
      level = 1;
      score = 0;
      setTimeout(setupAliens, 5000);
    }
  }

  for (let index = aliens.length - 1; index >= 0; index--) {
    if (aliensKollidert) {
      aliens[index].snu();
    }

    aliens[index].show();
    aliens[index].update();

    for (let indexb = bullets.length - 1; indexb >= 0; indexb--) {
      if (aliens[index].pos.dist(bullets[indexb].pos) < 12) {
        //aliens.splice(index, 1);
        //bullets.splice(indexb, 1);
        score++;
        aliens[index].skalSlettes = true;
        bullets[indexb].skalSlettes = true;
      }
    }
  }
}

function drawBullets() {
  for (let index = bullets.length - 1; index >= 0; index--) {
    bullets[index].show();
    bullets[index].update();

    if (bullets[index].pos.y < 0) {
      //bullets.splice(index);
      bullets[index].skalSlettes = true;
    }
  }

  for (let index = alienBullets.length - 1; index >= 0; index--) {
    alienBullets[index].show();
    alienBullets[index].update();

    if (alienBullets[index].pos.y > height) {
      //bullets.splice(index);
      alienBullets[index].skalSlettes = true;
    }
  }
}

function slettFigurer() {
  for (let indexA = aliens.length - 1; indexA >= 0; indexA--) {
    if (aliens[indexA].skalSlettes) {
      aliens.splice(indexA, 1);
    }
  }

  for (let indexB = bullets.length - 1; indexB >= 0; indexB--) {
    if (bullets[indexB].skalSlettes) {
      bullets.splice(indexB, 1);
    }
  }
}

function draw() {
  if (gameover) {
    background(0);
    image(gameoverImage, 0, 0);
  } else {
    rectMode(CENTER);
    background(0);
    tint(0, 200, 0);
    background(backgrundImage);
    noTint();
    fill(255);

    spiller.show();
    spiller.update();
    if (spiller.isHit()) {
        gameover = true;
        level = 1;
        score = 0;
        setTimeout(setupAliens, 5000);
    }

    drawAliens();
    drawBullets();

    fill(255);
    textSize(15);
    text("Poengsum: " + score, 20, 20);
    text("Nivå: " + level, 20, 50);
    text("highscore: " + getHighscore(), 20, 80);
    setHighscore();

    if (aliens.length == 0) {
      level++;
      setupAliens();
    }

    slettFigurer();
  }

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    spiller.settHastighet(-2);
  }

  if (keyCode === RIGHT_ARROW) {
    spiller.settHastighet(2);
  }

  if (keyCode === UP_ARROW) {
    if (bullets.length <= 4) {
      bullets.push(new Bullet(spiller.pos.x + 25, spiller.pos.y, 4));
    }
  }

  if (key === ' ') {
    spiller.settHastighet(0);
  }
}

import { createAnimations } from "./animations.js";

const config = {
  type: Phaser.AUTO, // webgl, canvas
  width: 720,
  height: 440,
  backgroundColor: "#049cd8",
  parent: "game",
  scene: {
    preload: preload, // función que se ejecuta para precargar recursos
    create: create, // se ejecuta cuando el juego comienza
    update: update, // se ejecuta en cada frame
  },
};

new Phaser.Game(config);

function preload() {
  this.load.image("cloud1", "assets/enviroment/cloud1.png");
  this.load.spritesheet("cat", "assets/personaje/Eating.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.audio("eat", "assets/sounds/eatCookie.mp3");
  this.load.spritesheet("catIdle", "assets/personaje/Idle.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("catHappy", "assets/personaje/Excited.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("catSad", "assets/personaje/Sad.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("catPlay", "assets/personaje/Dance.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("catSleep", "assets/personaje/Sleep.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
}

function create() {
  this.add.image(350, 100, "cloud1").setOrigin(0, 0).setScale(0.2);

  this.cat = this.add.sprite(480, 32, "catIdle").setOrigin(0, 0).setScale(4);

  createAnimations(this);

  this.cat.on("animationcomplete", () => {
    this.cat.anims.play("cat-idle", true);
  });

  this.eatSound = this.sound.add("eat", { volume: 0.4 });

  const eatButton = document.getElementById("eatButton");
  eatButton.addEventListener("click", () => {
    if (!this.cat.anims.isPlaying) {
      this.cat.anims.play("cat-eat", true);
      this.eatSound.play();
      updateBar(this.foodBar, -10);
    }
  });

  const sleepButton = createButton("Dormir", () => {
    if (!this.cat.anims.isPlaying) {
      this.cat.anims.play("cat-sleep", true);
      refillBar(this.energyBar, 1);
    }
  });

  const playButton = createButton("Jugar", () => {
    this.cat.anims.play("cat-idle", false);
    if (!this.cat.anims.isPlaying && this.energyBar.value >= 10) {
      this.cat.anims.play("cat-play", true);
      updateBar(this.energyBar, -10);
    }
  });

  document.body.appendChild(sleepButton);
  document.body.appendChild(playButton);

  this.healthBar = createBar(this, 20, 20, 100, 0x00ff00); // Vida
  this.foodBar = createBar(this, 20, 50, 100, 0xffff00); // Comida
  this.energyBar = createBar(this, 20, 80, 100, 0x0000ff); // Energía
}

function update() {
  if (this.energyBar.value <= 0 || this.foodBar.value <= 0) {
    this.cat.anims.play("cat-sad", true);
  } else if (this.energyBar.value < 50 && !this.cat.anims.isPlaying) {
    this.cat.anims.play("cat-sad", true);
  } else if (!this.cat.anims.isPlaying) {
    this.cat.anims.play("cat-idle", true);
  }
}

function createBar(scene, x, y, width, color) {
  const bar = scene.add.graphics();
  bar.fillStyle(color, 1);
  bar.fillRect(x, y, width, 20);
  return { bar, width, value: 100, color, x, y };
}

function updateBar(barObj, change) {
  barObj.value += change;
  if (barObj.value > 100) barObj.value = 100;
  if (barObj.value < 0) barObj.value = 0;
  barObj.bar.clear();
  barObj.bar.fillStyle(barObj.color, 1);
  barObj.bar.fillRect(
    barObj.x,
    barObj.y,
    (barObj.value / 100) * barObj.width,
    20
  );
}

function refillBar(barObj, increment) {
  const interval = setInterval(() => {
    barObj.value += increment;
    if (barObj.value >= 100) {
      barObj.value = 100;
      clearInterval(interval);
    }
    barObj.bar.clear();
    barObj.bar.fillStyle(barObj.color, 1);
    barObj.bar.fillRect(
      barObj.x,
      barObj.y,
      (barObj.value / 100) * barObj.width,
      20
    );
  }, 500);
}

function createButton(label, onClick) {
  const button = document.createElement("button");
  button.textContent = label;
  button.style.marginTop = "10px";
  button.style.padding = "10px 20px";
  button.style.backgroundColor = "#049cd8";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.fontSize = "16px";
  button.addEventListener("click", onClick);
  return button;
}

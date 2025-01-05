import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { createAnimations } from "../animations";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.image("cloud1", "assets/enviroment/cloud1.png");
        this.load.image("room", "assets/enviroment/room2.png");

        this.load.audio("eat", "assets/sounds/eatCookie.mp3");
        this.load.spritesheet("catEating", "assets/personaje/Eating.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
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
        this.load.spritesheet("catSleepy", "assets/personaje/Sleepy.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("catSleep", "assets/personaje/Sleep.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("catPooping", "assets/personaje/Box3.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    create() {
        createAnimations(this);
        // this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, "cloud1").setAlpha(0.5);
        this.add.image(0, -150, "room").setOrigin(0, 0).setScale(2);

        this.cat = this.add
            .sprite(480, 32, "catIdle")
            .setOrigin(0, 0)
            .setScale(4)
            .setPosition(480, 450);

        this.cat.on("animationcomplete", () => {
            this.cat.anims.play("cat-idle", true);
        });

        // this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5).setDepth(100);

        // this.anims.addMix("animA", "animB", 200);

        // mix idle and eat
        this.anims.addMix("cat-idle", "cat-eat", 200);
        this.anims.addMix("cat-eat", "cat-idle", 200);

        // mix idle and sleep
        this.anims.addMix("cat-idle", "cat-sleep", 200);
        // this.anims.addMix("cat-sleepy", "cat-sleep", 200);
        this.anims.addMix("cat-sleep", "cat-idle", 200);

        // mix idle and play
        this.anims.addMix("cat-idle", "cat-play", 200);
        this.anims.addMix("cat-play", "cat-idle", 200);

        // mix idle and pooping
        this.anims.addMix("cat-idle", "cat-pooping", 200);
        this.anims.addMix("cat-pooping", "cat-idle", 200);
        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.cat.anims.play("cat-idle", true);
    }

    changeScene() {
        this.scene.remove("Game");
        this.scene.start("GameOver");
    }

    handleEat() {
        console.log("handleEat");
        this.cat.anims.play("cat-eat", true);
    }

    handleSleep() {
        console.log("handleSleep");
        this.cat.anims.play("cat-sleep", true);
    }

    handlePlay() {
        console.log("handlePlay");
        this.cat.anims.play("cat-play", true);
    }

    handlePoop() {
        console.log("handlePoop");
        this.cat.anims.play("cat-pooping", true);
    }
}


import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { createAnimations } from "../animations";
import {
    EatStrategy,
    PlayStrategy,
    PoopStrategy,
    SleepStrategy,
    WakeStrategy,
} from "../../infrastructure/phaser/CatActionStrategy";

export class Game extends Scene {
    constructor() {
        super("Game");
        this.energyTimer = null;
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        createAnimations(this);
        
        // Centramos el fondo con origin 0.5
        this.add.image(centerX, centerY, "room").setOrigin(0.5, 0.5);

        this.cat = this.add
            .sprite(centerX, centerY + 100, "catIdle")
            .setOrigin(0.5, 0.5)
            .setScale(4);

        this.cat.anims.play("cat-idle", true);

        // Mixes de animaciones
        this.anims.addMix("cat-idle", "cat-eat", 200);
        this.anims.addMix("cat-eat", "cat-idle", 200);
        this.anims.addMix("cat-sleep", "cat-idle", 200);
        this.anims.addMix("cat-idle", "cat-play", 200);
        this.anims.addMix("cat-play", "cat-idle", 200);
        this.anims.addMix("cat-idle", "cat-pooping", 200);
        this.anims.addMix("cat-pooping", "cat-idle", 200);
        this.anims.addMix("cat-wake", "cat-idle", 200);

        // Suscribirse a acciones
        EventBus.on("action-triggered", (action) => this.handleAction(action));
        EventBus.on("pet-sleeping", () => this.handleAction("sleep"));
        EventBus.on("pet-woke-up", () => this.handleAction("wake"));
        EventBus.on("pet-reset", () => {
            this.cat.setPosition(480, 450);
            this.cat.anims.play("cat-idle", true);
        });

        EventBus.emit("current-scene-ready", this);

        // Escuchar cambios de tamaño para re-centrar
        this.scale.on('resize', (gameSize) => {
            const width = gameSize.width;
            const height = gameSize.height;
            this.cameras.main.setViewport(0, 0, width, height);
            
            const centerX = width / 2;
            const centerY = height / 2;
            
            // Reposicionar fondo y gato
            this.children.list.forEach(child => {
                if (child.texture && child.texture.key === 'room') {
                    child.setPosition(centerX, centerY);
                }
            });
            this.cat.setPosition(centerX, centerY + 100);
        });
    }

    update() {
        // La animación base es controlada por eventos o por el fin de animaciones previas
        if (!this.cat.anims.isPlaying) {
            this.cat.anims.play("cat-idle", true);
        }
    }

    handleAction(action) {
        switch (action) {
            case "eat":
                this.catAction = new EatStrategy(this.cat);
                break;
            case "sleep":
                this.catAction = new SleepStrategy(this.cat);
                break;
            case "wake":
                this.catAction = new WakeStrategy(this.cat);
                break;
            case "play":
                this.catAction = new PlayStrategy(this.cat);
                break;
            case "poop":
                this.catAction = new PoopStrategy(this.cat);
                break;
            default:
                return;
        }
        this.catAction.execute();
        
        // Volver a idle después de ciertas animaciones
        if (action !== "sleep") {
            this.cat.once("animationcomplete", () => {
                this.cat.anims.play("cat-idle", true);
            });
        }
    }

    // handleEat() {
    //     console.log("handleEat");
    //     this.cat.setPosition(300, 550);
    //     this.cat.anims.play("cat-eat", true);
    // }

    // handleSleep() {
    //     console.log("handleSleep");
    //     this.cat.setPosition(460, 270);
    //     this.cat.anims.play("cat-sleep", true);
    // }

    // handlePlay() {
    //     console.log("handlePlay");
    //     this.cat.setPosition(780, 290);
    //     this.cat.anims.play("cat-play", true);
    // }

    // handlePoop() {
    //     console.log("handlePoop");
    //     this.cat.setPosition(700, 500);
    //     this.cat.anims.play("cat-pooping", true);
    // }
}


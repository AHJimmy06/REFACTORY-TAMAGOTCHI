// CatActionStrategy.js
export class CatActionStrategy {
    constructor(cat) {
        this.cat = cat;
        // Obtenemos dimensiones dinámicas del mundo de Phaser
        const { width, height, centerX, centerY } = cat.scene.cameras.main;
        this.width = width;
        this.height = height;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    execute() {
        throw new Error("execute() debe ser implementado");
    }
}

export class EatStrategy extends CatActionStrategy {
    execute() {
        console.log("handleEat");
        // Se mueve un 20% a la izquierda y baja un poco
        this.cat.setPosition(this.centerX - (this.width * 0.2), this.centerY + (this.height * 0.15));
        this.cat.anims.play("cat-eat", true);
    }
}

export class SleepStrategy extends CatActionStrategy {
    execute() {
        console.log("handleSleep");
        // Se acomoda un toque arriba del centro
        this.cat.setPosition(this.centerX - (this.width * 0.05), this.centerY - (this.height * 0.1));
        this.cat.anims.play("cat-sleep", true);
    }
}

export class WakeStrategy extends CatActionStrategy {
    execute() {
        console.log("Despertando...");
        this.cat.setPosition(this.centerX, this.centerY + (this.height * 0.1));
        this.cat.anims.play("cat-wake", true);
    }
}

export class PlayStrategy extends CatActionStrategy {
    execute() {
        console.log("handlePlay");
        // Salta un 25% a la derecha y sube un poquito
        this.cat.setPosition(this.centerX + (this.width * 0.25), this.centerY - (this.height * 0.05));
        this.cat.anims.play("cat-play", true);
    }
}

export class PoopStrategy extends CatActionStrategy {
    execute() {
        console.log("handlePoop");
        // Se va al rincón inferior derecho (20% offset)
        this.cat.setPosition(this.centerX + (this.width * 0.2), this.centerY + (this.height * 0.12));
        this.cat.anims.play("cat-pooping", true);
    }
}


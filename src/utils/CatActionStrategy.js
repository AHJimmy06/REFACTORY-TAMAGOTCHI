// CatActionStrategy.js
export class CatActionStrategy {
    constructor(cat) {
        this.cat = cat;
    }

    execute() {
        throw new Error("execute() debe ser implementado");
    }
}

export class EatStrategy extends CatActionStrategy {
    execute() {
        console.log("handleEat");
        this.cat.setPosition(300, 550);
        this.cat.anims.play("cat-eat", true);
    }
}

export class SleepStrategy extends CatActionStrategy {
    execute() {
        console.log("handleSleep");
        this.cat.setPosition(460, 270);
        this.cat.anims.play("cat-sleep", true);
    }
}

export class PlayStrategy extends CatActionStrategy {
    execute() {
        console.log("handlePlay");
        this.cat.setPosition(780, 290);
        this.cat.anims.play("cat-play", true);
    }
}

export class PoopStrategy extends CatActionStrategy {
    execute() {
        console.log("handlePoop");
        this.cat.setPosition(700, 500);
        this.cat.anims.play("cat-pooping", true);
    }
}


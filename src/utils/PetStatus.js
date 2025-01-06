export class PetStatus {
    constructor(health, food, energy, happiness) {
        this.health = health;
        this.food = food;
        this.energy = energy;
        this.happiness = happiness;
    }

    reduceFood(amount) {
        this.food = Math.max(0, this.food - amount);
        if (this.food === 0) this.reduceHealth(2);
    }

    reduceEnergy(amount) {
        this.energy = Math.max(0, this.energy - amount);
        if (this.energy === 0) this.reduceHealth(1);
    }

    reduceHappiness(amount) {
        this.happiness = Math.max(0, this.happiness - amount);
        if (this.happiness === 0) this.reduceHealth(0.5);
    }

    reduceHealth(amount) {
        this.health = Math.max(0, this.health - amount);
    }

    increaseFood(amount) {
        this.food = Math.min(100, this.food + amount);
    }

    increaseEnergy(amount) {
        this.energy = Math.min(100, this.energy + amount);
    }

    increaseHappiness(amount) {
        this.happiness = Math.min(100, this.happiness + amount);
    }

    increaseHealth(amount) {
        this.health = Math.min(100, this.health + amount);
    }
}


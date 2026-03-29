// src/core/entities/Pet.js
export class Pet {
    constructor(stats = { health: 100, food: 100, energy: 100, happiness: 100 }, isSleeping = false) {
        this.stats = { ...stats };
        this.isSleeping = isSleeping;
    }

    // Reglas de negocio puras (SRP)
    tick() {
        if (!this.isAlive) return;

        // Reducción natural de hambre
        this.stats.food = Math.max(0, this.stats.food - 3);
        
        // Manejo de energía según estado
        if (this.isSleeping) {
            this.stats.energy = Math.min(100, this.stats.energy + 20);
            if (this.isFullyRested) {
                this.wakeUp();
            }
        } else {
            this.stats.energy = Math.max(0, this.stats.energy - 10);
        }

        // Reducción natural de felicidad
        this.stats.happiness = Math.max(0, this.stats.happiness - 1);

        // Lógica de salud (si algo está en cero, baja la vida)
        if (this.stats.food === 0) this.modifyHealth(-2);
        if (this.stats.energy === 0) this.modifyHealth(-1);
        if (this.stats.happiness === 0) this.modifyHealth(-0.5);
    }

    toggleSleep() {
        this.isSleeping = !this.isSleeping;
    }

    wakeUp() {
        this.isSleeping = false;
    }

    goToSleep() {
        this.isSleeping = true;
    }

    modifyHealth(amount) {
        this.stats.health = Math.min(100, Math.max(0, this.stats.health + amount));
    }

    eat(amount = 30) {
        if (this.isSleeping) return;
        this.stats.food = Math.min(100, this.stats.food + amount);
    }

    play(energyCost = 10, happinessGain = 20, healthGain = 10) {
        if (this.isSleeping) return;
        this.stats.energy = Math.max(0, this.stats.energy - energyCost);
        this.stats.happiness = Math.min(100, this.stats.happiness + happinessGain);
        this.modifyHealth(healthGain);
    }

    poop(foodCost = 10, healthGain = 5) {
        if (this.isSleeping) return;
        this.stats.food = Math.max(0, this.stats.food - foodCost);
        this.modifyHealth(healthGain);
    }

    get isAlive() {
        return this.stats.health > 0;
    }

    get isFullyRested() {
        return this.stats.energy >= 100;
    }
}

// src/adapters/PetController.js
import { FeedPetUseCase } from "../core/use-cases/FeedPetUseCase";
import { PlayWithPetUseCase } from "../core/use-cases/PlayWithPetUseCase";
import { SleepPetUseCase } from "../core/use-cases/SleepPetUseCase";
import { PoopPetUseCase } from "../core/use-cases/PoopPetUseCase";
import { TickPetUseCase } from "../core/use-cases/TickPetUseCase";
import { LocalStoragePetRepository } from "../infrastructure/repositories/LocalStoragePetRepository";
import { EventBus } from "../game/EventBus";

export class PetController {
    constructor() {
        this.repository = new LocalStoragePetRepository();
        this.eventBus = EventBus;

        this.useCases = {
            feed: new FeedPetUseCase(this.repository, this.eventBus),
            play: new PlayWithPetUseCase(this.repository, this.eventBus),
            sleep: new SleepPetUseCase(this.repository, this.eventBus),
            poop: new PoopPetUseCase(this.repository, this.eventBus),
            tick: new TickPetUseCase(this.repository, this.eventBus)
        };
    }

    feed() {
        this.useCases.feed.execute();
        this.eventBus.emit("action-triggered", "eat");
    }

    play() {
        this.useCases.play.execute();
        this.eventBus.emit("action-triggered", "play");
    }

    sleep() {
        this.useCases.sleep.execute();
        this.eventBus.emit("action-triggered", "sleep");
    }

    poop() {
        this.useCases.poop.execute();
        this.eventBus.emit("action-triggered", "poop");
    }

    tick() {
        this.useCases.tick.execute();
    }

    getInitialState() {
        const pet = this.repository.load();
        return {
            stats: pet.stats,
            isSleeping: pet.isSleeping,
            isAlive: pet.isAlive
        };
    }

    reset() {
        console.log("Resetting pet data...");
        this.repository.clear();
        // Forzamos la emisión del evento para limpiar UI local si no hay recarga
        this.eventBus.emit("pet-reset");
    }
}

// Singleton for easy access across React and Phaser
export const petController = new PetController();

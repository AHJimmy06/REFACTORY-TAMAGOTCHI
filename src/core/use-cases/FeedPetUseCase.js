// src/core/use-cases/FeedPetUseCase.js
export class FeedPetUseCase {
    constructor(petRepository, eventBus) {
        this.petRepository = petRepository;
        this.eventBus = eventBus;
    }

    execute() {
        const pet = this.petRepository.load();
        if (!pet.isAlive) return;

        pet.eat();
        this.petRepository.save(pet);
        
        // Notificamos a quien le interese (UI, Phaser, etc)
        this.eventBus.emit("pet-updated", pet.stats);
    }
}

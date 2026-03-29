// src/core/use-cases/PlayWithPetUseCase.js
export class PlayWithPetUseCase {
    constructor(petRepository, eventBus) {
        this.petRepository = petRepository;
        this.eventBus = eventBus;
    }

    execute() {
        const pet = this.petRepository.load();
        if (!pet.isAlive || pet.isSleeping) return;

        pet.play();
        this.petRepository.save(pet);
        this.eventBus.emit("pet-updated", pet.stats);
    }
}

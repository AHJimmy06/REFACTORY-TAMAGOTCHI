// src/core/use-cases/PoopPetUseCase.js
export class PoopPetUseCase {
    constructor(petRepository, eventBus) {
        this.petRepository = petRepository;
        this.eventBus = eventBus;
    }

    execute() {
        const pet = this.petRepository.load();
        if (!pet.isAlive || pet.isSleeping) return;

        pet.poop();
        this.petRepository.save(pet);
        this.eventBus.emit("pet-updated", pet.stats);
    }
}

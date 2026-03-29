// src/core/use-cases/SleepPetUseCase.js
export class SleepPetUseCase {
    constructor(petRepository, eventBus) {
        this.petRepository = petRepository;
        this.eventBus = eventBus;
    }

    execute() {
        const pet = this.petRepository.load();
        if (!pet.isAlive) return;

        pet.goToSleep();
        this.petRepository.save(pet);
        this.eventBus.emit("pet-updated", pet.stats);
        this.eventBus.emit("pet-sleeping");
    }
}

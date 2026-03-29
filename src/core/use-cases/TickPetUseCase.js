// src/core/use-cases/TickPetUseCase.js
export class TickPetUseCase {
    constructor(petRepository, eventBus) {
        this.petRepository = petRepository;
        this.eventBus = eventBus;
    }

    execute() {
        const pet = this.petRepository.load();
        if (!pet.isAlive) return;

        const wasSleeping = pet.isSleeping;
        pet.tick();
        
        // Si se despertó automáticamente al estar descansado
        if (wasSleeping && !pet.isSleeping) {
            this.eventBus.emit("pet-woke-up");
        }

        this.petRepository.save(pet);
        this.eventBus.emit("pet-updated", pet.stats);

        if (!pet.isAlive) {
            this.eventBus.emit("pet-died");
        }
    }
}

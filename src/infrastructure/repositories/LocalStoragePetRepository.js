// src/infrastructure/repositories/LocalStoragePetRepository.js
import { Pet } from "../../core/entities/Pet";

export class LocalStoragePetRepository {
    constructor(key = "statusPet") {
        this.key = key;
    }

    save(pet) {
        localStorage.setItem(this.key, JSON.stringify({
            stats: pet.stats,
            isSleeping: pet.isSleeping
        }));
    }

    load() {
        const data = localStorage.getItem(this.key);
        if (!data) return new Pet();
        try {
            const { stats, isSleeping } = JSON.parse(data);
            return new Pet(stats, isSleeping);
        } catch (e) {
            console.error("Error al cargar la mascota:", e);
            return new Pet();
        }
    }

    clear() {
        localStorage.removeItem(this.key);
    }
}

import { useEffect, useState, useRef } from "react";
import StatusBar from "./components/StatusBar";
import { PhaserGame } from "./game/PhaserGame";
import { petController } from "./adapters/PetController";
import { EventBus } from "./game/EventBus";

function App() {
    const [stats, setStats] = useState(petController.getInitialState().stats);
    const [isAlive, setIsAlive] = useState(
        petController.getInitialState().isAlive,
    );
    const [currentSceneKey, setCurrentSceneKey] = useState("");
    const phaserRef = useRef();

    useEffect(() => {
        const handleUpdate = (newStats) => setStats({ ...newStats });
        const handleDeath = () => {
            setIsAlive(false);
            phaserRef.current?.game?.scene.start("GameOver");
        };
        const handleReset = () => {
            const initialState = petController.getInitialState();
            setStats(initialState.stats);
            setIsAlive(initialState.isAlive);
        };

        EventBus.on("pet-updated", handleUpdate);
        EventBus.on("pet-died", handleDeath);
        EventBus.on("pet-reset", handleReset);

        return () => {
            EventBus.off("pet-updated", handleUpdate);
            EventBus.off("pet-died", handleDeath);
            EventBus.off("pet-reset", handleReset);
        };
    }, []);

    useEffect(() => {
        if (currentSceneKey === "Game" && isAlive) {
            const interval = setInterval(() => petController.tick(), 1000);
            return () => clearInterval(interval);
        }
    }, [currentSceneKey, isAlive]);

    const handleCurrentScene = (scene) => {
        const key = scene?.scene?.key || scene?.key || "";
        setCurrentSceneKey(key);
    };

    return (
        <div
            id="app"
            className={currentSceneKey === "Game" ? "playing" : "in-menu"}
        >
            {/* VISTA 1: STATS - Solo si está vivo y en Game */}
            {currentSceneKey === "Game" && isAlive && (
                <div className="stats-layer">
                    <StatusBar
                        label="Salud"
                        icon="assets/icons/heart.png"
                        value={stats.health}
                        color="#ff4d4d"
                    />
                    <StatusBar
                        label="Comida"
                        icon="assets/icons/naruto.png"
                        value={stats.food}
                        color="#ffa64d"
                    />
                    <StatusBar
                        label="Energía"
                        icon="assets/icons/flash.png"
                        value={stats.energy}
                        color="#4d94ff"
                    />
                    <StatusBar
                        label="Felicidad"
                        icon="assets/icons/happy.png"
                        value={stats.happiness}
                        color="#ffff4d"
                    />
                </div>
            )}

            {/* VISTA 2: GAME CONTAINER */}
            <div className="game-layer">
                <PhaserGame
                    ref={phaserRef}
                    currentActiveScene={handleCurrentScene}
                />
            </div>

            {/* VISTA 3: CONTROLES - Solo si está vivo y en Game */}
            {currentSceneKey === "Game" && isAlive && (
                <div className="controls-layer">
                    <div className="button-group">
                        <button
                            className="button"
                            onClick={() => petController.feed()}
                        >
                            Alimentar
                        </button>
                        <button
                            className="button"
                            onClick={() => petController.sleep()}
                        >
                            Dormir
                        </button>
                        <button
                            className="button"
                            onClick={() => petController.play()}
                        >
                            Jugar
                        </button>
                        <button
                            className="button"
                            onClick={() => petController.poop()}
                        >
                            Popo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

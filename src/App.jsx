import React, { useEffect, useRef, useState } from "react";

import StatusBar from "./components/StatusBar";
import { PhaserGame } from "./game/PhaserGame";
import { PetStatus } from "./utils/PetStatus";

function App() {
    // The sprite can only be moved in the MainMenu Scene
    const [currentScene, setCurrentScene] = useState("");

    const [petStatus, setPetStatus] = useState(
        new PetStatus(100, 100, 100, 100)
    );

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    let statusPet = localStorage.getItem("statusPet");

    useEffect(() => {
        if (statusPet) {
            const status = JSON.parse(statusPet);
            setPetStatus(
                new PetStatus(
                    status.health,
                    status.food,
                    status.energy,
                    status.happiness
                )
            );
        }
    }, []);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ scene:", currentScene?.scene?.key);
        const sceneKey = currentScene?.scene?.key;
        if (sceneKey === "Game") {
            const interval = setInterval(() => {
                petStatus.reduceFood(50);
                petStatus.reduceEnergy(50);
                petStatus.reduceHappiness(50);

                setPetStatus(
                    new PetStatus(
                        petStatus.health,
                        petStatus.food,
                        petStatus.energy,
                        petStatus.happiness
                    )
                );

                localStorage.setItem("statusPet", JSON.stringify(petStatus));
            }, 1000); // Cada segundo
            console.log(petStatus);
            if (petStatus.health === 0) {
                const game = phaserRef.current.game;
                if (game) {
                    game.scene.start("GameOver");
                }
                localStorage.clear();
            }
            return () => clearInterval(interval); // Limpiar el intervalo al desmontar
        }
    }, [petStatus, currentScene]);

    const catEating = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            scene.handleEat();
            console.log("Alimentando");
            petStatus.increaseFood((prev) => Math.min(100, prev + 20));
        }
    };

    const catSleeping = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            scene.handleSleep();
            console.log("Durmiendo");
            petStatus.increaseEnergy((prev) => Math.min(100, prev + 30)); // Incrementar energía
        }
    };

    const catPlaying = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            scene.handlePlay();
            console.log("Jugando");
            petStatus.increaseEnergy((prev) => Math.max(0, prev - 10)); // Reducir energía
            petStatus.increaseHealth((prev) => Math.min(100, prev + 10)); // Incrementar salud
            petStatus.increaseHappiness((prev) => Math.min(100, prev + 20)); // Incrementar felicidad
        }
    };

    const catPooping = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            scene.handlePoop();
            console.log("Haciendo popo");
            petStatus.increaseHealth((prev) => Math.min(100, prev + 5)); // Incrementar salud
            petStatus.increaseFood((prev) => Math.max(0, prev - 10)); // Reducir comida
        }
    };

    // Event emitted from the PhaserGame component
    const handleCurrentScene = (scene) => {
        setCurrentScene(scene);
    };

    return (
        <div id="app">
            <PhaserGame
                ref={phaserRef}
                currentActiveScene={handleCurrentScene}
            />
            <div>
                {/* <div>
                    <button className="button" onClick={changeScene}>
                        Jugar
                    </button>
                </div> */}
                {/* <div>
                    <button
                        disabled={canMoveSprite}
                        className="button"
                        onClick={moveSprite}
                    >
                        Toggle Movement
                    </button>
                </div> */}
                {/* <div className="spritePosition">
                    Sprite Position:
                    <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
                </div> */}
                {/* <div>
                    <button className="button" onClick={addSprite}>
                        Add New Sprite
                    </button>
                </div> */}
                {currentScene?.scene?.key === "Game" && (
                    <React.Fragment>
                        <div style={{ marginTop: "20px", marginLeft: "10px" }}>
                            <StatusBar
                                label="Salud"
                                icon="assets/icons/heart.png"
                                // value={health}
                                value={petStatus.health}
                                color="#00ff00"
                            />
                            <StatusBar
                                label="Comida"
                                icon="assets/icons/naruto.png"
                                // value={food}
                                value={petStatus.food}
                                color="#ff7203"
                            />
                            <StatusBar
                                label="Energía"
                                icon="assets/icons/flash.png"
                                // value={energy}
                                value={petStatus.energy}
                                color="#0000ff"
                            />
                            <StatusBar
                                label="Felicidad"
                                icon="assets/icons/happy.png"
                                value={petStatus.happiness}
                                color="#ffff00"
                            />
                        </div>
                        <div>
                            <button className="button" onClick={catEating}>
                                Alimentar
                            </button>
                        </div>
                        <div>
                            <button className="button" onClick={catSleeping}>
                                Dormir
                            </button>
                        </div>
                        <div>
                            <button className="button" onClick={catPlaying}>
                                Jugar
                            </button>
                        </div>
                        <div>
                            <button className="button" onClick={catPooping}>
                                Hacer popo
                            </button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default App;


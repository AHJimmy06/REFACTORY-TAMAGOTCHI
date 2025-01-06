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
    // const [health, setHealth] = useState(100);
    // const [food, setFood] = useState(100);
    // const [energy, setEnergy] = useState(100);
    // const [happiness, setHappiness] = useState(100);
    let statusPet = localStorage.getItem("statusPet");

    useEffect(() => {
        if (statusPet) {
            // const game = phaserRef.current.game;
            // if (game) {
            //     game.scene.start("Game");
            // }
            const status = JSON.parse(statusPet);
            // setHealth(status.health);
            // setFood(status.food);
            // setEnergy(status.energy);
            // setHappiness(status.happiness);
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

    // useEffect(() => {
    //     if (currentScene?.scene?.key === "GameOver") {
    //         // setHealth(100);
    //         // setFood(100);
    //         // setEnergy(100);
    //         // setHappiness(100);
    //     }
    //     console.log(health, food, energy, happiness);
    // }, [currentScene]);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ scene:", currentScene?.scene?.key);
        const sceneKey = currentScene?.scene?.key;
        if (sceneKey === "Game") {
            const interval = setInterval(() => {
                // setFood((prev) => Math.max(0, prev - 3)); // Reducir comida más rápido
                // setEnergy((prev) => Math.max(0, prev - 1)); // Reducir energía
                // setHappiness((prev) => Math.max(0, prev - 1)); // Reducir felicidad

                // if (food === 0) {
                //     setHealth((prev) => Math.max(0, prev - 2)); // Reducir salud
                // }

                // if (energy === 0) {
                //     setHealth((prev) => Math.max(0, prev - 1)); // Reducir salud
                // }

                // if (happiness === 0) {
                //     setHealth((prev) => Math.max(0, prev - 0.5)); // Reducir salud
                // }
                // statusPet = JSON.stringify({ health, food, energy, happiness });
                // localStorage.setItem("statusPet", statusPet);

                // const updatedStatus = { ...petStatus };
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
            setFood((prev) => Math.min(100, prev + 20));
        }
    };

    const catSleeping = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            scene.handleSleep();
            console.log("Durmiendo");
            setEnergy((prev) => Math.min(100, prev + 30)); // Incrementar energía
        }
    };

    const catPlaying = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            scene.handlePlay();
            console.log("Jugando");
            setEnergy((prev) => Math.max(0, prev - 10)); // Reducir energía
            setHealth((prev) => Math.min(100, prev + 10)); // Incrementar salud
            setHappiness((prev) => Math.min(100, prev + 20)); // Incrementar felicidad
        }
    };

    const catPooping = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            scene.handlePoop();
            console.log("Haciendo popo");
            setHealth((prev) => Math.min(100, prev + 5)); // Incrementar salud
            setFood((prev) => Math.max(0, prev - 10)); // Reducir comida
        }
    };

    // Event emitted from the PhaserGame component
    const handleCurrentScene = (scene) => {
        setCurrentScene(scene);
        // setCanMoveSprite(scene.scene.key !== "MainMenu");
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


import { useEffect, useRef, useState } from "react";

import Phaser from "phaser";
import { PhaserGame } from "./game/PhaserGame";
import StatusBar from "./components/StatusBar";

function App() {
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [health, setHealth] = useState(100);
    const [food, setFood] = useState(100);
    const [energy, setEnergy] = useState(100);
    const [happiness, setHappiness] = useState(100);

    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setHealth((prev) => Math.max(0, prev - 10)); // Reducir salud
            setFood((prev) => Math.max(0, prev - 20)); // Reducir comida más rápido
            setEnergy((prev) => Math.max(0, prev - 10)); // Reducir energía
            setHappiness((prev) => Math.max(0, prev - 10)); // Reducir felicidad
        }, 1000); // Cada segundo
        if (health === 0) {
            const game = phaserRef.current.game;
            if (game) {
                game.scene.remove('Game');
                game.scene.start('GameOver');
            }
        }
        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [health, food, energy, happiness]);

    // const changeScene = () => {
    //     const scene = phaserRef.current.scene;

    //     if (scene) {
    //         scene.changeScene();
    //     }
    // };

    // const moveSprite = () => {
    //     const scene = phaserRef.current.scene;

    //     if (scene && scene.scene.key === "MainMenu") {
    //         // Get the update logo position
    //         scene.moveLogo(({ x, y }) => {
    //             setSpritePosition({ x, y });
    //         });
    //     }
    // };

    // const addSprite = () => {
    //     const scene = phaserRef.current.scene;

    //     if (scene) {
    //         // Add more stars
    //         const x = Phaser.Math.Between(64, scene.scale.width - 64);
    //         const y = Phaser.Math.Between(64, scene.scale.height - 64);

    //         //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
    //         const star = scene.add.sprite(x, y, "star");

    //         //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
    //         //  You could, of course, do this from within the Phaser Scene code, but this is just an example
    //         //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
    //         scene.add.tween({
    //             targets: star,
    //             duration: 500 + Math.random() * 1000,
    //             alpha: 0,
    //             yoyo: true,
    //             repeat: -1,
    //         });
    //     }
    // };

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
    const currentScene = (scene) => {
        setCanMoveSprite(scene.scene.key !== "MainMenu");
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
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
                <div style={{ marginTop: "20px", marginLeft: "10px" }}>
                    <StatusBar
                        label="Salud"
                        icon="assets/icons/heart.png"
                        value={health}
                        color="#00ff00"
                    />
                    <StatusBar
                        label="Comida"
                        icon="assets/icons/naruto.png"
                        value={food}
                        color="#ff7203"
                    />
                    <StatusBar
                        label="Energía"
                        icon="assets/icons/flash.png"
                        value={energy}
                        color="#0000ff"
                    />
                    <StatusBar
                        label="Felicidad"
                        icon="assets/icons/happy.png"
                        value={happiness}
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
            </div>
        </div>
    );
}

export default App;


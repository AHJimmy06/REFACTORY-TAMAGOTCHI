import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { petController } from '../../adapters/PetController';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x000000);

        // Centramos la imagen de GameOver
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.image(centerX, centerY - 50, 'GameOver').setAlpha(0.8).setScale(0.8);

        // Botón de reinicio (finish)
        const button = this.add.image(centerX, centerY + 200, 'finish')
            .setInteractive()
            .setDisplaySize(300, 150);

        button.on('pointerdown', () => {
            console.log("Reiniciando juego desde GameOver...");
            petController.reset();
            window.location.reload();
        });

        button.on('pointerover', () => {
            this.game.canvas.style.cursor = 'pointer';
            button.setTint(0xff4444);
        });

        button.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
            button.clearTint();
        });

        EventBus.emit('current-scene-ready', this);

        // Re-centrar si el contenedor cambia de tamaño (cuando desaparece la UI de React)
        this.scale.on('resize', (gameSize) => {
            const width = gameSize.width;
            const height = gameSize.height;
            const cX = width / 2;
            const cY = height / 2;

            // Reposicionar imagen y botón
            this.children.list.forEach(child => {
                if (child.texture) {
                    if (child.texture.key === 'GameOver') child.setPosition(cX, cY - 50);
                    if (child.texture.key === 'finish') child.setPosition(cX, cY + 200);
                }
            });
        });
        }
        }
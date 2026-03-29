import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Fondo centrado
        this.add.image(centerX, centerY, 'Menu').setOrigin(0.5, 0.5).setScale(1.6);
        
        // Botón Play centrado
        const button = this.add.image(centerX, centerY + 50, 'playButton')
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDisplaySize(300, 150);

        button.on('pointerdown', () => {
            this.scene.start('Game');
        });

        button.on('pointerover', () => {
            this.game.canvas.style.cursor = 'pointer';
            button.setTint(0x44ff44); // Un pequeño feedback visual no viene mal
        });
        
        button.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
            button.clearTint();
        });
        
        EventBus.emit('current-scene-ready', this);

        // Re-centrar si el contenedor cambia de tamaño
        this.scale.on('resize', (gameSize) => {
            const width = gameSize.width;
            const height = gameSize.height;
            const cX = width / 2;
            const cY = height / 2;
            
            this.children.list.forEach(child => {
                if (child.texture) {
                    if (child.texture.key === 'Menu') child.setPosition(cX, cY);
                    if (child.texture.key === 'playButton') child.setPosition(cX, cY + 50);
                }
            });
        });
    }    
}

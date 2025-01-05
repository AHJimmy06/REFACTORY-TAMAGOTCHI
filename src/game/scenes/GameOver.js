import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x000000);

        this.add.image(512, 384, 'GameOver').setAlpha(0.8);
        
        const button = this.add.image(515,600,'finish').setInteractive().setDisplaySize(300,150);

        button.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        button.on('pointerover', () => {
            this.input.manager.canvas.style.cursor = 'pointer';
        });
        button.on('pointerout', () => {
            this.input.manager.canvas.style.cursor = 'default';
        });
        
        EventBus.emit('current-scene-ready', this);

    }
}
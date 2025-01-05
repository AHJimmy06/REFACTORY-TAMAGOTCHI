import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { createAnimations } from '../animations';

export class MainMenu extends Scene
{
    logoTween;

    constructor ()
    {
        super('MainMenu');
    }

    preload (){
       this.load.image('Menu', 'assets/enviroment/bgMenu.jpg');
       this.load.image('playButton', 'assets/enviroment/playButton.png');
    }

    create ()
    {
        this.add.image(512, 384, 'background');


        this.add.image(0, -150, 'Menu').setOrigin(0, 0).setScale(1.6);
        
        const button = this.add.image(512,350,'playButton').setScale(0.5).setInteractive().setDisplaySize(300,150);

        button.on('pointerdown', () => {
            this.scene.start('Game');
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

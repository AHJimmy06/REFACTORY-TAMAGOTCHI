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
        createAnimations(this);
        this.add.image(0, -150, "Menu").setOrigin(0, 0).setScale(1.6);
        this.add.image(512,350, 'playButton').setScale(0.5);
        this.add.text(512, 125, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start("Game");
    }

    
}

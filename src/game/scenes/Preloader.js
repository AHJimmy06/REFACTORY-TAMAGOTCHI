import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {
            // Update the progress bar logic is in init, so we skip it here if it's already there
        });

        // Evento cuando termina la carga de verdad
        this.load.once('complete', () => {
            console.log('Loader complete! Switching to MainMenu...');
            this.scene.start('MainMenu');
        });

        //  Load the assets for the game - Replace with your own assets
        this.load.image('logo', 'assets/logo.png');
        this.load.image('star', 'assets/star.png');
        
        this.load.image('finish', 'assets/finish.jpg');
        this.load.image('GameOver', 'assets/GameOver.png');

        // Assets del Menú
        this.load.image('Menu', 'assets/enviroment/bgMenu.jpg');
        this.load.image('playButton', 'assets/enviroment/playButton.png');

        this.load.image("room", "assets/enviroment/room2.png");
        this.load.audio("eat", "assets/sounds/eatCookie.mp3");

        // Spritesheets
        this.load.spritesheet("catEating", "assets/personaje/Eating.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("catIdle", "assets/personaje/Idle.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("catWake", "assets/personaje/Idle.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("catHappy", "assets/personaje/Excited.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("catSad", "assets/personaje/Sad.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("catPlay", "assets/personaje/Dance.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("catSleepy", "assets/personaje/Sleepy.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("catSleep", "assets/personaje/Sleep.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("catPooping", "assets/personaje/Box3.png", { frameWidth: 32, frameHeight: 32 });
    }

    create ()
    {
        // Si por alguna razón el evento complete no saltó, forzamos aca
        if (!this.load.isLoading()) {
            this.scene.start('MainMenu');
        }
    }
}

export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.cameras.main.setBackgroundColor(0xff0000);
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.add.image(centerX, centerY, 'background').setAlpha(0.5);
        this.add.text(centerX, centerY - 60, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        const playRect = this.add.rectangle(centerX, centerY + 40, 260, 60, 0x000000).setOrigin(0.5);
        playRect.setInteractive();
        const playBtn = this.add.text(centerX, centerY + 40, 'Play Again', {
            fontSize: '32px', fill: '#00ff00', fontFamily: 'monospace'
        }).setOrigin(0.5);
        playBtn.setInteractive();
        playRect.on('pointerdown', () => this.scene.start('Game'));
        playBtn.on('pointerdown', () => this.scene.start('Game'));
        const menuRect = this.add.rectangle(centerX, centerY + 110, 260, 60, 0x000000).setOrigin(0.5);
        menuRect.setInteractive();
        const menuBtn = this.add.text(centerX, centerY + 110, 'Main Menu', {
            fontSize: '32px', fill: '#00ffff', fontFamily: 'monospace'
        }).setOrigin(0.5);
        menuBtn.setInteractive();
        menuRect.on('pointerdown', () => this.scene.start('Preloader'));
        menuBtn.on('pointerdown', () => this.scene.start('Preloader'));
    }
}

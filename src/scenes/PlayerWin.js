export class PlayerWin extends Phaser.Scene {
    constructor() {
        super('PlayerWin');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.add.image(centerX, centerY, 'background').setAlpha(0.5);
        this.add.text(centerX, centerY - 120, 'Congratulations!\nYou Win!', {
            fontFamily: 'Arial Black', fontSize: 56, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        const nextRect = this.add.rectangle(centerX, centerY - 10, 260, 60, 0x000000).setOrigin(0.5);
        nextRect.setInteractive();
        const nextBtn = this.add.text(centerX, centerY - 10, 'Next Level', {
            fontSize: '32px', fill: '#ffff00', fontFamily: 'monospace'
        }).setOrigin(0.5);
        nextBtn.setInteractive();
        const currentLevel = this.registry.get('currentLevel') || 'Game';
        let nextLevel;
        if (currentLevel === 'Game') {
            nextLevel = 'Level2';
        } else if (currentLevel === 'Level2') {
            nextLevel = 'Level3';
        } else {
            nextLevel = 'Game';
        }
        nextRect.on('pointerdown', () => this.scene.start(nextLevel));
        nextBtn.on('pointerdown', () => this.scene.start(nextLevel));
        const playRect = this.add.rectangle(centerX, centerY + 70, 260, 60, 0x000000).setOrigin(0.5);
        playRect.setInteractive();
        const playBtn = this.add.text(centerX, centerY + 70, 'Play Again', {
            fontSize: '32px', fill: '#00ff00', fontFamily: 'monospace'
        }).setOrigin(0.5);
        playBtn.setInteractive();
        playRect.on('pointerdown', () => this.scene.start(currentLevel));
        playBtn.on('pointerdown', () => this.scene.start(currentLevel));
        const menuRect = this.add.rectangle(centerX, centerY + 150, 260, 60, 0x000000).setOrigin(0.5);
        menuRect.setInteractive();
        const menuBtn = this.add.text(centerX, centerY + 150, 'Main Menu', {
            fontSize: '32px', fill: '#00ffff', fontFamily: 'monospace'
        }).setOrigin(0.5);
        menuBtn.setInteractive();
        menuRect.on('pointerdown', () => this.scene.start('Preloader'));
        menuBtn.on('pointerdown', () => this.scene.start('Preloader'));
    }
} 
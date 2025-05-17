export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.add.image(512, 384, 'background');
        this.add.rectangle(512 - 100, 384 - 50, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(512 - 330, 384 - 50, 0, 28, 0xffffff).setOrigin(0, 0.5);
        this.load.on('progress', (progress) => {
            bar.width = 460 * progress;
        });
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('sky', 'sky1.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star1.png');
        this.load.image('bomb', 'bomb1.png');
        this.load.spritesheet(
            'dude',
            'dude.png',
            {frameWidth: 32, frameHeight: 48}
        );
        this.load.image('background', 'assets/bg.png');
        this.load.audio('collect', 'audio/phaserUp5.ogg');
        this.load.audio('jump', 'audio/pepSound3.ogg');
        this.load.audio('bombCollision', 'audio/car-crash-211710.mp3');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'background').setDisplaySize(width, height);
        this.add.text(width / 2, 100, 'JUMPER MAN', {
            fontSize: '48px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        const playBtn = this.add.text(width / 2, 200, '▶ Play', {
            fontSize: '32px',
            fill: '#00ff00',
            backgroundColor: '#000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        playBtn.on('pointerdown', () => {
            this.scene.start('Game');
        });
        const levelSelectBtn = this.add.text(width / 2, 270, '🎮 Level Select', {
            fontSize: '28px',
            fill: '#00ffff',
            backgroundColor: '#000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        levelSelectBtn.on('pointerdown', () => {
            this.showLevelSelect();
        });
        const creditsBtn = this.add.text(width / 2, 340, '📜 Credits', {
            fontSize: '28px',
            fill: '#ffff00',
            backgroundColor: '#000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();
        creditsBtn.on('pointerdown', () => {
            alert('Made by Jericho Cid F. Pascua');
        });
    }

    showLevelSelect() {
        const { width, height } = this.scale;
        this.children.list.forEach(child => {
            if (child.type === 'Text' || child.type === 'Rectangle') {
                child.destroy();
            }
        });
        this.add.text(width / 2, 100, 'Select Level', {
            fontSize: '48px',
            fill: '#ffffff'
        }).setOrigin(0.5).setName('title');
        const buttons = [
            { label: 'Level 1', y: 200, scene: 'Game' },
            { label: 'Level 2', y: 270, scene: 'Level2' },
            { label: 'Level 3', y: 340, scene: 'Level3' }
        ];
        buttons.forEach(btn => {
            const rect = this.add.rectangle(width / 2, btn.y, 260, 60, 0x000000).setOrigin(0.5);
            rect.setInteractive();
            const txt = this.add.text(width / 2, btn.y, btn.label, {
                fontSize: '32px',
                fill: '#00ff00',
                fontFamily: 'monospace'
            }).setOrigin(0.5).setName(btn.label);
            rect.on('pointerdown', () => this.scene.start(btn.scene));
            txt.setInteractive();
            txt.on('pointerdown', () => this.scene.start(btn.scene));
        });
        const backRect = this.add.rectangle(width / 2, 410, 180, 50, 0x000000).setOrigin(0.5);
        backRect.setInteractive();
        const backBtn = this.add.text(width / 2, 410, '← Back', {
            fontSize: '28px',
            fill: '#ff0000',
            fontFamily: 'monospace'
        }).setOrigin(0.5).setName('back');
        backBtn.setInteractive();
        backRect.on('pointerdown', () => this.scene.restart());
        backBtn.on('pointerdown', () => this.scene.restart());
    }
}

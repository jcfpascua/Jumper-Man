import {Player} from "../gameObjects/Player.js";

export class Level2 extends Phaser.Scene {
    constructor() {
        super('Level2');
        this.colorIndex = 0;
        this.colors = [
            0xff0000,
            0xffa500,
            0xffff00,
            0x00ff00,
            0x0000ff,
            0x4b0082,
            0x9400d3
        ];
    }

    create() {
        this.registry.set('currentLevel', 'Level2');
        this.add.image(400, 150, 'sky').setScale(1.5);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(160, 200, 'ground').setScale(0.4, 0.5).refreshBody();
        this.platforms.create(600, 200, 'ground').setScale(0.6, 0.5).refreshBody();
        this.platforms.create(400, 300, 'ground').setScale(0.5, 0.5).refreshBody();
        this.platforms.create(150, 400, 'ground').setScale(0.3, 0.5).refreshBody();
        this.platforms.create(600, 320, 'ground').setScale(0.3, 0.5).refreshBody();
        this.platforms.create(650, 500, 'ground').setScale(0.3, 0.5).refreshBody();
        this.platforms.create(250, 500, 'ground').setScale(0.3, 0.5).refreshBody();
        this.player = new Player(this, 100, 450);
        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70}
        });
        this.stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setDisplaySize(24, 24);
        });
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.score = 0;
        this.scoreText = this.add.text(784, 16, 'Stars Collected: 0', {
            fontSize: '32px',
            fill: '#000',
            align: 'right'
        }).setOrigin(1, 0);
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitbBomb, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.moveLeft();
        } else if (this.cursors.right.isDown) {
            this.player.moveRight();
        } else {
            this.player.idle();
        }
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.sound.play('jump');
            this.player.jump();
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.sound.play('collect');
        this.score += 1;
        this.scoreText.setText('Stars Collected: ' + this.score);
        player.setTint(this.colors[this.colorIndex]);
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
        if (this.score % 5 === 0) {
            const currentScale = player.scale;
            const oldWidth = player.width;
            const oldHeight = player.height;
            player.setScale(currentScale * 1.1);
            player.body.setSize(player.width, player.height);
            player.body.setOffset((player.width - oldWidth) / 2, (player.height - oldHeight) / 2);
        }
        if (this.score >= 40) {
            this.physics.pause();
            player.setVisible(false);
            this.time.delayedCall(1000, () => {
                this.scene.start('PlayerWin');
            });
            return;
        }
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function(child){
                child.enableBody(true, child.x, 0, true, true);
            });
            this.releaseBomb();
        }
    }

    hitbBomb(player, bomb) {
        this.physics.pause();
        player.setVisible(false);
        this.sound.play('bombCollision');
        this.time.delayedCall(1000, () => {
            this.scene.start('GameOver');
        });
    }

    releaseBomb() {
        var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = this.bombs.create(x, -50, 'bomb');
        bomb.setDisplaySize(24, 24);
        bomb.setBounce(0.8);
        bomb.setCollideWorldBounds(true);
        bomb.setGravityY(300);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
} 
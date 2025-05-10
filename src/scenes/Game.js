import {Player} from "../gameObjects/Player.js";

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.colorIndex = 0;
        this.colors = [
            0xff0000, // red
            0xffa500, // orange
            0xffff00, // yellow
            0x00ff00, // green
            0x0000ff, // blue
            0x4b0082, // indigo
            0x9400d3  // violet
        ];
    }

    create() {
        this.add.image(400, 150, 'sky').setScale(1.5);

        this.platforms = this.physics.add.staticGroup();

        // ground
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // floating platforms
       this.platforms.create(600, 400, 'ground');
       this.platforms.create(50, 250, 'ground');
       this.platforms.create(750, 220, 'ground');

       this.player = new Player(this, 100, 450);

       this.physics.add.collider(this.player, this.platforms);

       this.cursors = this.input.keyboard.createCursorKeys();
    
       // star
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

       // bomb
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

        if (this.cursors.up.isDown) {
            this.player.jump();
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText('Stars Collected: ' + this.score);

        // Change player color
        player.setTint(this.colors[this.colorIndex]);
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;

        // Increase player size every 5 stars
        if (this.score % 5 === 0) {
            const currentScale = player.scale;
            player.setScale(currentScale * 1.1);
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
        player.setVisible(false); // Make player disappear
        this.time.delayedCall(1000, () => {
            this.scene.start('GameOver');
        });
    }

    releaseBomb() {
        var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setDisplaySize(24, 24);
        
        bomb.setBounce(0.8);
        bomb.setCollideWorldBounds(true);
        bomb.setGravityY(300);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

}

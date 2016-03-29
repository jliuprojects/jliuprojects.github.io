Player = function(game) {
    Phaser.Sprite.call(this, game, 100, game.world.height - 500, 'harrison');
    game.physics.arcade.enable(this);
    this.animations.add('run', [1, 2, 3, 4,5]);
    this.animations.add('stand', [0]);
    this.animations.add('slide', [6]);
    this.animations.add('jump', [3]);
    this.body.gravity.y = 800;
    this.alive = true;
    this.sliding = true;

    this.scale.setTo(0.50, 0.50); // TO DO : REMOVE THIS AND CHANGE ALL THE * 2
    this.run();
    game.world.add(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.update = function() {
    // game.debug.spriteInfo(player, 20, 32);
    // game.debug.body(player);

    if (!this.alive) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 350;
        this.animations.play('stand', speed/40);
        return;
    }

    if (this.x + 32 < 0) {
        this.alive = false;
    }

    if (this.x < 160) {
        this.body.velocity.x = speed + 100;
    } else if (this.x > 180) {
        this.body.velocity.x = speed - 100;
    } else {
        this.body.velocity.x = speed;
    }
    
    if (!this.body.touching.down) {
        this.body.velocity.x = 0;
        this.animations.play('jump', speed/40);
    } else if (cursors.up.isDown && this.body.touching.down) {
        this.body.velocity.y = -500;
    } else if (cursors.down.isDown && this.body.touching.down) {
        this.animations.play('slide', 10);
        this.slide();
    } else {
        this.animations.play('run', speed/35);
        this.run();
    }
};

Player.prototype.slide = function() {
    if (!this.sliding) {
        this.body.setSize(this.width*2, this.height*2);
        this.body.offset.y = 100/2;
        this.body.offset.x = 0;
        console.log("adjusted for slide");
        this.sliding = true;
    }
};

Player.prototype.run = function() {
    if (this.sliding) {
        this.body.setSize(this.width*2, this.height*2);
        this.body.offset.y = 0;
        this.body.offset.x = 62/2;
        console.log("adjusted for run");
        this.sliding = false;
    }
};

Player.prototype.kill = function() {
    this.alive = false;
}


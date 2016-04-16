Dog = function(game, sfx) {
    Phaser.Sprite.call(this, game, game.world.width - 350, game.world.height - 400, 'dog');
    game.physics.arcade.enable(this);
    this.animations.add('run', [0, 1, 2, 3, 4]);
    this.animations.add('stand', [5, 6, 7, 8]);
    this.body.gravity.y = 2000;
    this.sfx = sfx;
    this.levelTransitioning = false;

    this.anchor.x = 0;
    this.anchor.y = 0;

    this.standingFrames = 100;

    this.body.offset.setTo(40, 70);

    game.world.add(this);
};

Dog.prototype = Object.create(Phaser.Sprite.prototype);

Dog.prototype.constructor = Dog;

Dog.prototype.update = function() {
    // this.game.debug.spriteInfo(Dog, 20, 32);
    // this.game.debug.body(this);

    this.body.velocity.x = 0;

    if (this.standingFrames === 0 && this.body.touching.down && this.body.x < this.game.world.width + 100) {
        this.body.velocity.x = this.game.speed + 200;
        this.run();
    } else if (this.standingFrames > 0) {
        this.standingFrames--;
        this.stand();
    }
};

Dog.prototype.run = function() {
    this.animations.play('run', 10);
};

Dog.prototype.stand = function() {
    this.animations.play('stand', 10);
};

Dog.prototype.respawn = function() {
    this.body.x = this.game.world.width - 350;
    this.body.y = this.game.world.height - 400;
    this.standingFrames = 100;
};

Dog = function(game, sfx) {
    Phaser.Sprite.call(this, game, 400, game.world.height - 500, 'dog');
    game.physics.arcade.enable(this);
    this.animations.add('run', [0, 1, 2, 3, 4]);
    this.body.gravity.y = 2000;
    this.sfx = sfx;
    this.levelTransitioning = false;

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    game.world.add(this);
};

Dog.prototype = Object.create(Phaser.Sprite.prototype);

Dog.prototype.constructor = Dog;

Dog.prototype.update = function() {
    // this.game.debug.spriteInfo(Dog, 20, 32);
    this.game.debug.body(this);

    this.body.velocity.x = this.game.speed;
    this.run();
};

Dog.prototype.run = function() {
    this.animations.play('run', Math.max(10, this.game.speed/35));
};

Dog.prototype.kill = function() {
    this.alive = false;
    this.sfx.die.play();
};

Dog.prototype.respawn = function() {
    this.x = 400;
    this.y = this.game.world.height - 500;
};

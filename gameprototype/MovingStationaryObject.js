
MovingStationaryObject = function(game, x, y, key, group) {
    if (typeof group === 'undefined') { group = game.world; }
    Phaser.Sprite.call(this, game, x, y, key);
    game.physics.arcade.enable(this);
    this.body.immovable = true;
    group.add(this);
};

MovingStationaryObject.prototype = Object.create(Phaser.Sprite.prototype);

MovingStationaryObject.prototype.constructor = MovingStationaryObject;

MovingStationaryObject.prototype.customUpdate = function() {
    // override this to do more cool shit....
};
MovingStationaryObject.prototype.update = function() {
    this.body.velocity.x = -speed;
    this.customUpdate();
    if (this.x < -this.width) {
        this.destroy();
    }
};
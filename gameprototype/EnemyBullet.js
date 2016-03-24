EnemyBullet = function(game, x, y, key, group) {
    MovingStationaryObject.call(this, game, x, y, key, group);
};

EnemyBullet.prototype = Object.create(MovingStationaryObject.prototype);

EnemyBullet.prototype.constructor = EnemyBullet;

EnemyBullet.prototype.customUpdate = function() {
    this.body.velocity.x = -2*speed;
};
MovingCloudPlatform = function(game, x, y, key, group) {
    MovingStationaryObject.call(this, game, x, y, key, group);
    this.frameCounter = 0;
};
MovingCloudPlatform.prototype = Object.create(MovingStationaryObject.prototype);
MovingCloudPlatform.prototype.constructor = MovingCloudPlatform;
MovingCloudPlatform.prototype.customUpdate = function() {
    if (this.frameCounter < 120) {
        this.body.velocity.y = -100;
    } else {
        this.body.velocity.y = 100;
    }

    if (this.frameCounter == 240) {
        this.frameCounter = 0;
    }
    this.frameCounter += 1;
};
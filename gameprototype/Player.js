Player = function(game, sfx) {
    Phaser.Sprite.call(this, game, 100, game.world.height - 500, 'harrison');
    game.physics.arcade.enable(this);
    this.animations.add('run', [1, 2, 3, 4, 5]);
    this.animations.add('stand', [0]);
    this.animations.add('slide', [6]);
    this.animations.add('jump', [3]);
    this.body.gravity.y = 2000;
    this.alive = true;
    this.sliding = true;
    this.sfx = sfx;
    this.levelTransitioning = false;

    this.anchor.x = 0.5;
    this.anchor.y = 1;

    game.world.add(this);
    
    this.game.cursors = this.game.input.keyboard.createCursorKeys();
    this.initMobileControls();
    this.run();
};

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.update = function() {
    // game.debug.spriteInfo(player, 20, 32);
    // game.debug.body(player);

    if (!this.alive) {
        this.body.velocity.x = 300;
        this.animations.play('die', 4);
        return;
    }

    if (this.x + 60 < 0) {
        this.kill();
    }

    if (this.levelTransitioning) {
        this.body.velocity.x = 400;
        this.animations.play('run', 10);
    } else {
        if (this.x < 160) {
            this.body.velocity.x = this.game.speed + 100;
        } else if (this.x > 180) {
            this.body.velocity.x = this.game.speed - 100;
        } else {
            this.body.velocity.x = this.game.speed;
        }
    
        if (!this.body.touching.down) {
            this.body.velocity.x = 0;
            this.animations.play('jump', 10);
        } else if (this.game.cursors.up.isDown && this.body.touching.down) {
            this.jump();
        } else if (this.game.cursors.down.isDown && this.body.touching.down || this.slideMin > 0) {
            this.slide();
        } else {
            this.run();
        }
    }
};

Player.prototype.jump = function() {
    this.body.velocity.y = -800;
    this.sfx.jump.play();
};

Player.prototype.slide = function() {
    this.animations.play('slide', 10);
    if (!this.sliding) {
        this.body.setSize(this.width, this.height);
        this.sliding = true;
        this.slideMin = 30;
        this.sfx.slide.play();
    }
    this.slideMin--;
};

Player.prototype.run = function() {
    this.animations.play('run', Math.max(10, this.game.speed/35));
    if (this.sliding) {
        this.body.setSize(this.width, this.height);
        this.sliding = false;
    }
};

Player.prototype.kill = function() {
    this.alive = false;
    this.sfx.die.play();
    this.loadTexture('die');
    this.animations.add('die', [0, 1, 2, 3, 4, 5]);
};

Player.prototype.respawn = function() {
    this.x = 100;
    this.y = this.game.world.height - 500;
};

Player.prototype.initMobileControls = function() {
    var self = this;
    this.mobileStartClientY = 0;
    this.mobileEndClientY = 0;

    document.addEventListener('touchstart', function(e) {
        e.preventDefault();
        self.mobileStartClientY = e.touches[0].clientY;
        self.mobileEndClientY = e.touches[0].clientY;
    }, false);

    document.addEventListener('touchmove', function(e) {
        e.preventDefault();  
        self.mobileEndClientY = e.touches[0].clientY;
    }, false);

    document.addEventListener('touchend', function(e) {
        e.preventDefault();
        if (self.body.touching.down) {
            if (self.mobileEndClientY - self.mobileStartClientY > 100) {
                self.slide();
            } else {
                self.jump();
            }
        }
    }, false);
};

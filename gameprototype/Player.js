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
    
    // this.scale.setTo(0.50, 0.50); // TO DO : REMOVE THIS AND CHANGE ALL THE * 2
    this.initMobileControls();
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
        this.jump();
    } else if (cursors.down.isDown && this.body.touching.down || this.slideMin > 0) {
        this.slide();
        this.slideMin--;
    } else {
        this.run();
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
        this.body.offset.y = 75;
        this.body.offset.x = 0;
        this.sliding = true;
        this.slideMin = 30;
        this.sfx.slide.play();
    }
};

Player.prototype.run = function() {
    this.animations.play('run', speed/35);
    if (this.sliding) {
        this.body.setSize(this.width, this.height);
        this.body.offset.y = 10;
        this.body.offset.x = 35;
        this.sliding = false;
    }
};

Player.prototype.kill = function() {
    this.alive = false;
    this.sfx.die.play();
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

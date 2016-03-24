var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var grounds, platforms, clouds, bullets, player, cursors, stars, scoreText, middleGround;
var score = 0;
var speed = 170;
var lastTime = Date.now();

var play = function () {};

play.prototype = {
    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.atlasJSONHash('harrison', 'assets/run.png', 'assets/run.json');
        game.load.image('background', 'assets/clouds-h.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('trees', 'assets/trees-h.png');
        game.load.image('cloud-platform', 'assets/cloud-platform.png');
    },

    create: function() {
        score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.background = game.add.tileSprite(0, 0, 800, 600, 'background');
        middleGround = game.add.tileSprite(0, game.world.height - 116 - 64, 800, 116, 'trees');
        // middleGround.scale.setTo(2,2);

        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        platforms = game.add.group();
        grounds = game.add.group();
        bullets = game.add.group();
        clouds = game.add.physicsGroup();

        var ground = new MovingStationaryObject(game, 0, game.world.height - 64, 'ground', grounds);
        ground.scale.setTo(2, 2);
        
        // var ledge = new MovingStationaryObject(game, 400, 500, 'ground', platforms);
        // ledge = new MovingStationaryObject(game, -150, 250, 'ground', platforms);

        var abullet = new EnemyBullet(game, 800, game.world.height - 200, 'bullet', bullets);
        abullet.scale.setTo(0.25, 0.25);

        // var cloud = new MovingCloudPlatform(game, 400, 500, 'cloud-platform', clouds);

        player = game.add.sprite(32, game.world.height - 500, 'harrison');
        player.scale.setTo(0.50, 0.50);
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0;
        player.body.gravity.y = 800;
        player.animations.add('run', [1, 2, 3, 4, ,5]);
        player.animations.add('stand', [0]);
        player.animations.add('slide', [6]);
        player.animations.add('jump', [3]);
        player.animations.play('stand', 10, true);
        player.body.setSize(player.width*2, player.height*2);
        // player.anchor.setTo(0.5, 1);
        player.setSliding = function(sliding) {
            if (sliding) {
                this.body.setSize(this.width*2, this.height*2);
                this.body.offset.y = 100/2;
                this.body.offset.x = 0;
                this.sliding = 60;
            } else {
                this.body.setSize(this.width*2, this.height*2);
                this.body.offset.y = 0;
                this.body.offset.x = 62/2;
            }
        };
        player.setSliding(false);

        cursors = game.input.keyboard.createCursorKeys();

        // stars = game.add.group();
        // stars.enableBody = true;
        // //  Here we'll create 12 of them evenly spaced apart
        // for(var i = 0; i < 12; i++) {
        //     //  Create a star inside of the 'stars' group
        //     var star = stars.create(i * 70, 0, 'star');
        //     //  Let gravity do its thing
        //     star.body.gravity.y = 6;
        //     //  This just gives each star a slightly random bounce value
        //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
        // }
    },
    update: function() {
        game.debug.spriteInfo(player, 20, 32);
        // game.debug.body(player);
        updateScore();

        game.background.tilePosition.x -= 1;
        middleGround.tilePosition.x -= 2;

        game.physics.arcade.collide(player, grounds);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, clouds);
        game.physics.arcade.overlap(player, bullets, function () {
            game.state.start("Play");
        });
        // game.physics.arcade.overlap(player, stars, collectStar, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        if (!player.body.touching.down) {
            player.body.velocity.x = 0;
        } else if (player.x < 160) {
            player.body.velocity.x = 300;
        } else if (player.x > 180) {
            player.body.velocity.x = 100;
        } else {
            player.body.velocity.x = 170;
        }
        
        player.animations.play('run', speed/40);
        
        if (cursors.left.isDown) {
            player.body.velocity.x = -250;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 250;
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -500;
            // player.animations.play('jump', 10);
        }

        if (!player.sliding && cursors.down.isDown && player.body.touching.down) {
            player.animations.play('slide', 10);
            player.setSliding(true);
        } else if (player.sliding > 1) {
            player.animations.play('slide', 10);
            player.sliding--;
        } else if (player.sliding === 1) {
            player.setSliding(false);
            player.sliding--;
        }

        if (player.x + 32 < 0 || player.y > 600) {
            game.state.start("Play");
        }

        if (platforms.length < 1) {
            var platform = new MovingStationaryObject(game, game.world.width + 10, Math.random() * (game.world.height - 70), 'ground', platforms);
        }

        if (grounds.length < 2) {
            var ground = new MovingStationaryObject(game, game.world.width + Math.random() * 200, game.world.height - 64, 'ground', grounds);
            ground.scale.setTo(2, 2);
        }

        // if (bullets.length < 1) {
        //     var bullet = new EnemyBullet(game, game.world.width + 10, Math.random() * (game.world.height - 100), 'bullet', bullets);
        //     bullet.scale.setTo(0.25, 0.25);
        // }

        // if (clouds.length < 2) {
        //     var cloud = new MovingCloudPlatform(game, game.world.width + 10, Math.random() * (game.world.height - 70), 'cloud-platform', clouds);
        // }
    }
}

game.state.add("Play", play);
game.state.start("Play");








function updateScore() {
    if (Date.now() - 1000 > lastTime) {
        score += 1;
        scoreText.text = 'Score: ' + score;
        lastTime = Date.now();
    }
}
var gameHeight = Math.max(600, window.innerHeight);
var gameWidth = Math.max(800, window.innerWidth);
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');
var grounds, platforms, clouds, bullets, player, cursors, bones, scoreText, speedText, middleGround;
var score = 0;
var speed = 300;
var lastTime = Date.now();
var levels = [];
var currentLevel = 0;
var levelFrame = 0;
var dead = false;

var play = function () {};

play.prototype = {
    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('longPlatform', 'assets/longPlatform.png');
        game.load.image('medPlatform', 'assets/medPlatform.png');
        game.load.image('smallPlatform', 'assets/smallPlatform.png');
        game.load.image('stepPlatform', 'assets/stepPlatform.png');
        game.load.image('bone', 'assets/bone.png');
        game.load.atlasJSONHash('harrison', 'assets/run.png', 'assets/run.json');
        game.load.image('background', 'assets/bg.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('trees', 'assets/trees.png');
        game.load.image('cloud-platform', 'assets/cloud-platform.png');

        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        // game.scale.pageAlignHorizontally = true;
        // game.scale.pageAlignVertically = true;
        // game.scale.setScreenSize(true);
    },
    create: function() {
        score = 0;
        currentLevel = 0;
        levelFrame = 0;
        dead = false;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.background = game.add.tileSprite(0, 0, 1920, 1080, 'background');
        middleGround = game.add.tileSprite(0, game.world.height - 140 - 125, 1920, 140, 'trees');
        // middleGround.scale.setTo(2,2);

        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        speedText = game.add.text(16, 50, 'Speed: ' + speed, { fontSize: '32px', fill: '#000' });

        platforms = game.add.group();
        grounds = game.add.group();
        bullets = game.add.group();
        clouds = game.add.physicsGroup();

        var ground = new MovingStationaryObject(game, 0, game.world.height - 125, 'ground', grounds);
        var scale = gameWidth / 71 + 1;
        ground.scale.setTo(scale, 1);

        var abullet = new EnemyBullet(game, 800, game.world.height - 240, 'bullet', bullets);
        abullet.scale.setTo(0.25, 0.25);

        var platform = new MovingStationaryObject(game, game.world.width/2, game.world.height/2, "stepPlatform", platforms);

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

        bones = game.add.group();
        bones.enableBody = true;
        //  Here we'll create 12 of them evenly spaced apart
        for(var i = 0; i < 1; i++) {
            //  Create a star inside of the 'stars' group
            var bone = bones.create(170, 0, 'bone');
            //  Let gravity do its thing
            bone.body.gravity.y = 800;
            //  This just gives each star a slightly random bounce value
            // bone.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
    },
    update: function() {
        if (dead) {
            return;
        }
        // game.debug.spriteInfo(player, 20, 32);
        // game.debug.body(player);
        // game.debug.body(bullets.children[0]);
        this.updateSpeed();
        this.updateScore();
        

        game.background.tilePosition.x -= 1;
        middleGround.tilePosition.x -= 2;

        game.physics.arcade.collide(bones, grounds);
        game.physics.arcade.collide(bones, platforms);
        game.physics.arcade.collide(player, grounds);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, clouds);
        game.physics.arcade.overlap(player, bullets, function () {
            dead = true;
            player.body.velocity.x = 0;
            window.setTimeout(function() {
                game.state.start("Play");
            }, 2000);
        });
        game.physics.arcade.overlap(player, bones, function(player, bone) {
            score += 50;
            bone.destroy();
        });
        // game.physics.arcade.overlap(player, stars, collectStar, null, this);
        
        player.animations.play('run', speed/35);

        player.body.velocity.x = 0;
        if (!player.body.touching.down) {
            player.body.velocity.x = 0;
            player.animations.play('jump', speed/40);
        } else if (player.x < 160) {
            player.body.velocity.x = speed + 100;
        } else if (player.x > 180) {
            player.body.velocity.x = speed - 100;
        } else {
            player.body.velocity.x = speed;
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -500;
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
            dead = true;
            player.body.velocity.x = 0;
            window.setTimeout(function() {
                game.state.start("Play");
            }, 2000);
        }

        if (platforms.length) {
            if (platforms.children[platforms.length - 1].x + platforms.children[platforms.length - 1].width < game.world.width) {
                nextPlatform = levels[currentLevel][levelFrame];

                var x = game.world.width + nextPlatform.spacingBefore * 70 + 70;
                var y = game.world.height - 125 - nextPlatform.heightLevel * 150;

                switch(nextPlatform.type) {
                    case "longPlatform":
                        var platform = new MovingStationaryObject(game, x, y, "longPlatform", platforms);
                        break;
                    case "medPlatform":
                        var platform = new MovingStationaryObject(game, x, y, "medPlatform", platforms);
                        break;
                    case "smallPlatform":
                        var platform = new MovingStationaryObject(game, x, y, "smallPlatform", platforms);
                        break;
                    case "stepPlatform":
                        var platform = new MovingStationaryObject(game, x, y, "stepPlatform", platforms);
                        break;
                }

                for (var i = 0; i < nextPlatform.bones; i++) {
                    var bone = bones.create(x + i * 100, y - 100, 'bone');
                    bone.body.gravity.y = 800;
                    bone.body.bounce.y = 0.7 + Math.random() * 0.2;
                }

                levelFrame++;
                if (levelFrame === levels[currentLevel].length) {
                    levelFrame = 0;
                }
            }
        }
        
        var hasground = false;
        for (var i = 0; i < grounds.length; i++) {
            if (grounds.children[i].x > 0) {
                hasground = true;
            }
        }
        if (!hasground) {
            var ground = new MovingStationaryObject(game, game.world.width, game.world.height - 125, 'ground', grounds);
            var scale = gameWidth / 71 + 1;
            ground.scale.setTo(scale, 1);
        }

        if (bullets.length < 1) {
            var bullet = new EnemyBullet(game, game.world.width + 10, Math.random() * (game.world.height - 240), 'bullet', bullets);
            bullet.scale.setTo(0.25, 0.25);
        }

        // if (bones.length < 40) {
        //     var bone = bones.create(game.world.width + Math.random() * game.world.width, 100, 'bone');
        //     bone.body.gravity.y = 400;
        //     // bone.body.bounce.y = 0.7 + Math.random() * 0.2;
        // }

        // if (clouds.length < 2) {
        //     var cloud = new MovingCloudPlatform(game, game.world.width + 10, Math.random() * (game.world.height - 70), 'cloud-platform', clouds);
        // }
    },
    updateSpeed : function() {
        if (Date.now() - 1000 > lastTime) {
            speed += 1;
            speedText.text = 'Speed: ' + speed;
        }

    },
    updateScore : function() {
        if (Date.now() - 1000 > lastTime) {
            score += 1;
            scoreText.text = 'Score: ' + score;
            lastTime = Date.now();
        }
    }
}

$.getJSON("levels/levels.json", function(json) {
    levels = json;
    game.state.add("Play", play);
    game.state.start("Play");
});

function randomFloatFromInterval(min, max) {
    return Math.random()*(max-min)+min;
};

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

// window.onresize = function () {
//     console.log("resize");  
//     game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
// }
var gameHeight = Math.min(Math.max(600, window.innerHeight), 900);
var gameWidth = Math.max(800, window.innerWidth);
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');
var grounds, platforms, clouds, bullets, player, cursors, bones, scoreText, speedText, middleGround, spikes;
var score = 0;
var speed = 370;
var levels = [];
var currentLevel = 0;
var levelFrame = 0;
var dying = 0;

var play = function () {};

play.prototype = {
    preload: function() {
        game.load.atlasJSONHash('harrison', 'assets/run.png', 'assets/run.json');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('longPlatform', 'assets/longPlatform.png');
        game.load.image('medPlatform', 'assets/medPlatform.png');
        game.load.image('smallPlatform', 'assets/smallPlatform.png');
        game.load.image('stepPlatform', 'assets/stepPlatform.png');
        game.load.image('bone', 'assets/bone.png');
        game.load.image('background', 'assets/bg.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('trees', 'assets/trees.png');
        game.load.image('spike', 'assets/spike.png');
        game.load.image('cloud-platform', 'assets/cloud-platform.png');

        // game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        // game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        // game.scale.setScreenSize(true);
    },
    create: function() {
        score = 0;
        currentLevel = 0;
        levelFrame = 0;
        dying = 0;
        speed = 420;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.background = game.add.tileSprite(0, 0, 1920, 1080, 'background');
        middleGround = game.add.tileSprite(0, game.world.height - 140 - 125, 1920, 140, 'trees');
        // middleGround.scale.setTo(2,2);

        game.add.text(16, 90, 'v1.08', { fontSize: '32px', fill: '#000' });
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        speedText = game.add.text(16, 50, 'Speed: ' + speed, { fontSize: '32px', fill: '#000' });

        clouds = game.add.physicsGroup();
        platforms = game.add.group();
        grounds = game.add.group();
        bullets = game.add.group();
        spikes = game.add.group();
        bones = game.add.group();
        bones.enableBody = true;

        var ground = new MovingStationaryObject(game, 0, game.world.height - 125, 'ground', grounds);
        var scale = gameWidth / 71 + 1;
        ground.scale.setTo(scale, 1);

        var platform = new MovingStationaryObject(game, game.world.width/2, game.world.height/2, "stepPlatform", platforms);

        // var cloud = new MovingCloudPlatform(game, 400, 500, 'cloud-platform', clouds);

        player = new Player(game);

        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function() {
        if (!player.alive && !dying) {
            // just died
            dying = 120;
        } else if (dying === 1) {
            game.state.start("Play");
        } else if (dying) {
            dying--;
            game.physics.arcade.collide(bones, grounds);
            game.physics.arcade.collide(bones, platforms);
            return;
        }

        score += 1 / 60;
        speed += 2 / 60;
        scoreText.text = 'Score: ' + score;
        speedText.text = 'Speed: ' + speed;

        game.background.tilePosition.x -= 1;
        middleGround.tilePosition.x -= 2;

        game.physics.arcade.collide(bones, grounds);
        game.physics.arcade.collide(bones, platforms);
        game.physics.arcade.collide(player, grounds);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, clouds);
        game.physics.arcade.overlap(player, bullets, function() {
            player.kill();
        });
        game.physics.arcade.overlap(player, spikes, function() {
            player.kill();
        });
        game.physics.arcade.overlap(player, bones, function(player, bone) {
            score += 50;
            bone.destroy();
        });
        
        if (bullets.length < 1) {
            var bullet = new EnemyBullet(game, game.world.width + 10, Math.random() * (game.world.height - 240), 'bullet', bullets);
            bullet.scale.setTo(0.25, 0.25);
        }

        if (spikes.length < 1) {
            var spike = new MovingStationaryObject(game, game.world.width + 10, game.world.height - 170, 'spike', spikes);
            spike.scale.setTo(0.4, 0.4);
        }

        // if (clouds.length < 2) {
        //     var cloud = new MovingCloudPlatform(game, game.world.width + 10, Math.random() * (game.world.height - 70), 'cloud-platform', clouds);
        // }

        this.generateLevelPlatforms();
        this.generateGround();
    },
    generateGround : function() {
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
    },
    generateLevelPlatforms : function() {
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
                    // bone.body.bounce.y = 0.7 + Math.random() * 0.2;
                }

                levelFrame++;
                if (levelFrame === levels[currentLevel].length) {
                    levelFrame = 0;
                }
            }
        }
    },
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
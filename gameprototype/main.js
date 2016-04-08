var gameHeight = Math.min(Math.max(600, window.innerHeight), 900);
var gameWidth = Math.max(800, window.innerWidth);
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');
var grounds, platforms, clouds, bullets, player, cursors, bones, scoreText, speedText, middleGround, spikes;
var score = 0;
var speed = 370;
var levels = [];
var currentLevel = 0;
var levelGroup = 0;
var dying = 0;
var coinSfx, bgMusic;
var levelAnimation = -1;

var play = function () {};

play.prototype = {
    preload : function() {
        game.load.atlasJSONHash('harrison', 'assets/harrison.png', 'assets/harrison.json');
        game.load.atlasJSONHash('die', 'assets/die.png', 'assets/die.json');

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

        game.load.audio('jump', 'assets/jump.mp3');
        game.load.audio('slide', 'assets/laserSlide.mp3');
        game.load.audio('coin', 'assets/coinCollect.mp3');
        game.load.audio('die', 'assets/happyDeathJingle.mp3');
        game.load.audio('bgMusic', 'assets/happyDeathJingle.mp3');

        // game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        // game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        // game.scale.setScreenSize(true);
    },
    create : function() {
        score = 0;
        currentLevel = 0;
        levelGroup = 0;
        dying = 0;
        speed = 420;
        levelAnimation = -1;
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

        player = new Player(game, {
            "jump" : game.add.audio('jump'),
            "slide" : game.add.audio('slide'),
            "die" : game.add.audio('die')
        });

        coinSfx = game.add.audio('coin');
        bgMusic = game.add.audio('bgMusic');
        bgMusic.loop = true;
        // game.sound.setDecodedCallback([bgMusic], function() {
        //     bgMusic.play();
        // }, this);

        cursors = game.input.keyboard.createCursorKeys();
    },
    update : function() {
        this.handleBounds();

        if (!player.alive && !dying) {
            dying = 90;
        } else if (dying === 1) {
            game.state.start("Play");
        } else if (dying) {
            dying--;
            return;
        }

        scoreText.text = 'Score: ' + Math.floor(score);
        speedText.text = 'Speed: ' + Math.floor(speed);

        this.handleLevels();
    },
    handleBounds : function() {
        game.physics.arcade.collide(bones, grounds);
        game.physics.arcade.collide(bones, platforms);
        game.physics.arcade.collide(player, grounds);

        if (levelAnimation < 0) {
            game.physics.arcade.collide(player, platforms);
            game.physics.arcade.collide(player, clouds);
        }
    },
    handleLevels : function() {
        if ((score > 100 && currentLevel === 0) ||
            (score > 1000 && currentLevel === 1) ||
            (score > 1500 && currentLevel === 2)) {
            
            currentLevel++;
            levelGroup = 0;
            levelAnimation = 260;

            bullets.destroy();
            speed = 0;
        } else if (levelAnimation > 0) {
            levelAnimation--;
        } else if (levelAnimation === 0) {
            levelAnimation--;
            player.x = 100;
            player.y = game.world.height - 500;
            speed = 500;
        } else {
            score += 1 / 60;
            speed += 2 / 60;

            game.background.tilePosition.x -= 1;
            middleGround.tilePosition.x -= 2;

            this.generateLevelSprites();

            game.physics.arcade.overlap(player, bullets, function() {
                player.kill();
            });
            game.physics.arcade.overlap(player, spikes, function() {
                player.kill();
            });
            game.physics.arcade.overlap(player, bones, function(player, bone) {
                score += 50;
                bone.destroy();
                coinSfx.play();
            });
        }
    },
    generateLevelSprites : function() {
        if (platforms.length 
        && (platforms.children[platforms.length - 1].x + platforms.children[platforms.length - 1].width < game.world.width)) {
            nextGroup = levels[currentLevel][levelGroup];
            var x = game.world.width + nextGroup.spacingBefore * 70 + 70;
            var y = game.world.height - 125 - nextGroup.heightLevel * 150;

            var platform = new MovingStationaryObject(game, x, y, nextGroup.platform, platforms);

            for (var i = 0; i < nextGroup.bones; i++) {
                var bone = bones.create(x + i * 100 - 60, y - 100, "bone");
                bone.body.gravity.y = 800;
            }

            if (nextGroup.spikes) {
                for (var i = 0; i < nextGroup.spikes.length; i++) {
                    var spike = new MovingStationaryObject(game, x + nextGroup.spikes[i].x, y + nextGroup.spikes[i].y - 50, "spike", spikes);
                    spike.scale.setTo(0.4, 0.4);
                }
            }

            if (nextGroup.bullets) {
                for (var i = 0; i < nextGroup.bullets.length; i++) {
                    var bullet = new EnemyBullet(game, x + nextGroup.bullets[i].x, y + nextGroup.bullets[i].y, "bullet", bullets);
                    bullet.scale.setTo(0.25, 0.25);
                }
            }

            levelGroup++;
            if (levelGroup === levels[currentLevel].length) {
                levelGroup = 0;
            }
        }
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
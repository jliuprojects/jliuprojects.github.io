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
        game.load.spritesheet('dude', 'assets/running.png', 180.80, 278);
        // game.load.spritesheet('dudeslide', 'assets/sliding.png', 240, 160);
        game.load.atlasJSONHash('harrison', 'assets/run.png', 'assets/run.json');
        game.load.image('dudeSlide', 'assets/sliding.png');
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
        
        var ledge = new MovingStationaryObject(game, 400, 500, 'ground', platforms);
        ledge = new MovingStationaryObject(game, -150, 250, 'ground', platforms);

        var abullet = new EnemyBullet(game, 400, 200, 'bullet', bullets);
        abullet.scale.setTo(0.5, 0.5);

        var cloud = new MovingCloudPlatform(game, 400, 500, 'cloud-platform', clouds);

        player = game.add.sprite(32, 150, 'harrison');
        player.scale.setTo(0.30, 0.30);
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 800;
        // player.animations.add('right', [1, 2, 3, 4], 10, true);
        // player.animations.add('jump', [5], 10, true);
        player.animations.add('run', [0, 1, 2, 3, 4, ,5]);
        player.animations.add('slide', [6]);
        player.animations.play('run', 10, true);

        // var playerSlideImg = game.cache.getImage('dudeSlide');
        // player.slideDimensions = {width: playerSlideImg.width, height: playerSlideImg.height};
        // player.standDimensions = {width: player.width, height: player.height};
        // player.anchor.setTo(0.5, 1);


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
        updateScore();

        game.background.tilePosition.x -= 1;
        middleGround.tilePosition.x -= 2;

        game.physics.arcade.collide(player, grounds);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, clouds);
        game.physics.arcade.collide(player, bullets, function () {
            game.state.start("Play");
        });
        // game.physics.arcade.overlap(player, stars, collectStar, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.animations.play('run');
        
        if (cursors.left.isDown) {
            player.body.velocity.x = -250;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 250;
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -500;   
            player.animations.play('jump');
        }

        if (cursors.down.isDown && player.body.touching.down) {
            player.animations.play('slide');
        } 
        // else if (player.sliding) {
        //     player.sliding = false;
        //     player.loadTexture('dude');
        //     // player.animations.play('right');
        //     player.body.setSize(player.standDimensions.width, player.standDimensions.height);
        // }

        if (player.x + 32 < 0 || player.y > 600) {
            game.state.start("Play");
        }

        if (platforms.length < 3) {
            var platform = new MovingStationaryObject(game, game.world.width + 10, Math.random() * (game.world.height - 70), 'ground', platforms);
        }

        if (grounds.length < 2) {
            var ground = new MovingStationaryObject(game, game.world.width + Math.random() * 500, game.world.height - 64, 'ground', grounds);
            ground.scale.setTo(2, 2);
        }

        if (bullets.length < 1) {
            var ground = new EnemyBullet(game, game.world.width + 10, Math.random() * (game.world.height - 70), 'bullet', bullets);
            ground.scale.setTo(0.5, 0.5);
        }

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
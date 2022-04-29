class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        //load sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('fisher', './assets/art/fisher_small.png');
        this.load.spritesheet('fish', './assets/art/fish.png', {frameWidth: 64, frameHeight: 64, startFrame:0, endFrame: 10});
        this.load.image('piranha', './assets/art/piranha.png');
        this.load.image('hook', './assets/art/hook.png');
        this.load.spritesheet('piranhaanimation', './assets/art/piranhaanimation.png', {frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 10});
        this.load.image('lake', './assets/art/lake.png');
        this.load.image('pointlogo', './assets/art/pointlogo.png');
        this.load.image('clock', './assets/art/clock.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create(){
        //place tile sprite
        this.lake = this.add.tileSprite(0, 0, 640,480, 'lake').setOrigin(0,0);
        //orange background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xffa500).setOrigin(0,0);
        //white borders
        /*this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);*/
        // add fisher1
        this.fisher1 = new Fisher(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'fisher').setOrigin(0.5, 0.85);
        // add hook (p1)
        this.p1Hook = new Hook(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'hook').setOrigin(0.5, 0);
        
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('fish', {start: 0, end: 7, first: 0}),
            frameRate: 30
        });
        // add fish (4)
        this.fish01 = new Fish(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'fish', 0, 30, false).setOrigin(0, 0);
        this.fish02 = new Fish(this, game.config.width, borderUISize*6 + borderPadding*4, 'fish', 0, 20, false).setOrigin(0,0);
        this.fish03 = new Fish(this, game.config.width - borderUISize*3, borderUISize*7 + borderPadding*3, 'fish', 0, 10, false).setOrigin(0,0);
        this.fish04 = new Fish(this, game.config.width + borderUISize*6, borderUISize*4, 'piranha', 0, 50, true).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'piranhacaught',
            frames: this.anims.generateFrameNumbers('piranhaanimation', {start: 0, end: 10, first: 0}),
            frameRate: 30
        });
        this.p1Score = 0;
        this.highScore = this.p1Score;
        // display score
        let scoreConfig = {
            fontFamily: 'bubbles',
            fontSize: '30px',
            backgroundColor: '#02075d',
            color: '#FFD580',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 200,
            fixedHeight: 50
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        //add pointlogo
        this.pointlogo = this.add.sprite(75, 75, 'pointlogo');

        //add clock image
        this.clock = this.add.sprite(570, 75, 'clock');
        
        //GAME OVER
        this.gameOver = false;
        
        let music = this.sound.add('sfx_background');
        music.setLoop(true);
        music.play();


        this.seconds = game.settings.gameTimer;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(this.seconds, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 64, this.highScore, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'LOST', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
        this.timer = this.add.text(595, 50, this.clock.getRemainingSeconds(), scoreConfig);
        
        //looped 1 sec timer
        /*this.timer = this.time.addEvent(1000, () =>{
            this.add.text(450, 75, this.seconds -= 1, scoreConfig).setOrigin(0.5);
        }, this, true);*/
    }
    update(){
        this.fish01.anims.play('swim', 30, true);
        this.fish02.anims.play('swim', 30, true);
        this.fish03.anims.play('swim', 30, true);
        //restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            this.timer.loop = true;
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        //change time
        /*if(this.timer.loop){
            this.timer.text = this.seconds;
        }*/
        let scoreConfig = {
            fontFamily: 'bubbles',
            fontSize: '30px',
            backgroundColor: '#02075d',
            color: '#FFD580',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 200,
            fixedHeight: 50
        }
        this.timer.text = this.clock.getRemainingSeconds();
        this.lake.tilePositionX -= 4;
        if(!this.gameOver){
            this.fisher1.update(this.p1Hook);
            this.p1Hook.update(this.fisher1.x);
            this.fish01.update();
            this.fish02.update();
            this.fish03.update();
            this.fish04.update();
        }
        this.checkCollision(this.fisher1.x, this.p1Hook, this.fish01);
        this.checkCollision(this.fisher1.x, this.p1Hook, this.fish02);
        this.checkCollision(this.fisher1.x, this.p1Hook, this.fish03);
        this.checkCollision(this.fisher1.x, this.p1Hook, this.fish04);
    }
    checkCollision(fisherx, hook, fish) {
        // simple AABB checking
        if (hook.x < fish.x + fish.width && 
            hook.x + hook.width > fish.x && 
            hook.y < fish.y + fish.height &&
            hook.height + hook.y > fish.y) {
                hook.reset(fisherx);
                this.fishExplode(fish);
                //return true;
        } //else {
            //return false;
        //}
    }
    fishExplode(fish) {
        // temporarily hide fish
        fish.alpha = 0;
        // create explosion sprite at fish's position
        //if(fish.piranha){
            let boom = this.add.sprite(fish.x, fish.y, 'piranhaanimation').setOrigin(0, 0);
            boom.anims.play('piranhacaught');             // play piranha animation
        /*} else {
            let boom = this.add.sprite(fish.x, fish.y, 'piranhaanimation').setOrigin(0, 0);
            boom.anims.play('explode');             // play explode animation
        }*/
        boom.on('animationcomplete', () => {    // callback after anim completes
          fish.reset();                         // reset fish position
          fish.alpha = 1;                       // make fish visible again
          boom.destroy();                       // remove explosion sprite
        });
        //update score
        this.p1Score += fish.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_caught');     
        //update time
        //this.seconds += 5;
        //this.timer.text = this.seconds;
    }
}
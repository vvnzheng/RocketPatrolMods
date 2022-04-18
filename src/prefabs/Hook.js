// Hook prefab
class Hook extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      //firing status
      this.isFiring = false;
      //pixels per frame
      this.moveSpeed = 2;
      //firing sound
      this.sfxReel = scene.sound.add('sfx_reel');
    }
    update(fisherx){
        //left/right
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
            this.x += this.moveSpeed;
        }
        //fire
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
            this.sfxReel.play();
        }
        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){
            this.reset(fisherx);
        }
    }
    reset(fisherx){
        this.isFiring = false;
        this.x = fisherx;
        this.y = game.config.height - borderUISize - borderPadding;
    }
  }
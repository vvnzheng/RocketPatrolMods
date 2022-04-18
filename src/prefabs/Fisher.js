// Fisher prefab
class Fisher extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      //firing status
      this.isFiring = false;
      //pixels per frame
      this.moveSpeed = 2;
      //firing sound
      this.sfxRocket = scene.sound.add('sfx_rocket');
    }
    update(hook){
        //left/right
        if(!hook.isFiring){
            console.log(hook.isFiring);
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
    }
}
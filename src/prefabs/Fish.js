// Fish prefab
class Fish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, piranha) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      //point status
      this.points = pointValue;
      //pixels per frame
      this.moveSpeed = game.settings.spaceshipSpeed;
      if(piranha){
          this.moveSpeed+= 5;
      }
    }
    update(){
        //left
        this.x -= this.moveSpeed;
        //wrap
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }
    reset(){
        this.x = game.config.width;
    }
}
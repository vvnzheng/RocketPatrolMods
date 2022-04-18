
//Vivian Zheng, GO FISH,04/18/2022, 7-8 hours
//60 points for total redesign
//20 points for new, smaller, faster, enemy (piranha)
//10 points for animated enemies
//5 points for background music
//5 points for rocket control after fire
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: 0xffa500,
    scene: [ Menu, Play]
}
let game = new Phaser.Game(config);
//set UI sizes
let borderUISize = game.config.height /15;
let borderPadding = borderUISize /3;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
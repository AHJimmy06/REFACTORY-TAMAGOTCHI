export const createAnimations = (game) => {
  game.anims.create({
    key: "cat-eat",
    frames: game.anims.generateFrameNumbers("cat", { start: 0, end: 14 }),
    frameRate: 8,
    repeat: 3,
  });
  game.anims.create({
    key: "cat-idle",
    frames: game.anims.generateFrameNumbers("catIdle", { start: 0, end: 7 }),
    frameRate: 5,
    repeat: -1,
  });
  game.anims.create({
    key: "cat-happy",
    frames: game.anims.generateFrameNumbers("catHappy", { start: 0, end: 10 }),
    frameRate: 5,
    repeat: 2,
  });
  game.anims.create({
    key: "cat-sad",
    frames: game.anims.generateFrameNumbers("catSad", { start: 0, end: 8 }),
    frameRate: 5,
    repeat: -1,
  });
  game.anims.create({
    key: "cat-play",
    frames: game.anims.generateFrameNumbers("catPlay", { start: 0, end: 3 }),
    frameRate: 5,
    repeat: 3,
  });
  game.anims.create({
    key: "cat-sleep",
    frames: game.anims.generateFrameNumbers("catSleep", { start: 0, end: 3 }),
    frameRate: 5,
    repeat: -1,
  });
};

/**
 * Created by kfang on 7/1/17.
 */
import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({game, name, x, y, asset, frame}) {
        console.log('Create interactive item sprite ' + name + ' at x = ' + x + ' y = ' + y)
        super(game, x, y, asset, frame)
        this.name = name
        this.actionQueue = []
        this.playingAnimation = null
        this.status = null
        this.activated = false
    }

    update() {
        if (this.actionQueue.length > 0 && this.activated && (this.playingAnimation === null || this.playingAnimation.isFinished)) {
            this.playNextAction()
        }
    }

    playNextAction() {
        let nextAction = this.actionQueue.shift()
        console.log('Update: play animation ' + nextAction.name + ' with xOffset: ' + nextAction.xOffset + ' and yOffset: ' + nextAction.yOffset + ' with sprite key: ' + nextAction.spriteKey)
        let newX = this.x + nextAction.xOffset
        let newY = this.y + nextAction.yOffset
        if (nextAction.spriteKey !== this.key) {
            this.loadTexture(nextAction.spriteKey, 0)
        }
        this.playingAnimation = this.animations.play(nextAction.name)
        if (nextAction.audio !== null) {
            this.game.sound.play(nextAction.audio)
        }
        this.game.add.tween(this).to({x: newX, y: newY}, 1000, null, true)
    }
}
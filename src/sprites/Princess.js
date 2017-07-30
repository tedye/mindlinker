/**
 * Created by kfang on 7/23/17.
 */
/**
 * Created by kfang on 6/16/17.
 */
import Phaser from 'phaser'
import TooltipBuilder from '../util/TooltipBuilder'
import config from '../config'

export default class extends Phaser.Sprite {
    constructor({game, name, x, y, asset, frame}) {
        super(game, x, y, asset, frame)
        this.name = name
        this.anchor.setTo(0.5, 0.5)
        this.actionQueue = []
        this.playingAnimation = null
        this.taskCompleted = false
    }

    update() {
        if (this.actionQueue.length > 0 && (this.playingAnimation === null || this.playingAnimation.isFinished)) {
            this.playNextAction()
        } else if (this.actionQueue.length === 0 && this.playingAnimation !== null && this.playingAnimation.isFinished) {
            this.showButtons()
        }
        if (this.playingAnimation != null && !this.playingAnimation.isFinished) {
            let footPrintSprite = this.game.add.sprite(this.centerX - 15, this.centerY, 'footprint')
            footPrintSprite.scale.setTo(0.1, 0.1)
            footPrintSprite.anchor.setTo(0.5, 0.5)
        }
    }

    showButtons() {
        this.restartButton = this.game.add.button(this.game.world.centerX - 60, this.game.world.centerY, 'restart', this.restart, this)
        this.restartButton.scale.setTo(0.3, 0.3)
        this.restartButton.anchor.setTo(0.5, 0.5)
        TooltipBuilder(this.game, this.restartButton, '重新开始', 'bottom')
        if (this.taskCompleted) {
            this.nextButton = this.game.add.button(this.game.world.centerX + 60, this.game.world.centerY, 'next', this.nextGame, this)
            this.nextButton.scale.setTo(0.3, 0.3)
            this.nextButton.anchor.setTo(0.5, 0.5)
            TooltipBuilder(this.game, this.nextButton, '开始下一关', 'bottom')
        }
    }

    playNextAction() {
        let nextAction = this.actionQueue.shift()
        console.log('Update: play animation ' + nextAction.name + ' with xOffset: ' + nextAction.xOffset + ' and yOffset: ' + nextAction.yOffset)
        let newX = this.x + nextAction.xOffset
        let newY = this.y + nextAction.yOffset
        this.playingAnimation = this.animations.play(nextAction.name)
        if (nextAction.audio !== null) {
            this.game.sound.play(nextAction.audio)
        }
        this.game.add.tween(this).to({x: newX, y: newY}, config.animationDuration, null, true)
    }

    destroyAllButtons() {
        this.restartButton.destroy()
        if (this.nextButton) {
            this.nextButton.destroy()
        }
    }

    restart() {
        this.game.sound.play('press')
        this.destroyAllButtons()
        this.game.state.start('PrincessTaskBoot')
    }

    nextGame() {
        this.game.sound.play('press')
        this.destroyAllButtons()
        this.game.global.currentTaskIndex = this.game.global.currentTaskIndex + 1
        this.game.state.start('PrincessTaskBoot')
    }
}
